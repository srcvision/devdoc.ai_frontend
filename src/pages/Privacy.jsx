import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, ArrowLeft } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-red-brand selection:text-white pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-white/40 hover:text-white transition-colors mb-12">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <div className="w-16 h-16 rounded-2xl bg-red-brand/10 text-red-brand flex items-center justify-center mb-8 border border-red-brand/20 shadow-[0_0_30px_rgba(251,54,64,0.15)]">
          <Lock size={32} />
        </div>
        
        <h1 className="text-5xl font-black tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-white/50 text-lg mb-12 font-medium">Last updated: March 30, 2026</p>
        
        <div className="space-y-12 text-white/70 leading-relaxed font-medium">
          <section>
            <h2 className="text-2xl font-black text-white mb-4 tracking-tight">1. Data We Collect</h2>
            <p className="mb-4">We collect information to provide better services to all our users. Information we collect includes:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-red-brand">
              <li><strong>Account Information:</strong> Name, email address, role, and encrypted password.</li>
              <li><strong>Code Submissions:</strong> Source code snippets you submit for analysis.</li>
              <li><strong>Analysis Reports:</strong> The AI-generated reports linked to your account.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-black text-white mb-4 tracking-tight">2. How We Protect Your Code</h2>
            <p>Your code is your intellectual property. We process source code securely strictly for the purpose of generating your analysis report. Code snippets are transmitted over SSL encryption and are safely stored in your report history so you may access them exclusively. We do not use your source code to train our foundational models.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-black text-white mb-4 tracking-tight">3. Data Retention</h2>
            <p>We retain your account data and report history for as long as your account is active. You may delete any individual report directly from your Dashboard, and it is instantly and permanently destroyed from our servers. You may also request full account deletion by contacting support.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white mb-4 tracking-tight">4. Third-Party Sharing</h2>
            <p>We do not sell your personal information or proprietary code. We may share necessary telemetry with strict third-party infrastructure providers (such as hosting and LLM API providers) exclusively to facilitate the AI analysis process. All third-party sub-processors are bound by strict confidentiality and data protection agreements.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
