import React, { useState, useEffect, useRef } from 'react';
import { Brain, ArrowRight, Mail, Linkedin, Twitter, Code, Database, Shield, Sparkles } from 'lucide-react';

export default function Pranexity() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const canvasRef = useRef(null);
  const gridCanvasRef = useRef(null);
  const rotationRef = useRef(0);

  const services = [
    {
      icon: Brain,
      title: "AI Solutions",
      description: "Custom machine learning models and AI integration to automate processes and drive intelligent decision-making.",
      features: ["ML Model Development", "Natural Language Processing", "Computer Vision", "Predictive Analytics"]
    },
    {
      icon: Code,
      title: "Software Development",
      description: "End-to-end development of scalable applications tailored to your business needs.",
      features: ["Web Applications", "Mobile Apps", "Enterprise Software", "API Development"]
    },
    {
      icon: Database,
      title: "Data Engineering",
      description: "Build robust data pipelines and infrastructure for real-time analytics and insights.",
      features: ["Data Warehousing", "ETL Pipelines", "Big Data Solutions", "Cloud Migration"]
    },
    {
      icon: Shield,
      title: "Cloud & DevOps",
      description: "Secure, scalable cloud infrastructure with automated deployment and monitoring.",
      features: ["AWS/Azure/GCP", "CI/CD Pipelines", "Infrastructure as Code", "Security Audits"]
    }
  ];

  const stats = [
    { value: "500+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "50+", label: "AI Models Deployed" },
    { value: "24/7", label: "Support Available" }
  ];

  useEffect(() => {
    // Handlers
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Rotation updater
    const interval = setInterval(() => {
      rotationRef.current = (rotationRef.current + 0.5) % 360;
      setRotation(rotationRef.current);
    }, 50);

    // Grid animation (uses its own RAF)
    const gridCanvas = gridCanvasRef.current;
    let gridRaf = null;
    if (gridCanvas) {
      const ctx = gridCanvas.getContext('2d');
      let offset = 0;

      const resize = () => {
        const dpr = window.devicePixelRatio || 1;
        gridCanvas.width = gridCanvas.clientWidth * dpr;
        gridCanvas.height = gridCanvas.clientHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      resize();
      window.addEventListener('resize', resize);

      const drawGrid = () => {
        const width = gridCanvas.width;
        const height = gridCanvas.height;
        ctx.clearRect(0, 0, width, height);

        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(139, 92, 246, 0.03)');
        gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.06)');
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0.03)');

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

    // Globe animation (uses RAF)
    const canvas = canvasRef.current;
    let globeRaf = null;
    if (canvas) {
      const ctx = canvas.getContext('2d');

      const resizeCanvas = () => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      const drawGlobe = () => {
        const w = canvas.width;
        const h = canvas.height;
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
          ctx.rotate((rotationRef.current * Math.PI) / 180 + (i * Math.PI) / 6);
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
          const angle = ((rotationRef.current + i * (360 / dots)) * Math.PI) / 180;
          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius * 0.4;

          ctx.beginPath();
          ctx.arc(x, y, 3, 0, 2 * Math.PI);
          ctx.fillStyle = 'rgba(139, 92, 246, 0.6)';
          ctx.fill();

          const glow = ctx.createRadialGradient(x, y, 0, x, y, 8);
          glow.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
          glow.addColorStop(1, 'rgba(139, 92, 246, 0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, 2 * Math.PI);
          ctx.fill();
        }
      };

      const animateGlobe = () => {
        drawGlobe();
        globeRaf = requestAnimationFrame(animateGlobe);
      };

      animateGlobe();
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
      if (gridRaf) cancelAnimationFrame(gridRaf);
      if (globeRaf) cancelAnimationFrame(globeRaf);
    };
  }, []);
    return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* AI Cursor Glow */}
      <div 
        className="fixed w-96 h-96 rounded-full pointer-events-none z-50"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-violet-500" />
            <span className="text-xl font-light tracking-wider">PRANEXITY</span>
          </div>
          <div className="flex gap-8 text-sm">
            <a href="#services" className="hover:text-violet-400 transition-colors">Services</a>
            <a href="#solutions" className="hover:text-violet-400 transition-colors">Solutions</a>
            <a href="#about" className="hover:text-violet-400 transition-colors">About</a>
            <a href="#contact" className="px-6 py-2 bg-violet-600 hover:bg-violet-500 rounded-full transition-all">
              Contact Us
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Stripe Style */}
      <section className="relative pt-32 pb-24 px-8 overflow-hidden min-h-screen flex items-center">
        {/* Animated Grid Background */}
        <canvas ref={gridCanvasRef} width="1920" height="1080" className="absolute inset-0 w-full h-full" />
        
        {/* Floating Gradient Orbs */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/10 to-violet-500/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center z-10">
          <div className="space-y-8">
            
            
            <div>
              <h1 className="text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-none">
                AI infrastructure
                <br />
                for modern
                <br />
                <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  enterprises
                </span>
              </h1>
            </div>
            
            <p className="text-xl text-white/70 leading-relaxed max-w-2xl">
              Transform your business with intelligent solutions. Pranexity delivers enterprise-grade AI services and IT infrastructure that scales with your ambition.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="bg-violet-600 text-white px-8 py-4 rounded-full hover:bg-violet-500 transition-all flex items-center gap-2 text-base font-medium">
                Start Building
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white/5 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full hover:bg-white/10 transition-all text-base font-medium">
                Contact Sales
              </button>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-white/60 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400"></div>
                <span>AI Solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400"></div>
                <span>Cloud Infrastructure</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400"></div>
                <span>Data Engineering</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400"></div>
                <span>DevOps Excellence</span>
              </div>
            </div>
          </div>

          {/* Rotating Globe - Right Side */}
          <div className="flex items-center justify-end">
            <div className="relative mt-1">
              <canvas ref={canvasRef} width="450" height="450" className="w-full max-w-[500px]" />
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-blue-500/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-5xl font-light mb-2 bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-sm text-white/40 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-sm text-violet-400 uppercase tracking-wider mb-4">Our Services</h2>
            <h3 className="text-5xl font-light mb-4">Enterprise-Grade Solutions</h3>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Comprehensive IT services powered by cutting-edge AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {services.map((service, i) => (
              <div 
                key={i} 
                className="group relative overflow-hidden"
                style={{
                  opacity: 1,
                  transform: 'translateY(0)',
                  transition: `all 0.6s ease ${i * 0.1}s`
                }}
              >
                {/* Card Background with Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                
                {/* Card Content */}
                <div className="relative border border-white/10 bg-black/40 backdrop-blur-sm p-10 group-hover:border-violet-500/50 transition-all duration-500 h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full blur-2xl group-hover:bg-violet-500/10 transition-all duration-500"></div>
                  
                  <service.icon className="w-14 h-14 text-violet-400 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" />
                  
                  <h4 className="text-3xl font-light mb-4 group-hover:text-violet-400 transition-colors duration-300">
                    {service.title}
                  </h4>
                  
                  <p className="text-white/60 mb-8 leading-relaxed">{service.description}</p>
                  
                  <div className="space-y-3">
                    {service.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-3 text-sm text-white/50 group-hover:text-white/70 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  {/* Decorative Corner */}
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-r border-b border-violet-500/20 group-hover:border-violet-500/50 transition-colors"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-32 px-8 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-blue-500/5"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-6xl font-light mb-8">Ready to Innovate?</h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            Let's discuss how Pranexity can transform your business with intelligent solutions.
          </p>
          <div className="flex gap-6 justify-center">
            <a href="mailto:contact@pranexity.com" className="group inline-flex items-center gap-3 bg-violet-600 px-10 py-5 hover:bg-violet-500 transition-all duration-300">
              <Mail className="w-5 h-5" />
              <span>Contact Us</span>
            </a>
            <a href="#" className="group inline-flex items-center gap-3 border border-white/20 px-10 py-5 hover:bg-white/5 transition-all duration-300">
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-white/5 bg-black/50">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-12">
            {/* Brand */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-8 h-8 text-violet-500" />
                <span className="text-2xl font-light tracking-wider">PRANEXITY</span>
              </div>
              <p className="text-sm text-white/50 max-w-xs leading-relaxed">
                Leading the future of intelligent enterprise solutions through AI innovation.
              </p>
            </div>

            {/* Links - Horizontal Layout */}
            <div className="flex flex-wrap gap-x-12 gap-y-6 text-sm">
              <div className="flex flex-col gap-3">
                <h4 className="text-white/80 font-medium mb-1">Services</h4>
                <a href="#" className="text-white/50 hover:text-violet-400 transition-colors">AI Solutions</a>
                <a href="#" className="text-white/50 hover:text-violet-400 transition-colors">Software Development</a>
              </div>
              
              <div className="flex flex-col gap-3">
                <h4 className="text-white/80 font-medium mb-1">Solutions</h4>
                <a href="#" className="text-white/50 hover:text-violet-400 transition-colors">Data Engineering</a>
                <a href="#" className="text-white/50 hover:text-violet-400 transition-colors">Cloud & DevOps</a>
              </div>
              
              <div className="flex flex-col gap-3">
                <h4 className="text-white/80 font-medium mb-1">Company</h4>
                <a href="#" className="text-white/50 hover:text-violet-400 transition-colors">About Us</a>
                <a href="#" className="text-white/50 hover:text-violet-400 transition-colors">Careers</a>
              </div>
              
              <div className="flex flex-col gap-3">
                <h4 className="text-white/80 font-medium mb-1">Resources</h4>
                <a href="#" className="text-white/50 hover:text-violet-400 transition-colors">Case Studies</a>
                <a href="#" className="text-white/50 hover:text-violet-400 transition-colors">Blog</a>
              </div>
            </div>

            {/* Social */}
            <div className="flex flex-col gap-4">
              <h4 className="text-sm text-white/80 font-medium">Connect</h4>
              <div className="flex gap-3">
                <a href="#" className="p-2 border border-white/10 hover:border-violet-400 hover:bg-violet-500/10 transition-all">
                  <Linkedin className="w-5 h-5 text-white/50 hover:text-violet-400" />
                </a>
                <a href="#" className="p-2 border border-white/10 hover:border-violet-400 hover:bg-violet-500/10 transition-all">
                  <Twitter className="w-5 h-5 text-white/50 hover:text-violet-400" />
                </a>
                <a href="#" className="p-2 border border-white/10 hover:border-violet-400 hover:bg-violet-500/10 transition-all">
                  <Mail className="w-5 h-5 text-white/50 hover:text-violet-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
              <div>© 2025 Pranexity. All rights reserved.</div>
              <div className="flex gap-8">
                <a href="#" className="hover:text-violet-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-violet-400 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-violet-400 transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.8s ease forwards;
          opacity: 0;
        }
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 25s ease-in-out infinite;
          animation-delay: -5s;
        }
        @keyframes particle {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0);
          }
          10% {
            opacity: 1;
            transform: translateY(-10px) scale(1);
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) scale(0);
          }
        }
        .animate-particle {
          animation: particle linear infinite;
        }
          .rotating-globe-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rotating-globe-canvas {
  width: 100%;
  max-width: 450px;
}

.rotating-globe-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(139,92,246,0.1), transparent);
  filter: blur(80px);
}

      `}</style>
    </div>
  );
}