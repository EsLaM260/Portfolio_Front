import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Check, ExternalLink, Github, ZoomIn, ChevronLeft, ChevronRight,
} from 'lucide-react'
import * as SiIcons from 'react-icons/si'
import * as FaIcons from 'react-icons/fa'

/* ── Lightbox ──────────────────────────────────────────── */
const Lightbox = ({ src, alt, onClose }) => {
  useEffect(() => {
    const h = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        key="lb"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.88, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-5xl max-h-[90vh] mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-[88vh] object-contain rounded-xl shadow-2xl"
          />
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 w-9 h-9 bg-[#1a1a1a] border border-[#333] rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-[#22c55e]/50 transition-all"
          >
            <X size={15} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ── Tech Badge ────────────────────────────────────────── */
const getIconComponent = (iconName) => {
  if (iconName.startsWith('Si')) {
    return SiIcons[iconName]
  } else if (iconName.startsWith('Fa')) {
    return FaIcons[iconName]
  }
  return null
}

const TechBadge = ({ tech }) => {
  const IconComponent = getIconComponent(tech.icon)

  return (
    <div className="flex flex-col items-center gap-1.5 group">
      <div className="w-11 h-11 rounded-xl bg-[#111] border border-[#252525] flex items-center justify-center transition-all duration-200 group-hover:border-[#22c55e]/30 group-hover:bg-[#141414]">
        {IconComponent ? (
          <IconComponent size={20} style={{ color: tech.color }} />
        ) : (
          <span className={`text-lg`}>{tech.icon}</span>
        )}
      </div>
      <span className="text-[10px] text-[#555] font-medium tracking-wide group-hover:text-[#888] transition-colors">
        {tech.name}
      </span>
    </div>
  )
}

/* ── Main Panel ────────────────────────────────────────── */
const ProjectPanel = ({ project, onClose }) => {
  const [activeImage, setActiveImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const isOpen = !!project

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const h = (e) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) setLightboxOpen(false)
        else onClose()
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [isOpen, lightboxOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    setActiveImage(0)
    setLightboxOpen(false)
  }, [project?.id])

  const images = project?.images ?? []
  const currentImg = images[activeImage] ?? project?.image
  const prev = useCallback(() => setActiveImage((i) => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setActiveImage((i) => (i + 1) % images.length), [images.length])

  const panelVariants = {
    initial: isMobile ? { y: '100%' } : { x: '100%' },
    animate: isMobile ? { y: 0 } : { x: 0 },
    exit: isMobile ? { y: '100%' } : { x: '100%' },
  }

  return (
    <>
      {lightboxOpen && project && (
        <Lightbox src={currentImg} alt={project.title} onClose={() => setLightboxOpen(false)} />
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="panel-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[100] bg-black/65 backdrop-blur-[2px]"
              onClick={onClose}
            />

            <motion.aside
              key="panel-body"
              role="dialog"
              aria-modal="true"
              initial={panelVariants.initial}
              animate={panelVariants.animate}
              exit={panelVariants.exit}
              transition={{ type: 'spring', stiffness: 340, damping: 34, mass: 0.9 }}
              className="fixed z-[110] bg-[#141414] flex flex-col shadow-2xl
                bottom-0 left-0 right-0 h-[92%] rounded-t-3xl border-t border-[#1e1e1e]
                md:bottom-auto md:top-0 md:left-auto md:right-0 md:h-full md:w-[460px] md:rounded-none md:border-t-0 md:border-l"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag handle (mobile) */}
              <div className="flex-shrink-0 flex justify-center pt-3 pb-1 md:hidden" aria-hidden="true">
                <div className="w-10 h-[5px] rounded-full bg-[#2e2e2e]" />
              </div>

              {/* Header */}
              <div className="flex items-start justify-between px-5 md:px-7 pt-4 md:pt-7 pb-4 border-b border-[#1e1e1e] flex-shrink-0">
                <div className="pr-4">
                  <span className="text-[#22c55e] text-[10px] font-mono uppercase tracking-[0.18em] block mb-1.5">
                    {project.category}
                  </span>
                  <h2 className="text-white text-[19px] md:text-[22px] font-bold leading-tight">
                    {project.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 w-9 h-9 bg-[#1c1c1c] border border-[#272727] rounded-full flex items-center justify-center text-[#555] hover:text-white hover:border-[#22c55e]/40 transition-all active:scale-90 mt-0.5"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Scrollable body */}
              <div
                className="flex-1 overflow-y-auto overscroll-contain px-5 md:px-7 py-5 space-y-6"
                style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
              >
                {/* Main image */}
                <div
                  className="relative rounded-xl overflow-hidden aspect-video bg-[#0f0f0f] group cursor-zoom-in"
                  onClick={() => setLightboxOpen(true)}
                >
                  <motion.img
                    key={currentImg}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    src={currentImg}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/10">
                      <ZoomIn size={16} className="text-white" />
                    </div>
                  </div>
                  <div className="md:hidden absolute bottom-2 right-2">
                    <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/10">
                      <ZoomIn size={12} className="text-white/70" />
                    </div>
                  </div>

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); prev() }}
                        className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 hover:bg-[#22c55e]/20 transition-all active:scale-90"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); next() }}
                        className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 hover:bg-[#22c55e]/20 transition-all active:scale-90"
                      >
                        <ChevronRight size={16} />
                      </button>
                      <div className="md:hidden absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {images.map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-[3px] rounded-full transition-all duration-200 ${activeImage === idx ? 'w-5 bg-[#22c55e]' : 'w-2 bg-white/30'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onMouseEnter={() => setActiveImage(idx)}
                        onClick={() => setActiveImage(idx)}
                        className={`relative flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all active:scale-95 w-[80px] h-[54px] ${activeImage === idx
                          ? 'border-[#22c55e] shadow-[0_0_12px_rgba(34,197,94,0.35)]'
                          : 'border-[#252525] hover:border-[#383838]'
                          }`}
                      >
                        <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                        {activeImage !== idx && <div className="absolute inset-0 bg-black/30" />}
                      </button>
                    ))}
                  </div>
                )}

                {/* Overview */}
                <div>
                  <h3 className="text-white text-[12px] font-semibold uppercase tracking-[0.12em] mb-3 flex items-center gap-2">
                    <span className="w-4 h-[2px] bg-[#22c55e] rounded-full inline-block" />
                    Overview
                  </h3>
                  <p className="text-[#505050] text-sm leading-[1.85]">
                    {project.longDescription ?? project.description}
                  </p>
                </div>

                {/* Technologies */}
                {project.technologies?.length > 0 && (
                  <div>
                    <h3 className="text-white text-[12px] font-semibold uppercase tracking-[0.12em] mb-4 flex items-center gap-2">
                      <span className="w-4 h-[2px] bg-[#22c55e] rounded-full inline-block" />
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-3 md:gap-4">
                      {project.technologies.map((tech) => (
                        <TechBadge key={tech.name} tech={tech} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Features */}
                {project.useCases?.length > 0 && (
                  <div>
                    <h3 className="text-white text-[12px] font-semibold uppercase tracking-[0.12em] mb-3 flex items-center gap-2">
                      <span className="w-4 h-[2px] bg-[#22c55e] rounded-full inline-block" />
                      Key Features
                    </h3>
                    <ul className="space-y-2.5">
                      {project.useCases.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.25, delay: i * 0.05 }}
                          className="flex items-start gap-3 text-[#4e4e4e] text-sm leading-relaxed"
                        >
                          <span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/25 flex items-center justify-center mt-0.5">
                            <Check size={9} className="text-[#22c55e]" />
                          </span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <div className="flex gap-3 pt-1 pb-6">
                  <a
                    href={project.liveUrl ?? '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#22c55e] text-black text-sm font-bold rounded-xl hover:bg-white transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(34,197,94,0.3)] active:scale-95"
                  >
                    <ExternalLink size={14} />
                    Live Preview
                  </a>
                  <a
                    href={project.githubUrl ?? '#'}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 border text-sm font-bold rounded-xl transition-all
                    ${project.githubDisplay === false
                        ? 'bg-[#111] border-[#222] text-[#555] cursor-not-allowed pointer-events-none'
                        : 'bg-[#1c1c1c] border-[#272727] text-[#aaa] hover:text-white hover:border-[#22c55e]/30 hover:bg-[#22c55e]/5 hover:-translate-y-0.5 active:scale-95'
                      }`}                  >
                    <Github size={14} />
                    View Code
                  </a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default ProjectPanel
