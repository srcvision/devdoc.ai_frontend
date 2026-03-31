import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Github, Linkedin, MapPin, ExternalLink, 
  Terminal, Database, Layout, Server, Activity, 
  ChevronRight, Cpu, Layers, Zap, Globe
} from 'lucide-react';

export default function About() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-red-brand selection:text-white font-sans overflow-x-hidden">
      
      {/* ── Glowing Background Effects ── */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-brand/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#cc0000]/10 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute top-[40%] left-[30%] w-[20%] h-[20%] bg-orange-600/5 blur-[100px] rounded-full mix-blend-screen" />
        {/* Futuristic Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_20%,transparent_100%)] opacity-20" />
      </div>

      {/* ── Navbar ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#000000]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5 group">
            <span className="font-black text-2xl tracking-tight text-white transition-transform group-hover:scale-105">
              Devdoc<span className="text-red-brand">.ai</span>
            </span>
          </Link>
          <div className="hidden sm:flex items-center gap-8">
            <Link to="/" className="text-sm font-bold text-white/50 hover:text-white transition-colors">Home</Link>
            <Link to="/features" className="text-sm font-bold text-white/50 hover:text-white transition-colors">Features</Link>
            <Link to="/dashboard" className="bg-white/10 hover:bg-white/20 text-white text-sm font-bold py-2 px-5 rounded-lg transition-all border border-white/10 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-24 px-6 max-w-6xl mx-auto">
        
        {/* ── Cyberpunk Hero Section ── */}
        <section className="min-h-[70vh] flex flex-col justify-center mb-20 relative">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-red-brand/30 bg-red-brand/5 backdrop-blur-md mb-8 w-fit shadow-[0_0_20px_rgba(251,54,64,0.1)]">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-brand"></span>
            </span>
            <span className="text-red-brand text-xs font-black tracking-[0.2em] uppercase">Creator & Lead Architect</span>
          </div>

          <div className="relative">
            <h1 className="text-[4.5rem] md:text-[8rem] lg:text-[10rem] font-black tracking-tighter leading-[0.85] text-white/95 uppercase drop-shadow-2xl">
              Saurav<br />
              <span className="relative inline-block mt-2 md:mt-0">
                <span className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-red-brand via-red-500 to-orange-500 blur-2xl opacity-40">Chaudhari</span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">Chaudhari.</span>
              </span>
            </h1>
            
            <div className="absolute -right-10 md:right-10 top-1/2 -translate-y-1/2 hidden lg:block opacity-10 pointer-events-none">
              <Cpu size={300} strokeWidth={0.5} />
            </div>
          </div>

          <div className="mt-16 sm:mt-20 flex flex-col md:flex-row gap-8 md:items-end justify-between border-l-2 border-red-brand pl-6 md:pl-8 py-2 bg-gradient-to-r from-white/5 to-transparent p-6 md:p-8 rounded-r-3xl backdrop-blur-sm">
            <p className="text-lg md:text-3xl text-white/80 font-light max-w-3xl leading-relaxed md:leading-snug">
              I synthesize <span className="font-bold text-white">complex logic</span> into <span className="font-bold text-red-brand">beautiful, high-performance</span> MERN applications. Obsessed with code quality, scalable architecture, and AI integration.
            </p>
            
            <div className="flex flex-row gap-4 flex-shrink-0">
              <a href="https://www.linkedin.com/in/saurav-chaudhari-1ab838265/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 text-white transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                <Linkedin size={20} className="md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://github.com/srcvision" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded-xl bg-red-brand/10 border border-red-brand/30 hover:border-red-brand hover:bg-red-brand/20 text-white transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(251,54,64,0.3)]">
                <Github size={20} className="md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        {/* ── Quick Intel Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-32 relative z-10">
          {[
            { label: 'Location', value: 'Ahmedabad, IND', icon: MapPin },
            { label: 'Education', value: 'B.E. Comp Sci (2025)', icon: ExternalLink },
            { label: 'Focus', value: 'Full-Stack & AI', icon: Zap },
            { label: 'Status', value: 'Available', icon: Globe },
          ].map((item, i) => (
            <div key={i} className="group relative bg-[#050505] border border-white/5 hover:border-white/20 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <item.icon className="text-red-brand/50 group-hover:text-red-brand mb-4 transition-colors" size={24} />
              <h3 className="text-[9px] md:text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-2">{item.label}</h3>
              <p className="font-bold text-sm md:text-base text-white/90 truncate">{item.value}</p>
            </div>
          ))}
        </div>

        {/* ── Systems & Technologies ── */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px bg-white/10 flex-1" />
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-widest text-white/90 flex items-center gap-3">
              <Layers className="text-red-brand" size={28} /> Technical Arsenal
            </h2>
            <div className="h-px bg-white/10 flex-1 hidden md:block" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Frontend Architecture', icon: Layout, skills: ['React.js (Hooks/Context)', 'Tailwind CSS', 'Redux / Zustand', 'Framer Motion'] },
              { label: 'Backend Engineering', icon: Server, skills: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT & OAuth Auth'] },
              { label: 'Database & Cloud', icon: Database, skills: ['MongoDB', 'Mongoose ODM', 'Redis Caching', 'Cloud Platforms'] },
              { label: 'Core Languages', icon: Terminal, skills: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'HTML/CSS/Git'] },
            ].map((cat, idx) => (
              <div key={idx} className="group relative bg-[#0a0a0a]/50 backdrop-blur-sm border border-white/5 rounded-3xl p-6 md:p-8 hover:bg-[#0f0f0f] transition-all hover:border-red-brand/30 hover:shadow-[0_0_40px_rgba(251,54,64,0.05)]">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                  <cat.icon size={80} />
                </div>
                <cat.icon size={28} className="text-red-brand mb-6" />
                <h3 className="font-black text-lg md:text-xl mb-6 tracking-tight">{cat.label}</h3>
                <ul className="space-y-3 relative z-10">
                  {cat.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="text-white/60 text-sm font-medium flex items-center gap-3 group/item">
                      <ChevronRight size={14} className="text-white/20 group-hover/item:text-red-brand transition-colors transform group-hover/item:translate-x-1" />
                      <span className="group-hover/item:text-white transition-colors">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Experience Timeline ── */}
        <section className="mb-32 relative">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-widest text-white/90 flex items-center gap-3">
              <Activity className="text-red-brand" size={28} /> Trajectory
            </h2>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            
            {/* CareerMentor.AI */}
            <div className="relative flex items-start md:items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 mt-6 md:mt-0 rounded-full border border-white/20 bg-black text-red-brand shadow-[0_0_15px_rgba(251,54,64,0.3)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 relative">
                <div className="w-3 h-3 bg-red-brand rounded-full animate-pulse" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 md:p-8 rounded-3xl bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 hover:border-red-brand/40 transition-all group-hover:shadow-[0_0_30px_rgba(251,54,64,0.1)] hover:-translate-y-2">
                <div className="flex flex-col md:flex-wrap items-start md:items-center justify-between gap-3 mb-4">
                  <h3 className="font-black text-xl md:text-2xl">CareerMentor.AI</h3>
                  <span className="px-3 py-1 rounded-full bg-red-brand/10 border border-red-brand/20 text-red-brand text-[10px] font-black uppercase tracking-wider">
                    Architect
                  </span>
                </div>
                <h4 className="font-bold text-white/60 mb-6 font-mono text-sm">Full-Stack AI Platform Architect</h4>
                <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6">
                  Spearheaded the architecture of a high-traffic AI career platform. Engineered a Node.js/Express backend natively integrated with Google Gemini LLMs for real-time resume analysis. Implemented aggressive MongoDB indexing to slash latency by 30%, and locked down endpoints via strict JWT Role-Based Access Control.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'MongoDB', 'Gemini AI', 'Tailwind'].map(tech => (
                    <span key={tech} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs font-bold text-white/40">{tech}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* InternPe */}
            <div className="relative flex items-start md:items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 mt-6 md:mt-0 rounded-full border border-white/10 bg-[#050505] text-white/50 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <div className="w-2 h-2 bg-white/30 rounded-full group-hover:bg-white/70 transition-colors" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 md:p-8 rounded-3xl bg-[#050505] border border-white/5 hover:border-white/20 hover:bg-[#0a0a0a] transition-all hover:-translate-y-2">
                <div className="flex flex-col md:flex-wrap items-start md:items-center justify-between gap-3 mb-4">
                  <h3 className="font-black text-xl md:text-2xl">InternPe</h3>
                  <span className="text-white/40 text-[10px] font-black uppercase tracking-wider">
                    June 25 - Sept 25
                  </span>
                </div>
                <h4 className="font-bold text-white/50 mb-6 font-mono text-sm">Web Developer Intern</h4>
                <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
                  Collaborated within a fast-paced Agile team to deliver high-performance, responsive UIs. Optimized frontend rendering pipelines leading to a 35% boost in mobile page speed scores. Championed modular component design, reducing bugs by 30% and significantly improving codebase maintainability.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'UI/UX', 'Agile/Git'].map(tech => (
                    <span key={tech} className="px-2 py-1 bg-white/5 border border-white/5 rounded-md text-xs font-bold text-white/30">{tech}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── Contact Section (Terminal Data) ── */}
        <section className="mb-20">
          <div className="rounded-3xl bg-[#050505] border border-white/10 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-brand/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            {/* Terminal Header */}
            <div className="bg-[#0a0a0a] border-b border-white/10 px-6 py-4 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="ml-4 text-xs font-mono text-white/30 truncate">srcvision@devdoc.ai:~</span>
            </div>

            {/* Terminal Body */}
            <div className="p-6 md:p-12 font-mono text-sm md:text-base leading-loose overflow-hidden">
              <div className="text-white/50 mb-4 break-words">$ initiate_contact_protocol --target Saurav_Chaudhari</div>
              <div className="text-green-400 mb-6">[OK] Connection established.</div>
              
              <div className="space-y-4 text-white/80">
                <div className="flex flex-col md:flex-row gap-2 md:gap-8">
                  <span className="text-red-brand shrink-0 w-32">&gt; EMAIL:</span>
                  <a href="mailto:srchaudhari0806@gmail.com" className="hover:text-white hover:underline decoration-red-brand underline-offset-4 transition-all break-all">srchaudhari0806@gmail.com</a>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8">
                  <span className="text-red-brand shrink-0 w-32">&gt; LOCATION:</span>
                  <span>Ahmedabad, Gujarat, India (Open to Remote)</span>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8">
                  <span className="text-red-brand shrink-0 w-34">&gt; AVAILABILITY:</span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Ready for new challenges
                  </span>
                </div>
              </div>
              
              <div className="mt-8 text-white/30 flex items-center gap-2">
                <span>_</span><span className="bg-white/30 w-2 h-5 animate-pulse" />
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="py-12 px-6 border-t border-white/10 bg-black/50 backdrop-blur-md relative z-10 text-center">
        <p className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] leading-relaxed">
          © 2026 devdoc.ai — System engineered by <br className="sm:hidden" /><a href="https://www.linkedin.com/in/saurav-chaudhari-1ab838265/" target="_blank" rel="noopener noreferrer" className="text-red-brand hover:text-white transition-colors ml-1 sm:ml-0">Saurav Chaudhari</a>
        </p>
      </footer>
    </div>
  );
}
