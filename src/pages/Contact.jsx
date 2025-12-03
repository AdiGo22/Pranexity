import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredTime: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const response = await fetch('https://pranexity-ploj.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ 
          type: 'success', 
          message: 'Thank you! Your demo request has been sent successfully. We\'ll get back to you soon!' 
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          preferredTime: ''
        });
      } else {
        setSubmitStatus({ 
          type: 'error', 
          message: data.error || 'Something went wrong. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'Unable to connect to the server. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section 
      className="pt-32 pb-32 px-6 lg:px-8 min-h-screen relative overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* centered nav pill */}
      <div className="fixed left-1/2 transform -translate-x-1/2 top-20 sm:top-8 z-50">
        <div className="nav-pills inline-flex items-center gap-2 sm:gap-4 bg-black/40 border border-white/6 rounded-full px-3 sm:px-6 py-2 backdrop-blur-md">
          <a href="/" className="text-xs sm:text-sm text-white/70 px-2 sm:px-3 py-1 hover:text-white">Home</a>
          <a href="/services" className="text-xs sm:text-sm text-white/70 px-2 sm:px-3 py-1 hover:text-white">Expertise</a>
          <a href="/about" className="text-xs sm:text-sm text-white/70 px-2 sm:px-3 py-1 hover:text-white">About</a>
          <a href="/contact" className="text-xs sm:text-sm text-white/70 px-2 sm:px-3 py-1 hover:text-white">Contact</a>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="accent-bar mx-auto" />
          <h1 className="text-4xl lg:text-5xl font-light mb-4 text-white">Get In Touch</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Schedule a personalized demo to see how our AI solutions can transform your business
          </p>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
              }
            }
          }}
        >
          {/* Contact Form */}
          <motion.div 
            className="glass-card p-8 lg:p-10 rounded-2xl"
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.6, ease: "easeOut" }
              }
            }}
          >
            <h2 className="text-2xl font-medium text-white mb-6">Book a Free Demo</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm text-white/70">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-teal-500/50 focus:bg-white/8 transition-all"
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm text-white/70">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-teal-500/50 focus:bg-white/8 transition-all"
                  placeholder="your.email@company.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm text-white/70">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-teal-500/50 focus:bg-white/8 transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm text-white/70">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-teal-500/50 focus:bg-white/8 transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="preferredTime" className="block text-sm text-white/70">Preferred Time to Connect</label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-teal-500/50 focus:bg-white/8 transition-all"
                >
                  <option value="" className="bg-gray-900">Select a time</option>
                  <option value="morning" className="bg-gray-900">Morning (9 AM - 12 PM)</option>
                  <option value="afternoon" className="bg-gray-900">Afternoon (12 PM - 5 PM)</option>
                  <option value="evening" className="bg-gray-900">Evening (5 PM - 8 PM)</option>
                </select>
              </div>

              {submitStatus.message && (
                <div className={`p-4 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-teal-500/10 border border-teal-500/20 text-teal-400' 
                    : 'bg-red-500/10 border border-red-500/20 text-red-400'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-3 bg-teal-600 hover:bg-teal-500 px-6 py-4 rounded-full text-white font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Sending...' : 'Book Demo Session'}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="space-y-8"
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.6, ease: "easeOut" }
              }
            }}
          >
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-medium text-white mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-lg">
                    <Mail className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <div className="text-sm text-white/50 mb-1">Email Us</div>
                    <a href="mailto:tharun@pranexity.com" className="text-white hover:text-teal-400 transition-colors">
                      tharun@pranexity.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-lg">
                    <MapPin className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <div className="text-sm text-white/50 mb-1">Visit Our Office</div>
                    <div className="text-white mb-2">
                      Pranexity AI Solutions<br />
                      J P Nagar Phase 5, Bangalore
                    </div>
                    <a 
                      href="https://www.google.com/maps/place/J+P+Nagar+Phase+5,+J.+P.+Nagar,+Bengaluru,+Karnataka+560078"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="glass-card p-8 rounded-2xl bg-gradient-to-br from-teal-500/5 to-blue-500/5">
              <h3 className="text-xl font-medium text-white mb-3">Ready to Get Started?</h3>
              <p className="text-white/70 mb-4">
                Join the AI revolution. Let's build something extraordinary together.
              </p>
              <a 
                href="/services" 
                className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors text-sm"
              >
                Explore Our Services →
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
