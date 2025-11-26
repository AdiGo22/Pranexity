import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';

const founders = [
  {
    name: 'Gaurav Gupta',
    role: 'Co-Founder & CEO',
    bio: 'Former ML Lead at Wipro, Gaurav brings 12+ years of experience scaling AI products from research to production. Passionate about making enterprise AI accessible and reliable.',
    linkedin: '#',
    email: 'gaurav@pranexity.com'
  },
  {
    name: 'Tharun Benchappa',
    role: 'Co-Founder & CTO',
    bio: 'Ex-Principal Engineer at AWS, Tharun architected cloud platforms serving millions. Specializes in distributed systems, data infrastructure, and engineering excellence.',
    linkedin: '#',
    email: 'tharun@pranexity.com'
  }
];

export default function About() {
  return (
    <motion.section 
      className="pt-32 pb-24 px-6 lg:px-8 min-h-screen bg-black text-white"
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

      <div className="max-w-7xl mx-auto">
        {/* About Section */}
        <motion.div 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="accent-bar mx-auto" />
          <h1 className="text-4xl lg:text-5xl font-light mb-6">About Pranexity</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-6">
            Pranexity brings enterprise AI and infrastructure services to modern companies. We combine deep technical expertise with product-focused delivery to help teams ship reliable ML and software at scale.
          </p>
          
        </motion.div>

        {/* Founders Section */}
        <div className="mb-12">
          <motion.h2 
            className="text-3xl font-light mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Meet the Founders
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.5
                }
              }
            }}
          >
            {founders.map((founder, i) => (
              <motion.article 
                key={i} 
                className="glass-card p-8 rounded-xl group hover:border-teal-500/30 transition-all duration-300"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" }
                  }
                }}
              >
                {/* Avatar with actual photo */}
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-teal-500/20 group-hover:border-teal-500/50 transition-all">
                  <img 
                    src={`/images/${founder.name.split(' ')[0]}.jpg`}
                    alt={founder.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <h3 className="text-2xl font-medium mb-1">{founder.name}</h3>
                <div className="text-sm text-teal-400 mb-4">{founder.role}</div>
                <p className="text-white/70 leading-relaxed mb-6">{founder.bio}</p>

                {/* Contact links */}
                <div className="flex items-center gap-4">
                  <a 
                    href={founder.linkedin} 
                    className="p-2 border border-white/10 hover:border-teal-400 hover:bg-teal-500/10 rounded-lg transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a 
                    href={`mailto:${founder.email}`} 
                    className="p-2 border border-white/10 hover:border-teal-400 hover:bg-teal-500/10 rounded-lg transition-all"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>

        {/* Mission/Values (optional) */}
        {/* <div className="mt-20 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-6">Our Approach</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-lg">
              <div className="text-teal-400 text-4xl font-light mb-3">01</div>
              <h4 className="text-lg font-semibold mb-2">Technical Excellence</h4>
              <p className="text-sm text-white/60">World-class engineering standards and deep domain expertise.</p>
            </div>
            <div className="glass-card p-6 rounded-lg">
              <div className="text-teal-400 text-4xl font-light mb-3">02</div>
              <h4 className="text-lg font-semibold mb-2">Product Mindset</h4>
              <p className="text-sm text-white/60">Focus on outcomes that drive measurable business value.</p>
            </div>
            <div className="glass-card p-6 rounded-lg">
              <div className="text-teal-400 text-4xl font-light mb-3">03</div>
              <h4 className="text-lg font-semibold mb-2">Partnership</h4>
              <p className="text-sm text-white/60">Collaborative delivery aligned with your team and goals.</p>
            </div>
          </div>
        </div> */}
      </div>
    </motion.section>
  );
}
