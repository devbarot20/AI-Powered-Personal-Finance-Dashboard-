import React, { useState } from 'react';
import { Send, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { sendContactMessage } from '../../services/api';

export function ContactView() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    try {
      await sendContactMessage(form);
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-6">
        <div className="glass-card p-6 sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="w-20 h-20 bg-wwealty-green/10 flex items-center justify-center rounded-full mb-6">
                <CheckCircle className="w-10 h-10 text-wwealty-green" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Message Sent!</h2>
              <p className="text-slate-500 max-w-sm mx-auto">
                Thank you for reaching out to wwealty. Our support team will get back to you within 24 hours.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-8 bg-wwealty-dark text-white px-8 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-slate-800 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                    <input 
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-wwealty-teal transition-all text-sm" 
                      placeholder="Dev Barot"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                    <input 
                      type="email"
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-wwealty-teal transition-all text-sm" 
                      placeholder="dev@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
                  <input 
                    value={form.subject}
                    onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-wwealty-teal transition-all text-sm" 
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Message</label>
                  <textarea 
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-wwealty-teal transition-all text-sm resize-none" 
                    placeholder="Type your message here..."
                  />
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-wwealty-dark text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass-card p-6 sm:p-8 flex flex-col justify-center h-full">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-wwealty-teal/10 flex items-center justify-center flex-shrink-0 text-wwealty-teal">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-slate-800">Email us</p>
                <p className="text-sm text-slate-500 mt-1">Our team is here to help.</p>
                <p className="text-sm font-semibold text-wwealty-teal mt-2">support@wwealty.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-600">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-slate-800">Call us</p>
                <p className="text-sm text-slate-500 mt-1">Mon-Fri from 9am to 6pm.</p>
                <p className="text-sm font-semibold text-slate-700 mt-2">+1 (555) 000-0000</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-slate-800">Office</p>
                <p className="text-sm text-slate-500 mt-1">Come say hello at our headquarters.</p>
                <p className="text-sm font-semibold text-slate-700 mt-2">123 Financial District, Tech City, 10101</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-wwealty-dark rounded-2xl text-white">
            <p className="font-bold mb-2">Live Support</p>
            <p className="text-sm text-white/60 mb-4">Chat with us live for immediate assistance.</p>
            <button className="w-full bg-wwealty-teal py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all">
              Start Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
