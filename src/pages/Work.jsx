import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const caseStudies = [
  {
    slug: 'fintech-ai-platform',
    title: 'Fintech AI Platform',
    subtitle: 'Explainable ML to accelerate lending decisions',
    summary: 'Built a transparent machine learning pipeline that reduced manual review by 70% while improving risk controls and throughput for a leading fintech.',
    role: 'ML Engineering, Data Platform, Product Design',
  },
  {
    slug: 'retail-personalization',
    title: 'Retail Personalization',
    subtitle: 'Realtime product recommendations at scale',
    summary: 'A realtime recommendation engine that increased average order value by 25% and lifted conversion with contextual orchestration.',
    role: 'Realtime Systems, ML Ops, Frontend'
  },
  {
    slug: 'telecom-analytics',
    title: 'Telecom Analytics',
    subtitle: 'Streaming analytics for better network reliability',
    summary: 'Streaming pipelines and anomaly detection that improved network uptime and reduced incident mean-time-to-detect.',
    role: 'Streaming, Observability, SRE'
  }
]

export default function Work(){
  return (
    <motion.div 
      className="min-h-screen bg-black text-white py-24 px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* centered nav pill */}
      <div className="fixed left-1/2 transform -translate-x-1/2 top-8 z-50">
        <div className="nav-pills inline-flex items-center gap-4 bg-black/40 border border-white/6 rounded-full px-6 py-2 backdrop-blur-md">
          <a href="/" className="text-sm text-white/70 px-3 py-1 hover:text-white">Home</a>
          <a href="/services" className="text-sm text-white/70 px-3 py-1 hover:text-white">Expertise</a>
          <a href="/about" className="text-sm text-white/70 px-3 py-1 hover:text-white">About</a>
          <a href="/contact" className="text-sm text-white/70 px-3 py-1 hover:text-white">Contact</a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="accent-bar mx-auto" />
          <h1 className="text-4xl lg:text-5xl font-light">Selected Work</h1>
          <p className="text-white/70 max-w-3xl mx-auto mt-3">Large-format case studies showcasing product thinking, engineering rigor, and measurable outcomes.</p>
        </motion.div>

        <motion.div 
          className="space-y-12"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.25,
                delayChildren: 0.3
              }
            }
          }}
        >
          {caseStudies.map((c, i) => (
            <motion.article 
              key={c.slug} 
              className="work-card grid lg:grid-cols-12 gap-6 items-stretch"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.7, ease: "easeOut" }
                }
              }}
            >
              <a href={`/work/${c.slug}`} className="lg:col-span-7 block relative rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 to-blue-400/8 opacity-90" />
                <div className="relative p-12 lg:p-20 h-full flex flex-col justify-end">
                  <div className="text-sm text-teal-300 uppercase tracking-wider mb-2">Case Study</div>
                  <h2 className="text-3xl lg:text-4xl font-medium mb-3">{c.title}</h2>
                  <p className="text-white/70 max-w-2xl mb-6">{c.subtitle}</p>
                  <div className="flex items-center gap-3 text-sm text-teal-300">
                    <span>Read story</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </a>

              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="glass-card p-6 rounded-xl h-full flex flex-col justify-between">
                  <div>
                    <div className="text-sm text-white/50 uppercase tracking-wider mb-2">Overview</div>
                    <h3 className="text-2xl font-medium mb-3">{c.title}</h3>
                    <p className="text-white/60 mb-4">{c.summary}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-white/60">Role</div>
                    <div className="text-sm text-teal-300">{c.role}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-card p-4 rounded-lg">
                    <div className="text-sm text-white/60">Outcome</div>
                    <div className="text-lg font-semibold">Measured impact</div>
                  </div>
                  <div className="glass-card p-4 rounded-lg">
                    <div className="text-sm text-white/60">Tools</div>
                    <div className="text-lg font-semibold">Python, Kafka, Terraform</div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .work-card > a { background: linear-gradient(135deg, rgba(2,6,23,0.6), rgba(2,6,23,0.4)); border: 1px solid rgba(255,255,255,0.04); }
        .work-card a:hover { transform: translateY(-6px); transition: transform .3s ease; }
      `}</style>
    </motion.div>
  )
}
