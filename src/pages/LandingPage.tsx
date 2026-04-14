// Campus Pace - Ultimate Force Update - 2026-04-11
// Campus Pace - Global Synchronization & Stabilization Update - 2026-04-11
// Campus Pace - Stable Upload & Sync Update - 2026-04-11
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Leaf, Play, CheckCircle2, FileText, Cloud, BarChart3,
  Twitter, Github, ArrowRight, XCircle, Frown, Check, TrendingUp,
  Users, UploadCloud, ClipboardCheck, LineChart, X, Calendar,
  Building2, Mail, User, Send
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import demoVideo from '../assets/Demo video.mp4';
const heroLandingImg = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600';
const forestEcoImg = 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80&auto=format&fit=crop';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const AnimatedSection = ({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      className={className}
      id={id}
    >
      {children}
    </motion.section>
  );
};

export default function LandingPage() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading && user) {
      if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'faculty' || user.role === 'hod') navigate('/faculty');
      else navigate('/student');
    }
  }, [user, isLoading, navigate]);

  const [isWatchDemoOpen, setIsWatchDemoOpen] = useState(false);
  const [isScheduleDemoOpen, setIsScheduleDemoOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: '', email: '', university: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setDemoForm({ name: '', email: '', university: '', message: '' });
      setTimeout(() => {
        setIsSubmitted(false);
        setIsScheduleDemoOpen(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface selection:bg-primary/20 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md px-6 py-4 lg:px-20 flex items-center justify-between border-b border-outline-variant">
        <div className="flex items-center gap-3 text-on-surface cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="p-2.5 bg-primary-container rounded-2xl text-primary shadow-sm transform group-hover:rotate-12 transition-transform">
            <Leaf size={28} fill="currentColor" />
          </div>
          <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-on-surface to-on-surface-variant bg-clip-text text-transparent italic">Campus pace</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors">Home</button>
          <button onClick={() => scrollToSection('problem')} className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors">Problem</button>
          <button onClick={() => scrollToSection('impact')} className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors">Impact</button>
          <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors">How It Works</button>
          <Link to="/login" className="px-5 py-2.5 organic-gradient hover:brightness-110 text-on-primary text-sm font-bold rounded-full transition-all shadow-sm">
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-on-surface-variant hover:text-on-surface"
          >
            {isMenuOpen ? <X size={28} /> : <div className="flex flex-col gap-1.5 w-6"><div className="h-0.5 w-full bg-current rounded-full"></div><div className="h-0.5 w-full bg-current rounded-full"></div><div className="h-0.5 w-full bg-current rounded-full"></div></div>}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[51] lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-[52] lg:hidden shadow-2xl p-8 flex flex-col gap-8"
            >
              <div className="flex items-center gap-3 text-on-surface mb-4">
                <div className="p-2 bg-primary-container rounded-xl text-primary">
                  <Leaf size={24} fill="currentColor" />
                </div>
                <span className="text-xl font-black italic">Campus pace</span>
              </div>
              <div className="flex flex-col gap-6">
                <button onClick={() => { setIsMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-left text-lg font-bold text-on-surface flex items-center gap-3"><ArrowRight size={18} className="text-primary" /> Home</button>
                <button onClick={() => { setIsMenuOpen(false); scrollToSection('problem'); }} className="text-left text-lg font-bold text-on-surface flex items-center gap-3"><ArrowRight size={18} className="text-primary" /> Problem</button>
                <button onClick={() => { setIsMenuOpen(false); scrollToSection('impact'); }} className="text-left text-lg font-bold text-on-surface flex items-center gap-3"><ArrowRight size={18} className="text-primary" /> Impact</button>
                <button onClick={() => { setIsMenuOpen(false); scrollToSection('how-it-works'); }} className="text-left text-lg font-bold text-on-surface flex items-center gap-3"><ArrowRight size={18} className="text-primary" /> How It Works</button>
              </div>
              <Link to="/login" className="mt-auto px-8 py-4 organic-gradient hover:brightness-110 text-on-primary font-bold rounded-2xl transition-all shadow-lg text-center">
                Get Started
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 px-6 lg:px-20 overflow-hidden max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-container text-primary w-fit">
              <CheckCircle2 size={14} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Official Campus Partner</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-[5.5rem] font-black leading-[1.1] lg:leading-[1.05] text-on-surface tracking-tight">
              Digitizing<br />Campus.<br />
              <span className="text-primary-container">Saving Nature.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-base sm:text-lg text-on-surface-variant max-w-md leading-relaxed">
              Join the unified paperless campus initiative. Submit digital assignments, track your eco-footprint, and watch our campus grow greener every day.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Link to="/login" className="px-8 py-4 organic-gradient hover:brightness-110 text-on-primary font-bold rounded-full transition-all shadow-lg shadow-primary/30 text-center">
                Start Saving Today
              </Link>
              <button
                onClick={() => setIsWatchDemoOpen(true)}
                className="px-8 py-4 bg-surface-container-lowest border border-outline-variant text-on-surface font-bold rounded-full hover:bg-surface-container-low transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center text-primary">
                  <Play size={12} fill="currentColor" />
                </div>
                Watch Demo
              </button>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center gap-4 mt-4">
              <div className="flex -space-x-3">
                <img src="https://i.pravatar.cc/100?img=1" alt="User" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                <img src="https://i.pravatar.cc/100?img=2" alt="User" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                <img src="https://i.pravatar.cc/100?img=3" alt="User" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                <div className="w-10 h-10 rounded-full border-2 border-surface-container-lowest bg-primary text-on-primary flex items-center justify-center text-xs font-bold">2k+</div>
              </div>
              <span className="text-sm text-on-surface-variant font-medium">Students joined this week</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3.5] rounded-[2.5rem] overflow-hidden relative shadow-2xl">
              <img
                src={heroLandingImg}
                alt="Students collaborating in a futuristic eco-campus"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              {/* Overlay Card */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-surface-container-lowest/95 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-outline-variant">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Live Campus Impact</span>
                    <span className="px-2.5 py-1 bg-primary-container text-primary rounded-full text-[10px] font-bold flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      LIVE
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-black text-on-surface">14,205</span>
                    <span className="text-sm font-medium text-on-surface-variant">Trees Saved</span>
                  </div>
                  <div className="w-full bg-surface-container-low rounded-full h-2.5 overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '71%' }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                      className="organic-gradient h-full rounded-full"
                    />
                  </div>
                  <div className="text-right text-[10px] font-bold text-on-surface-variant/50 uppercase">Goal: 20,000</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <AnimatedSection className="py-12 border-y border-outline-variant bg-surface-container-lowest">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-outline-variant">
          <div className="flex flex-col items-center md:items-start md:pl-8 text-center md:text-left pt-6 first:pt-0 md:pt-0">
            <Leaf className="text-primary w-8 h-8 mb-4 sm:mb-6" />
            <h3 className="text-4xl sm:text-5xl font-black text-on-surface mb-1">1,245</h3>
            <p className="text-sm sm:text-base text-on-surface-variant font-medium">Trees Saved Annually</p>
          </div>
          <div className="flex flex-col items-center md:items-start md:pl-12 text-center md:text-left pt-12 md:pt-0">
            <FileText className="text-primary w-8 h-8 mb-4 sm:mb-6" />
            <h3 className="text-4xl sm:text-5xl font-black text-on-surface mb-1">500k+</h3>
            <p className="text-sm sm:text-base text-on-surface-variant font-medium">Paper Sheets Avoided</p>
          </div>
          <div className="flex flex-col items-center md:items-start md:pl-12 text-center md:text-left pt-12 md:pt-0">
            <Cloud className="text-primary w-8 h-8 mb-4 sm:mb-6" />
            <h3 className="text-4xl sm:text-5xl font-black text-on-surface mb-1">12.5 T</h3>
            <p className="text-sm sm:text-base text-on-surface-variant font-medium">Carbon Offset</p>
          </div>
        </div>
      </AnimatedSection>

      {/* Problem Section */}
      <AnimatedSection id="problem" className="py-24 px-6 lg:px-20 bg-surface">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-primary uppercase tracking-widest mb-4 block">The Challenge</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mb-6">Old School vs. Green School</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
              Traditional campuses are drowning in paper. Campus pace provides a modern bridge to environmental responsibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-surface-container-lowest p-8 sm:p-10 rounded-[2rem] shadow-sm border border-outline-variant flex flex-col group hover:shadow-xl transition-all duration-500">
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <XCircle className="text-red-500 w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-on-surface">Excessive Waste</h3>
              <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                Thousands of sheets of paper are wasted every semester per student. Most end up in landfills, not recycling bins.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col group hover:shadow-xl transition-all duration-500">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Frown className="text-orange-500 w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-slate-900">Lost Assignments</h3>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                Physical papers get lost, damaged by coffee spills, or misplaced. The "dog ate my homework" era ends here.
              </p>
            </div>

            {/* Card 3 - Solution */}
            <div className="organic-gradient p-8 sm:p-10 rounded-[2rem] shadow-xl shadow-primary/20 flex flex-col text-on-primary relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-125 transition-transform duration-700">
                <CheckCircle2 className="w-32 h-32" />
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm relative z-10">
                <Users className="text-on-primary w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 relative z-10">The Campus pace Solution</h3>
              <p className="text-on-primary/90 text-sm sm:text-base leading-relaxed mb-8 relative z-10">
                Instant digital submissions, cloud backups, and real-time impact tracking. Secure, eco-friendly, and always accessible.
              </p>
              <ul className="space-y-3 relative z-10 mt-auto">
                {["Zero Paper Usage", "Automated Grading", "Carbon Footprint Analytics"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium">
                    <Check size={16} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Impact Section */}
      <AnimatedSection id="impact" className="py-24 px-6 lg:px-20 bg-surface-container-lowest">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-on-surface mb-6 tracking-tight">
              Real Impact,<br />
              <span className="text-primary">Measurable Results.</span>
            </h2>
            <p className="text-on-surface-variant mb-12 text-base sm:text-lg leading-relaxed">
              We believe in transparency. Track the collective effort of your campus in real-time. Every digital submission contributes to a healthier planet.
            </p>

            <div className="space-y-8">
              {/* Progress 1 */}
              <div>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-on-surface">Carbon Reduction Goal</span>
                  <span className="text-primary">78%</span>
                </div>
                <div className="w-full bg-surface-container-low rounded-full h-2.5">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '78%' }} transition={{ duration: 1 }} className="organic-gradient h-full rounded-full" />
                </div>
                <p className="text-[10px] text-on-surface-variant mt-2 font-medium">Target: 100 Tons by 2025</p>
              </div>

              {/* Progress 2 */}
              <div>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-on-surface">Digital Adoption Rate</span>
                  <span className="text-primary">92%</span>
                </div>
                <div className="w-full bg-surface-container-low rounded-full h-2.5">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '92%' }} transition={{ duration: 1, delay: 0.2 }} className="organic-gradient h-full rounded-full" />
                </div>
                <p className="text-[10px] text-on-surface-variant mt-2 font-medium">Across 12 Departments</p>
              </div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src={forestEcoImg}
                alt="Breathtaking biodiverse forest path"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8">
                <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-lg flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#4CAF50]">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Monthly Growth</p>
                    <p className="text-base sm:text-lg font-black text-slate-900">+24% Participation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* How It Works */}
      <AnimatedSection id="how-it-works" className="py-24 px-6 lg:px-20 bg-surface">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-on-surface mb-4">How It Works</h2>
            <p className="text-on-surface-variant text-base sm:text-lg">Simple steps to transform your campus workflow.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-outline-variant" />

            {[
              { step: 1, title: "Sign Up", desc: "Students and faculty create secure accounts linked to university ID.", icon: <Users /> },
              { step: 2, title: "Upload", desc: "Submit assignments digitally in any format. Cloud synced instantly.", icon: <UploadCloud /> },
              { step: 3, title: "Grade & Review", desc: "Professors grade with digital tools. Feedback is instant and paper-free.", icon: <ClipboardCheck /> },
              { step: 4, title: "Track Impact", desc: "Watch your personal and campus-wide eco-stats grow in real-time.", icon: <LineChart /> }
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-surface-container-lowest rounded-3xl shadow-md border border-outline-variant flex items-center justify-center relative z-10 mb-6 group-hover:rotate-6 transition-transform">
                  <div className="text-on-surface w-8 h-8">
                    {item.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-on-primary rounded-full flex items-center justify-center font-bold text-sm border-4 border-surface">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-3">{item.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed max-w-[200px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-24 px-6 lg:px-20 bg-surface">
        <div className="max-w-[1000px] mx-auto bg-primary-dim rounded-[2.5rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
          {/* Dotted Pattern Background */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '32px 32px' }} />

          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-black text-on-primary mb-6">
              Ready to go <span className="text-primary-container">100% Green?</span>
            </h2>
            <p className="text-on-primary/80 text-lg mb-10 max-w-2xl mx-auto">
              Join over 50 campuses already making a difference. Start your free trial for your department today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/login" className="px-8 py-4 bg-primary-container text-primary font-bold rounded-full transition-all shadow-lg hover:brightness-110">
                Get Started Now
              </Link>
              <button
                onClick={() => setIsScheduleDemoOpen(true)}
                className="px-8 py-4 bg-primary/20 hover:bg-primary/30 text-on-primary font-bold rounded-full transition-all border border-on-primary/10"
              >
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-surface pt-20 pb-10 px-6 lg:px-20 border-t border-outline-variant">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 text-on-surface mb-6 group">
                <div className="p-2 bg-primary-container rounded-xl text-primary group-hover:rotate-12 transition-transform">
                  <Leaf size={24} fill="currentColor" />
                </div>
                <span className="text-xl font-black tracking-tight italic">Campus pace</span>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6 max-w-xs">
                Empowering education with sustainable technology. Building a greener future, one assignment at a time.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-colors">
                  <Twitter size={16} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-colors">
                  <Github size={16} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-on-surface mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-on-surface-variant">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">For Universities</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-on-surface mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-on-surface-variant">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-on-surface mb-6">Stay Updated</h4>
              <p className="text-sm text-on-surface-variant mb-4">Subscribe to our newsletter for the latest green updates.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-full border border-outline-variant bg-surface-container-low text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <button className="px-6 py-2.5 organic-gradient text-on-primary font-bold rounded-full text-sm transition-colors">
                  Go
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-on-surface-variant/60">© 2024 Campus pace Inc. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-on-surface-variant/60">
              <a href="#" className="hover:text-on-surface transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-on-surface transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Watch Demo Modal */}
      <AnimatePresence>
        {isWatchDemoOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWatchDemoOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(129,199,132,0.2)] border border-white/10"
            >
              <button
                onClick={() => setIsWatchDemoOpen(false)}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/10"
              >
                <X size={20} />
              </button>
              <video
                className="w-full h-full object-cover"
                src={demoVideo}
                controls
                autoPlay
                muted
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Schedule Demo Modal */}
      <AnimatePresence>
        {isScheduleDemoOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsScheduleDemoOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="p-8 lg:p-10">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-[#E8F5E9] rounded-lg text-[#4CAF50]">
                      <Calendar size={20} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900">Schedule a Demo</h3>
                  </div>
                  <button
                    onClick={() => setIsScheduleDemoOpen(false)}
                    className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 flex items-center justify-center transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-[#E8F5E9] rounded-full flex items-center justify-center text-[#4CAF50] mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 mb-2">Request Received!</h4>
                    <p className="text-slate-500">Our team will contact you within 24 hours to finalize your demo session.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleDemoSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 transition-colors group-focus-within:text-[#4CAF50]" />
                        <input
                          type="text"
                          required
                          value={demoForm.name}
                          onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] transition-all text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Campus Email</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 transition-colors group-focus-within:text-[#4CAF50]" />
                        <input
                          type="email"
                          required
                          value={demoForm.email}
                          onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                          placeholder="john@university.edu"
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] transition-all text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">University / Organization</label>
                      <div className="relative group">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 transition-colors group-focus-within:text-[#4CAF50]" />
                        <input
                          type="text"
                          required
                          value={demoForm.university}
                          onChange={(e) => setDemoForm({ ...demoForm, university: e.target.value })}
                          placeholder="Green Valley University"
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] transition-all text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Additional Notes (Optional)</label>
                      <textarea
                        value={demoForm.message}
                        onChange={(e) => setDemoForm({ ...demoForm, message: e.target.value })}
                        placeholder="Tell us about your department's needs..."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#4CAF50]/10 focus:border-[#4CAF50] transition-all text-sm font-medium min-h-[100px] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#81C784] hover:bg-[#66BB6A] text-white font-bold rounded-xl transition-all shadow-xl shadow-[#81C784]/20 flex items-center justify-center gap-2 group disabled:opacity-50 mt-4"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Confirm Demo Request
                          <Send size={18} className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
