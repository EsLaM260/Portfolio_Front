import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Home, User, FileText, Briefcase, Mail, Github, Linkedin, Twitter } from 'lucide-react'

const navItems = [
  { id: 'home',      label: 'Home',      icon: Home     },
  { id: 'about',     label: 'About',     icon: User     },
  { id: 'resume',    label: 'Resume',    icon: FileText },
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase},
  { id: 'contact',   label: 'Contact',   icon: Mail     },
]

const MobileMenu = ({ isOpen, onClose, activeSection, onNavigate }) => {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    const h = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) setTimeout(() => closeRef.current?.focus(), 80)
  }, [isOpen])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[75] bg-black/75 md:hidden"
            style={{ backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' }}
            onClick={onClose}
          />

          <motion.nav
            key="mobile-drawer"
            role="dialog"
            aria-modal="true"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 36, mass: 0.85 }}
            className="fixed top-0 left-0 h-full z-[80] w-[300px] flex flex-col md:hidden"
            style={{ background: '#0e0e0e', borderRight: '1px solid #1c1c1c' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-5 border-b border-[#181818]">
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-[#252525]">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150"
                      alt="Eslam Mostafa"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#22c55e] rounded-full border-2 border-[#0e0e0e] shadow-[0_0_6px_rgba(34,197,94,0.7)]" />
                </div>
                <div>
                  <p className="text-white text-[14px] font-bold leading-tight">Eslam Mostafa</p>
                  <p className="text-[#22c55e] text-[10px] font-semibold tracking-[0.16em] uppercase mt-0.5">Front-end Dev</p>
                </div>
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#555] hover:text-white hover:bg-white/5 transition-all active:scale-90"
              >
                <X size={17} />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 overflow-y-auto px-3 pt-4 pb-6" style={{ scrollbarWidth: 'none' }}>
              <p className="text-[#333] text-[9px] uppercase tracking-[0.18em] font-mono px-3 mb-3">Navigation</p>
              <ul className="space-y-0.5">
                {navItems.map((item, i) => {
                  const isActive = activeSection === item.id
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.22, delay: i * 0.045 }}
                    >
                      <button
                        onClick={() => { onNavigate(item.id); onClose() }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group active:scale-[0.98] ${
                          isActive
                            ? 'bg-[#22c55e]/[0.09] text-[#22c55e]'
                            : 'text-[#555] hover:text-[#ccc] hover:bg-white/[0.03]'
                        }`}
                      >
                        <span
                          className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full bg-[#22c55e] transition-all ${
                            isActive ? 'h-5 opacity-100' : 'h-0 opacity-0'
                          }`}
                        />
                        <item.icon size={15} className="flex-shrink-0" />
                        <span className="font-medium text-[14px]">{item.label}</span>
                        {isActive && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.9)] flex-shrink-0" />
                        )}
                      </button>
                    </motion.li>
                  )
                })}
              </ul>

              <div className="my-6 px-3">
                <div className="h-px bg-gradient-to-r from-transparent via-[#222] to-transparent" />
              </div>

              <p className="text-[#333] text-[9px] uppercase tracking-[0.18em] font-mono px-3 mb-3">Expertise</p>
              <div className="flex flex-wrap gap-1.5 px-3">
                {['JavaScript', 'React', 'Next.js', 'UI/UX', 'Tailwind'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] uppercase tracking-widest text-[#484848] bg-[#161616] px-2.5 py-1 rounded-full border border-[#222]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 pb-8 pt-4 border-t border-[#181818]">
              <p className="text-[#333] text-[9px] uppercase tracking-[0.18em] font-mono mb-3">Connect</p>
              <div className="flex gap-3">
                {[
                  { Icon: Github,   label: 'GitHub',   href: 'https://github.com/EsLaM260' },
                  { Icon: Linkedin, label: 'LinkedIn',  href: '#' },
                  { Icon: Twitter,  label: 'Twitter',   href: '#' },
                ].map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-[#161616] border border-[#222] flex items-center justify-center text-[#444] hover:text-[#22c55e] hover:border-[#22c55e]/30 hover:bg-[#22c55e]/5 transition-all active:scale-90"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
