import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Database, Shield, ArrowRight } from 'lucide-react';

export default function Home() {
  const canvasRef = useRef(null);
  const gridCanvasRef = useRef(null);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const statsRef = useRef(null);

  const services = [
    {
      icon: Brain,
      title: 'AI Solutions',
      description: 'Custom machine learning models and AI integration to automate processes and drive intelligent decision-making.',
      features: ['ML Model Development', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics']
    },
    {
      icon: Code,
      title: 'Software Development',
      description: 'End-to-end development of scalable applications tailored to your business needs.',
      features: ['Web Applications', 'Mobile Apps', 'Enterprise Software', 'API Development']
    },
    {
      icon: Database,
      title: 'Data Engineering',
      description: 'Build robust data pipelines and infrastructure for real-time analytics and insights.',
      features: ['Data Warehousing', 'ETL Pipelines', 'Big Data Solutions', 'Cloud Migration']
    },
    {
      icon: Shield,
      title: 'Cloud & DevOps',
      description: 'Secure, scalable cloud infrastructure with automated deployment and monitoring.',
      features: ['AWS/Azure/GCP', 'CI/CD Pipelines', 'Infrastructure as Code', 'Security Audits']
    }
  ];

  const stats = [
    { value: 500, label: 'Projects Delivered', suffix: '+' },
    { value: 98, label: 'Client Satisfaction', suffix: '%' },
    { value: 50, label: 'AI Models Deployed', suffix: '+' },
    { value: 24, label: 'Support Available', suffix: '/7' },
  ];

  useEffect(() => {
    // Grid animation
    const gridCanvas = gridCanvasRef.current;
    let gridRaf = null;
    if (gridCanvas) {
      const ctx = gridCanvas.getContext('2d');
      let offset = 0;

      const resize = () => {
        const dpr = window.devicePixelRatio || 1;
        gridCanvas.width = gridCanvas.clientWidth * dpr;
        gridCanvas.height = gridCanvas.clientHeight * dpr;
        if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      resize();
      window.addEventListener('resize', resize);

      const drawGrid = () => {
        if (!ctx) return;
        const width = gridCanvas.width;
        const height = gridCanvas.height;
        ctx.clearRect(0, 0, width, height);

        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(20, 184, 166, 0.03)');
        gradient.addColorStop(0.5, 'rgba(45, 212, 191, 0.06)');
        gradient.addColorStop(1, 'rgba(20, 184, 166, 0.03)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;

        for (let x = 0; x < width; x += 60) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        for (let y = offset % 60; y < height; y += 60) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        offset += 0.3;
        gridRaf = requestAnimationFrame(drawGrid);
      };

      drawGrid();
    }

    // Globe animation
    const canvas = canvasRef.current;
    let globeRaf = null;
    let rotation = 0;
    if (canvas) {
      const ctx = canvas.getContext('2d');

      const resizeCanvas = () => {
        const dpr = window.devicePixelRatio || 1;
        const cw = canvas.clientWidth || 460;
        const ch = canvas.clientHeight || 460;
        canvas.width = Math.round(cw * dpr);
        canvas.height = Math.round(ch * dpr);
        if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      const drawGlobe = () => {
        if (!ctx) return;
        // canvas.width/height are in device pixels; use CSS pixel sizes for layout math
        const cssW = canvas.clientWidth || 460;
        const cssH = canvas.clientHeight || 460;
        const dpr = window.devicePixelRatio || 1;
        const w = canvas.width / dpr;
        const h = canvas.height / dpr;
        const cx = w / 2;
        const cy = h / 2;
        const radius = Math.min(w, h) * 0.45;

        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;

        // Latitude
        for (let i = 0; i < 6; i++) {
          const radiusY = Math.abs(radius * Math.cos((i * Math.PI) / 6));
          ctx.beginPath();
          ctx.ellipse(cx, cy, radius, radiusY, 0, 0, 2 * Math.PI);
          ctx.stroke();
        }

        // Longitude
        for (let i = 0; i < 12; i++) {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate((rotation * Math.PI) / 180 + (i * Math.PI) / 6);
          ctx.beginPath();
          ctx.ellipse(0, 0, radius, radius * 0.36, 0, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.restore();
        }

        // Outer circle
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Dots
        const dots = 20;
        for (let i = 0; i < dots; i++) {
          const angle = ((rotation + i * (360 / dots)) * Math.PI) / 180;
          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius * 0.4;

          ctx.beginPath();
          ctx.arc(x, y, 3, 0, 2 * Math.PI);
          ctx.fillStyle = 'rgba(20, 184, 166, 0.6)';
          ctx.fill();

          const glow = ctx.createRadialGradient(x, y, 0, x, y, 8);
          glow.addColorStop(0, 'rgba(20, 184, 166, 0.3)');
          glow.addColorStop(1, 'rgba(20, 184, 166, 0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, 2 * Math.PI);
          ctx.fill();
        }

        rotation = (rotation + 0.4) % 360;
      };

      const animateGlobe = () => {
        drawGlobe();
        globeRaf = requestAnimationFrame(animateGlobe);
      };

      animateGlobe();
    }

    // Stats counter animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (gridRaf) cancelAnimationFrame(gridRaf);
      if (globeRaf) cancelAnimationFrame(globeRaf);
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, [hasAnimated]);

  const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-counter');
    counters.forEach((counter, index) => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 16);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Banner - inspired by provided design */}
      <section className="relative overflow-visible min-h-[760px] px-6 lg:px-8 pt-8">
        {/* background grid (no pointer events so nav links are clickable) */}
        <canvas ref={gridCanvasRef} width="1920" height="1080" className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* nebula / vignette layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-0 w-1/2 h-96 rounded-full bg-gradient-to-br from-[#0d9488]/60 to-transparent blur-3xl opacity-80" />
          <div className="absolute -top-40 right-0 w-1/2 h-96 rounded-full bg-gradient-to-br from-[#2dd4bf]/60 to-transparent blur-3xl opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.0),rgba(0,0,0,0.6))]" />
        </div>

        {/* centered nav pill */}
        <div className="fixed left-1/2 transform -translate-x-1/2 top-20 sm:top-8 z-50">
              <div className="nav-pills inline-flex items-center gap-2 sm:gap-4 bg-black/40 border border-white/6 rounded-full px-3 sm:px-6 py-2 backdrop-blur-md">
                <a href="/" className="text-xs sm:text-sm text-white/70 px-2 sm:px-3 py-1 hover:text-white">Home</a>
                <a href="/services" className="text-xs sm:text-sm text-white/70 px-2 sm:px-3 py-1 hover:text-white">Expertise</a>
                <a href="/about" className="text-xs sm:text-sm text-white/70 px-2 sm:px-3 py-1 hover:text-white">About</a>
                <a href="/contact" className="text-xs sm:text-sm text-white/70 px-2 sm:px-3 py-1 hover:text-white">Contact</a>
              </div>
        </div>

        <div className="relative max-w-7xl mx-auto z-20 pt-24 lg:pt-40">
          <div className="grid lg:grid-cols-2 items-center gap-12">
            <div className="space-y-6 lg:pr-8">
              <div className="inline-flex items-center gap-3 justify-start">
                {/* <div className="text-xs bg-teal-700/20 text-teal-300 px-3 py-1 rounded-full">Digital Marketing Powered by AI</div> */}
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                Revolutionize Your Business
                <br />
                <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">with AI-Powered Solutions</span>
              </h1>

              <p className="text-lg text-white/70 max-w-2xl">Unlock the full potential of your marketing strategies with cutting-edge AI technology.</p>

              <div className="flex items-center gap-4 mt-6">
                <a href="/contact" className="cta-btn inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-medium shadow">Get In Touch</a>
                <a href="/services" className="ghost-btn inline-flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 text-white/80">Learn More</a>
              </div>
            </div>

            {/* Visual column with arcs + globe */}
            <div className="relative flex items-center justify-center">
              {/* layered arcs behind globe */}
              <div className="hero-arcs pointer-events-none absolute -bottom-8 lg:-bottom-20 left-1/2 transform -translate-x-1/2 lg:left-auto lg:right-12 z-10">
                <div className="arc arc-1 rounded-full" />
                <div className="arc arc-2 rounded-full" />
                <div className="arc arc-3 rounded-full" />
              </div>

              {/* globe canvas (small centered / large right) */}
              <div className="w-[340px] h-[340px] lg:w-[460px] lg:h-[460px] relative z-20">
                <canvas ref={canvasRef} className="rotating-globe-canvas w-full h-full block mx-auto" />
                <div className="rotating-globe-glow absolute inset-0" />
              </div>

              {/* subtle overlay cards (bottom) */}
              <div className="hidden lg:flex absolute left-8 bottom-10 gap-6 z-0">
                <div className="w-40 h-24 bg-black/50 border border-white/5 rounded-lg backdrop-blur-sm" />
                <div className="w-56 h-28 bg-black/50 border border-white/5 rounded-lg backdrop-blur-sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-4 sm:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group glass-card panel p-6 sm:p-4 hover:scale-105 transition-transform duration-300">
              <div className="text-4xl sm:text-5xl font-light mb-2 sm:mb-2 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                <span className="stat-counter" data-target={stat.value}>0</span>{stat.suffix}
              </div>
              <div className="text-xs sm:text-sm text-white/40 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section (summary) */}
      <section id="services" className="py-32 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-sm text-teal-400 uppercase tracking-wider mb-4">Our Services</h2>
            <h3 className="text-5xl font-light mb-4">Enterprise-Grade Solutions</h3>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">Comprehensive IT services powered by cutting-edge AI technology</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {services.map((service, i) => (
              <div key={i} className="group relative overflow-hidden" style={{ opacity: 1, transform: 'translateY(0)', transition: `all 0.6s ease ${i * 0.1}s` }}>
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                <div className="relative glass-card p-10 group-hover:border-teal-500/50 transition-all duration-500 h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl group-hover:bg-teal-500/10 transition-all duration-500" />
                  <service.icon className="w-14 h-14 text-teal-400 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
                  <h4 className="text-3xl font-light mb-4 group-hover:text-teal-400 transition-colors duration-300">{service.title}</h4>
                  <p className="text-white/60 mb-8 leading-relaxed">{service.description}</p>
                  <div className="space-y-3">
                    {service.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-3 text-sm text-white/50 group-hover:text-white/70 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-r border-b border-teal-500/20 group-hover:border-teal-500/50 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work / Case Studies */}
      {/* <section id="work" className="py-24 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-sm text-teal-400 uppercase tracking-wider mb-4">Featured</h2>
            <h3 className="text-4xl font-light mb-4">Selected Case Studies</h3>
            <p className="text-white/60 max-w-2xl mx-auto">Work that demonstrates how we combine strategy, design, and engineering to deliver measurable results.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[{
              title: 'Fintech AI Platform',
              desc: 'Accelerated loan approvals using explainable ML models, reducing manual review by 70%.'
            },{
              title: 'Retail Personalization',
              desc: 'Real-time recommendations driving a 25% uplift in average order value.'
            },{
              title: 'Telecom Analytics',
              desc: 'Network optimization and anomaly detection with streaming data pipelines.'
            }].map((caseItem, i) => (
              <a key={i} href="#" className="group block case-card glass-card p-8 rounded-xl transition-shadow">
                <div className="text-sm text-teal-400 uppercase tracking-wider mb-2">Case Study</div>
                <h4 className="text-2xl font-medium mb-3 group-hover:text-teal-400 transition-colors">{caseItem.title}</h4>
                <p className="text-white/60 mb-6">{caseItem.desc}</p>
                <div className="flex items-center gap-3 text-sm text-teal-300 group-hover:text-teal-200">
                  <span>Read story</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section> */}

      {/* Approach / How we work */}
      <section id="approach" className="py-20 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center mb-10">
          <h3 className="text-4xl font-light">Our Approach</h3>
          <p className="text-white/60 max-w-2xl mx-auto">Iterative, measurable, and aligned with business outcomes — from discovery to production.</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
          {[
            {title: 'Discover', desc: 'Research, stakeholder interviews, and data assessment.'},
            {title: 'Design', desc: 'Prototypes, UX flows, and validation with users.'},
            {title: 'Build', desc: 'Engineering, ML pipelines, and scalable architecture.'},
            {title: 'Optimize', desc: 'Monitoring, iterative improvements, and support.'}
          ].map((step, i) => (
            <div key={i} className="process-step text-center">
              <div className="text-3xl font-semibold mb-3 text-teal-300">{i + 1}</div>
              <h5 className="text-xl mb-2">{step.title}</h5>
              <p className="text-white/60 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

    

      {/* CTA Section */}
      <section id="contact" className="py-32 px-8 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-blue-500/5" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-6xl font-light mb-8">Ready to Innovate?</h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">Let's discuss how Pranexity can transform your business with intelligent solutions.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a 
              href="/contact" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-teal-600 hover:bg-teal-500 rounded-full text-white font-medium transition-all transform hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(20,184,166,0.3)]"
            >
              Schedule a Consultation
            </a>
            <a 
              href="/services" 
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 hover:border-teal-400 hover:bg-teal-500/10 rounded-full text-white font-medium transition-all"
            >
              Explore Services
            </a>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-400"></div>
              <span>Free consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-400"></div>
              <span>No commitment required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-1">
              <h3 className="text-white font-semibold text-2xl mb-4">Pranexity</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                AI that elevates, not just automates. Building intelligence with empathy.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-3">
                <li><a href="/" className="text-white/60 hover:text-teal-400 transition-colors text-sm">Home</a></li>
                <li><a href="/about" className="text-white/60 hover:text-teal-400 transition-colors text-sm">About Us</a></li>
                <li><a href="/services" className="text-white/60 hover:text-teal-400 transition-colors text-sm">Services</a></li>
                <li><a href="/contact" className="text-white/60 hover:text-teal-400 transition-colors text-sm">Contact</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
              <ul className="space-y-3">
                <li><a href="/services" className="text-white/60 hover:text-teal-400 transition-colors text-sm">AI Solutions</a></li>
                <li><a href="/services" className="text-white/60 hover:text-teal-400 transition-colors text-sm">Software Development</a></li>
                <li><a href="/services" className="text-white/60 hover:text-teal-400 transition-colors text-sm">Data Engineering</a></li>
                <li><a href="/services" className="text-white/60 hover:text-teal-400 transition-colors text-sm">Cloud & DevOps</a></li>
              </ul>
            </div>

            {/* Get in Touch */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Get in Touch</h4>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:support@pranexity.com" className="text-white/60 hover:text-teal-400 transition-colors text-sm">
                    support@pranexity.com
                  </a>
                </li>
                <li className="text-white/60 text-sm">
                  J P Nagar Phase 5<br />
                  Bangalore, India
                </li>
              </ul>
              <div className="flex items-center gap-3 mt-6">
                <a href="https://www.linkedin.com/company/pranexity/" target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 hover:border-teal-400 hover:bg-teal-500/10 rounded-lg transition-all">
                  <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="https://x.com/pranexity" target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 hover:border-teal-400 hover:bg-teal-500/10 rounded-lg transition-all">
                  <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://www.instagram.com/pranexity" target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 hover:border-teal-400 hover:bg-teal-500/10 rounded-lg transition-all">
                  <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .rotating-globe-canvas { width: 100%; max-width: 460px; }
        .rotating-globe-glow { position: absolute; inset: 0; background: radial-gradient(circle, rgba(20,184,166,0.12), transparent); filter: blur(80px); }

        /* Hero arcs */
        .hero-arcs { width: 760px; height: 220px; pointer-events: none; }
        .hero-arcs .arc { position: absolute; left: 50%; transform: translateX(-50%); bottom: 0; border-radius: 9999px; filter: blur(18px); opacity: 0.95; }
        .hero-arcs .arc-1 { width: 760px; height: 260px; background: linear-gradient(90deg, rgba(20,184,166,0.28), rgba(45,212,191,0.08)); }
        .hero-arcs .arc-2 { width: 560px; height: 200px; background: linear-gradient(90deg, rgba(20,184,166,0.20), rgba(99,102,241,0.06)); transform: translateX(-6%); }
        .hero-arcs .arc-3 { width: 420px; height: 140px; background: linear-gradient(90deg, rgba(20,184,166,0.38), rgba(59,130,246,0.04)); transform: translateX(6%); }

        /* CTAs */
        .cta-btn { transition: transform .18s ease, box-shadow .18s ease; }
        .cta-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(99,102,241,0.12); }
        .ghost-btn { transition: background .12s ease, border-color .12s ease; }
        .ghost-btn:hover { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.12); }

        /* Responsive tweaks */
        @media (max-width: 1024px) {
          .hero-arcs { width: 540px; height: 160px; }
          .hero-arcs .arc-1 { width: 540px; height: 200px; }
          .hero-arcs .arc-2 { width: 420px; height: 140px; }
          .hero-arcs .arc-3 { width: 320px; height: 100px; }
        }

        @media (max-width: 640px) {
          .nav-pills { transform: none !important; left: 50% !important; }
        }

        
      `}</style>
    </motion.div>
  );
}
