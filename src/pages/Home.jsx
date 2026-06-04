import React, { useState, useEffect } from 'react'
import Sidebar      from '../components/Sidebar'
import MobileHeader from '../components/MobileHeader'
import MobileMenu   from '../components/MobileMenu'
import Hero         from '../components/Hero'
import About        from '../components/About'
import Resume       from '../components/Resume'
import Skills       from '../components/Skills'
import Portfolio    from '../components/Portfolio'
import Testimonials from '../components/Testimonials'
import GithubStats  from '../components/GithubStats'
import Contact      from '../components/Contact'

const SECTIONS = ['home', 'about', 'resume', 'skills', 'portfolio', 'testimonials', 'contact']

export default function Home() {
  const [activeSection, setActiveSection]       = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    setIsMobileMenuOpen(false)
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers = SECTIONS.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.2 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((obs) => obs?.disconnect())
  }, [])

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex">
      <MobileHeader onMenuOpen={() => setIsMobileMenuOpen(true)} />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <Sidebar activeSection={activeSection} onNavigate={scrollToSection} />

      <main className="flex-1 md:ml-[240px] relative w-full overflow-x-hidden pt-14 md:pt-0">
        <Hero        onNavigate={scrollToSection} />
        <About       />
        <Resume      />
        <Skills      />
        <Portfolio   />
        {/* <GithubStats /> */}
        <Testimonials/>
        <Contact     />

        <footer className="py-10 border-t border-[#181818] text-center">
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#22c55e]/40 to-transparent mx-auto mb-8 rounded-full" />
          <p className="text-[#333] text-xs tracking-widest uppercase">
            © {new Date().getFullYear()} Eslam Mostafa. All rights reserved.
          </p>
          <p className="mt-2 text-[#22c55e]/30 text-[11px] tracking-[0.2em] uppercase font-mono">
            Crafted with precision
          </p>
        </footer>
      </main>
    </div>
  )
}
