import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Code, Database, Cloud, Server, ArrowRight } from 'lucide-react'

const expertise = [
  {
    id: 'ai',
    title: 'AI Solutions',
    subtitle: 'Custom ML models, NLP, CV, and predictive systems',
    summary: 'We design, train and deploy production-grade machine learning models. From problem framing to MLOps and monitoring, we ensure models drive real product value.',
    role: 'ML Engineering, MLOps, Product AI',
    color: 'from-teal-500 to-blue-400',
    icon: Brain,
  },
  {
    id: 'software',
    title: 'Software Development',
    subtitle: 'End-to-end product engineering for scalable platforms',
    summary: 'Product-minded engineering teams building reliable, maintainable platforms. Frontend, backend, APIs and product strategy to ship impactful features.',
    role: 'Full-Stack, Product, API Design',
    color: 'from-blue-500 to-green-400',
    icon: Code,
  },
  {
    id: 'data',
    title: 'Data Engineering',
    subtitle: 'Reliable data pipelines and streaming for real-time analytics',
    summary: 'Architect and operate data platforms enabling fast, trusted analytics and ML. ETL, streaming, data contracts and observability are core to our work.',
    role: 'Data Platform, ETL, Streaming',
    color: 'from-pink-500 to-teal-500',
    icon: Database,
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    subtitle: 'Secure cloud architecture, IaC and CI/CD',
    summary: 'Secure, cost-optimized cloud platforms with Infrastructure as Code, observability and automated delivery pipelines to move fast safely.',
    role: 'Cloud, SRE, DevOps',
    color: 'from-yellow-400 to-orange-500',
    icon: Cloud,
  },
]

export default function Services() {
  return (
    <motion.div 
      className="min-h-screen bg-black text-white py-24 px-6 lg:px-8"
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
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="accent-bar mx-auto" />
          <h1 className="text-4xl lg:text-5xl font-light">Expertise</h1>
          <p className="text-white/70 max-w-3xl mx-auto mt-3">We combine product thinking and engineering rigor to deliver AI-first software, data platforms and resilient cloud practices.</p>
        </motion.div>

        <motion.div 
          className="space-y-12"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
              }
            }
          }}
        >
          {expertise.map((e, i) => {
            const Icon = e.icon || Brain
            return (
              <motion.article 
                key={e.id} 
                className="work-card grid lg:grid-cols-12 gap-6 items-stretch"
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" }
                  }
                }}
              >
                <div className="lg:col-span-7 block relative rounded-xl overflow-hidden group">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img 
                      src={`https://images.unsplash.com/photo-${
                        e.id === 'ai' ? '1677442136019-21780ecad995?w=1920&q=90' : 
                        e.id === 'software' ? '1498050108023-c5249f4df085?w=1920&q=90' : 
                        e.id === 'data' ? '1639322537228-f710d846310a?w=1920&q=90' : 
                        '1558494949-ef010cbdcc31?w=1920&q=90'
                      }`}
                      alt={e.title}
                      className="w-full h-full object-cover opacity-30 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${e.color} opacity-10 mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
                  
                  {/* Content */}
                  <div className="relative p-12 lg:p-20 h-full flex flex-col justify-end z-10">
                    <div className="text-sm text-teal-300 uppercase tracking-wider mb-2 opacity-90">Expertise Area</div>
                    <h2 className="text-3xl lg:text-4xl font-medium mb-3 text-white">{e.title}</h2>
                    <p className="text-white/80 max-w-2xl mb-6">{e.subtitle}</p>
                    <div className="flex items-center gap-3 text-sm text-teal-300 group-hover:gap-4 transition-all duration-300">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-6">
                  <div className="glass-card p-6 rounded-xl h-full flex flex-col justify-between">
                    <div>
                      <div className="text-sm text-white/50 uppercase tracking-wider mb-2">Overview</div>
                      <h3 className="text-2xl font-medium mb-3">{e.title}</h3>
                      <p className="text-white/60 mb-4">{e.summary}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-white/60">Capabilities</div>
                      <div className="text-sm text-teal-300">{e.role}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card p-4 rounded-lg flex items-center gap-3">
                      <Icon className="w-8 h-8 text-teal-400" />
                      <div>
                        <div className="text-sm text-white/60">Focus</div>
                        <div className="text-sm font-semibold">Production-ready</div>
                      </div>
                    </div>
                    <div className="glass-card p-4 rounded-lg">
                      <div className="text-sm text-white/60">Approach</div>
                      <div className="text-sm font-semibold">Outcome-driven</div>
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>

      <style jsx>{`
        .work-card > a { background: linear-gradient(135deg, rgba(2,6,23,0.6), rgba(2,6,23,0.4)); border: 1px solid rgba(255,255,255,0.04); }
        .work-card a:hover { transform: translateY(-6px); transition: transform .3s ease; }
      `}</style>
      
      {/* Capabilities Section */}
      <section className="py-20 px-6 lg:px-8 mt-12 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <div className="accent-bar mx-auto" />
            <h3 className="text-3xl font-medium">Capabilities</h3>
            <p className="text-white/70 max-w-2xl mx-auto mt-3">Deep technical capabilities across ML, engineering, data and cloud — delivered by cross-functional teams.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {title: 'Model Development', desc: 'End-to-end ML from research to production.'},
              {title: 'Product Engineering', desc: 'Robust front/back systems and APIs.'},
              {title: 'Data Platforms', desc: 'Streaming, warehousing and observability.'},
              {title: 'Cloud & DevOps', desc: 'IaC, CI/CD and resilient infra.'}
            ].map((c, i) => (
              <div key={i} className="glass-card p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="service-icon bg-gradient-to-br from-teal-500 to-blue-400"><Brain className="w-4 h-4" /></div>
                  <h4 className="text-lg font-semibold">{c.title}</h4>
                </div>
                <p className="text-sm text-white/60">{c.desc}</p>
                <div className="mt-auto">
                  <a href="/contact" className="text-sm text-teal-300 inline-flex items-center gap-2">Get help <ArrowRight className="w-4 h-4"/></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services CTA */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="glass-card inline-block p-10">
            <h3 className="text-3xl font-medium mb-3">Interested in working with us?</h3>
            <p className="text-white/70 mb-6">Schedule a conversation and we'll assess how to help you deliver measurable ML and engineering outcomes.</p>
            <a href="/contact" className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-teal-600 hover:bg-teal-500 text-black font-medium">Contact Sales</a>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
