import multer from 'multer';
import Submission from '../models/Submission';
import User from '../models/User';
import { calculateImpact } from '../utils/ecoEngine';
import { PDFParse } from 'pdf-parse';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';

const storage = multer.memoryStorage();
export const upload = multer({ storage, limits: { fileSize: 25 * 1024 * 1024 } }); // 25MB

export const uploadFile = async (req: any, res: any) => {
    try {
        const rawAssignmentId = req.body.assignment_id || req.body.assignmentId;
        const assignment_id = mongoose.Types.ObjectId.isValid(rawAssignmentId) 
            ? rawAssignmentId 
            : new mongoose.Types.ObjectId(); 

        const studentEmail = req.body.student_email || (req.user && req.user.email);
        console.log(`[Eco-Sync] Incoming request for: ${studentEmail || 'Unknown'}`);
        
        let targetUser = req.user;

        // IDENTITY BRIDGE: If we have an email from the frontend, find or create that user in MongoDB (Case-Insensitive)
        if (studentEmail && studentEmail !== 'mock@student.com') {
            let mongoUser = await User.findOne({ email: { $regex: new RegExp(`^${studentEmail}$`, 'i') } });
            if (!mongoUser) {
                console.log(`Creating new MongoDB profile for sync: ${studentEmail}`);
                mongoUser = await User.create({
                    name: req.body.student_name || 'User',
                    email: studentEmail,
                    role: 'student',
                    eco_stats: {
                        total_pages_saved: 0,
                        total_water_saved: 0,
                        total_co2_prevented: 0,
                        total_trees_preserved: 0
                    }
                });
            }
            targetUser = mongoUser;
        }

        const file = req.file;
        if (!file) return res.status(400).json({ error: 'No file uploaded' });

        let pageCount = 1;
        if (file.mimetype === 'application/pdf') {
            try {
                // Correct PDFParse instantiation for v2.4.5
                const parser = new PDFParse({ data: file.buffer });
                const data = await parser.getText();
                pageCount = data.total || 1;
            } catch (err) {
                console.error("PDF Parsing failed, falling back to 1 page:", err);
                pageCount = 1;
            }
        }

        const eco_update = calculateImpact(pageCount);
        const plagiarism_score = Math.floor(Math.random() * 8) + 2;

        // File system preservation
        const uploadsDir = path.join(process.cwd(), 'uploads');
        if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

        const fileName = `sub_${Date.now()}_${file.originalname}`;
        const filePath = path.join(uploadsDir, fileName);
        fs.writeFileSync(filePath, file.buffer);
        const file_url = `/uploads/${fileName}`;

        // Update MongoDB (Primary developer DB)
        await Submission.create({
            student_id: targetUser?._id || req.user?._id,
            assignment_id: assignment_id,
            file_url: file_url,
            page_count: pageCount,
            plagiarism_score: plagiarism_score,
            status: "Submitted",
            eco_impact: eco_update
        });

        // Update local MongoDB user stats for the IDENTIFIED user
        if (targetUser) {
            console.log(`[Eco-Sync] Updating MongoDB profile for: ${targetUser.email}`);
            await User.findByIdAndUpdate(targetUser._id, {
                $inc: {
                    'eco_stats.total_pages_saved': eco_update.pages,
                    'eco_stats.total_water_saved': eco_update.water_saved,
                    'eco_stats.total_co2_prevented': eco_update.co2_prevented,
                    'eco_stats.total_trees_preserved': eco_update.trees_preserved
                }
            });
            console.log(`[Eco-Sync] Successfully updated impact data.`);
        }

        // NOTE: We no longer update Supabase from the backend to avoid RLS Error 42501.
        // The frontend will perform this sync using the user's own token.

        res.status(200).json({
            message: 'Impact calculated. Frontend sync required.',
            eco_update,
            plagiarism_score,
            file_url
        });

    } catch (error: any) {
        console.error('Upload Error:', error);
        res.status(500).json({ error: error.message || 'Server error during upload process' });
    }
};
