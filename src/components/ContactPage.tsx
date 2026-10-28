import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AgencySettings } from '../types';

interface ContactPageProps {
  settings: AgencySettings;
  onLeadSubmitted: (lead: { name: string; contact: string; service: string; message: string; budget: string }) => void;
}

export function ContactPage({ settings, onLeadSubmitted }: ContactPageProps) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [service, setService] = useState('Social Media Management');
  const [budget, setBudget] = useState('৳10,000 - ৳25,000');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact) {
      alert('Please fill in your name and phone/email.');
      return;
    }
    onLeadSubmitted({ name, contact, service, message, budget });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-24 bg-white dark:bg-[#040810] text-slate-900 dark:text-white transition-colors">
      {/* Hero Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>✦ GET IN TOUCH · RESPONSE TIME &lt; 15 MINS ✦</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 uppercase">
          Let’s Build Something <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            Extraordinary Together
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
          Partner with Crafvanta Media for strategic digital growth, high-converting ads, custom software solutions, and professional video production.
        </p>
      </motion.section>

      {/* Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Info & Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-6 shadow-xl">
              <h3 className="text-2xl font-bold tracking-tight">Direct Communication</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Choose your preferred communication channel or fill out the project inquiry form. Our senior strategists reply instantly.
              </p>

              <div className="space-y-4 pt-2">
                {/* WhatsApp / Phone */}
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-all group shadow-xs"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                    📞
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">WhatsApp / Call</span>
                    <span className="text-sm font-bold text-slate-950 dark:text-white">{settings.phone}</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-all group shadow-xs"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                    ✉️
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Email Us</span>
                    <span className="text-sm font-bold text-slate-950 dark:text-white">{settings.email}</span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg">
                    📍
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Headquarters</span>
                    <span className="text-sm font-bold text-slate-950 dark:text-white">{settings.location}</span>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1">
                <div className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">Business Hours:</div>
                <div>Saturday – Thursday: 10:00 AM – 8:00 PM (GMT+6)</div>
                <div>Friday: Closed (Emergency Support Available)</div>
              </div>
            </div>
          </div>

          {/* Right Project Inquiry Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            {submitted ? (
              <div className="py-16 text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-3xl font-bold animate-bounce">
                  ✓
                </div>
                <h3 className="text-3xl font-black text-slate-950 dark:text-white">Message Received Successfully!</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Our growth strategy team has received your inquiry and will contact you via phone or email within 15 minutes.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 rounded-full bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-2">Project Inquiry Form</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Fill out the form below with your project requirements and we will provide a custom proposal.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tanvir Ahmed"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Phone / WhatsApp / Email *
                    </label>
                    <input
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="e.g. +8801700000000"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Select Primary Service
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-hidden focus:border-emerald-500"
                    >
                      <option value="Social Media Management">Social Media Management</option>
                      <option value="Web Design & Development">Web Design & Development</option>
                      <option value="Software Solutions & ERP/POS">Software Solutions & ERP/POS</option>
                      <option value="Digital Marketing & Ads">Digital Marketing & Ads</option>
                      <option value="Video Editing & Reels">Video Editing & Reels</option>
                      <option value="Creative Branding">Creative Branding</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Estimated Budget Range
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-hidden focus:border-emerald-500"
                    >
                      <option value="৳8,500 - ৳15,000">৳8,500 - ৳15,000</option>
                      <option value="৳15,000 - ৳30,000">৳15,000 - ৳30,000</option>
                      <option value="৳30,000 - ৳60,000">৳30,000 - ৳60,000</option>
                      <option value="৳60,000+ Enterprise">৳60,000+ Enterprise</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Project Details & Goals
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your business goals, target audience, and specific requirements..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-hidden focus:border-emerald-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
                >
                  Submit Project Inquiry →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
