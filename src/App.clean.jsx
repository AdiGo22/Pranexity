import React, { useEffect, useState } from 'react'
import { Sparkles, Mail, Linkedin, Twitter } from 'lucide-react'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Work from './pages/Work'
import Contact from './pages/Contact'

export default function App() {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [scrolled, setScrolled] = useState(false)
	const [route, setRoute] = useState(() => window.location.pathname)

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 20)
		const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY })
		const handleRoute = () => setRoute(window.location.pathname)

		window.addEventListener('scroll', handleScroll)
		window.addEventListener('mousemove', handleMouseMove)
		window.addEventListener('popstate', handleRoute)

		// Handle link clicks
		const handleClick = (e) => {
			if (e.target.tagName === 'A' && e.target.href.startsWith(window.location.origin)) {
				e.preventDefault()
				const path = new URL(e.target.href).pathname
				window.history.pushState({}, '', path)
				setRoute(path)
				window.scrollTo(0, 0)
			}
		}

		document.addEventListener('click', handleClick)

		return () => {
			window.removeEventListener('scroll', handleScroll)
			window.removeEventListener('mousemove', handleMouseMove)
			window.removeEventListener('popstate', handleRoute)
			document.removeEventListener('click', handleClick)
		}
	}, [])

	return (
		<div className="min-h-screen bg-black text-white overflow-x-hidden">
			<div
				className="fixed w-96 h-96 rounded-full pointer-events-none z-50"
				style={{
					background: 'radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%)',
					left: mousePosition.x - 192,
					top: mousePosition.y - 192,
				}}
			/>

			<nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
				<div className="max-w-7xl mx-auto px-8 nav-inner flex justify-between items-center pt-9" style={{height: 80}}>
					<div className="flex items-center gap-4">
						<a href="/" className="flex items-center">
							<img src="/PranexityLogo.png" alt="Pranexity" className="h-24 w-auto" />
							<span className="nav-brand text-lg leading-none -ml-16">PRANEXITY</span>
						</a>
					</div>

					{/* right navigation removed — using centered hero nav instead */}
				</div>
			</nav>

			<main>
				{route === '/' && <Home />}
				{route === '/about' && <About />}
				{route === '/services' && <Services />}
				{route === '/work' && <Work />}
				{route.startsWith('/work/') && <Work />}
				{route === '/contact' && <Contact />}
			</main>

			<footer className="py-12 px-8 border-t border-white/5 bg-black/50 mt-16">
				<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
					<div className="flex items-center">
						<div className="text-sm text-white/60 leading-none -ml-4">© 2025 Pranexity</div>
					</div>

					<div className="flex items-center gap-3">
						<a href="/" className="text-white/50 hover:text-teal-400 transition-colors">Privacy</a>
						<a href="/" className="text-white/50 hover:text-teal-400 transition-colors">Terms</a>
						<a href="mailto:support@pranexity.com" className="p-2 border border-white/10 hover:border-teal-400 hover:bg-teal-500/10 transition-all"><Mail className="w-4 h-4" /></a>
						<a href="https://www.linkedin.com/company/pranexity" className="p-2 border border-white/10 hover:border-teal-400 hover:bg-teal-500/10 transition-all"><Linkedin className="w-4 h-4" /></a>
						<a href="https://twitter.com/pranexity" className="p-2 border border-white/10 hover:border-teal-400 hover:bg-teal-500/10 transition-all"><svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
</a>
					</div>
				</div>
			</footer>
		</div>
	)
}   
