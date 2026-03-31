import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-red-brand selection:text-white pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-white/40 hover:text-white transition-colors mb-12">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <div className="w-16 h-16 rounded-2xl bg-red-brand/10 text-red-brand flex items-center justify-center mb-8 border border-red-brand/20 shadow-[0_0_30px_rgba(251,54,64,0.15)]">
          <Shield size={32} />
        </div>
        
        <h1 className="text-5xl font-black tracking-tight mb-4">Terms of Service</h1>
        <p className="text-white/50 text-lg mb-12 font-medium">Last updated: March 30, 2026</p>
        
        <div className="space-y-12 text-white/70 leading-relaxed font-medium">
          <section>
            <h2 className="text-2xl font-black text-white mb-4 tracking-tight">1. Acceptance of Terms</h2>
            <p>By accessing or using Devdoc.ai, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services. These terms apply to all visitors, users, and others who access or use the platform.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-black text-white mb-4 tracking-tight">2. Use License</h2>
            <p className="mb-4">Permission is granted to temporarily use our AI code analysis tools for personal or commercial codebases subject to your subscription plan. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-red-brand">
              <li>Attempt to decompile or reverse engineer any algorithms contained on our platform.</li>
              <li>Remove any copyright or other proprietary notations from the generated reports.</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server without authorization.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-black text-white mb-4 tracking-tight">3. Service Limitations & Disclaimer</h2>
            <p>The AI-generated insights, bug detection, and security scanning provided by Devdoc.ai are for informational and assistive purposes only. We make no warranties, expressed or implied, that the analysis is 100% accurate or fully exhaustive. You remain entirely responsible for the security, performance, and functionality of your code.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white mb-4 tracking-tight">4. Account Terms</h2>
            <p>You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. Devdoc.ai cannot and will not be liable for any loss or damage arising from your failure to comply with the above.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
