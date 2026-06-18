import React from 'react'
import { motion } from 'framer-motion'

const Hero = ({ onNavigate }) => {
  const stats = [
    { value: '8+', label: 'Projects' },
    { value: '2+', label: 'Yrs Exp.' },
    { value: '10+', label: 'Clients' },
  ]
  const API_URL = import.meta.env.VITE_API_URL

  console.log(API_URL);
  
  return (
    <section
      id="home"
      className="min-h-[calc(100vh-56px)] md:min-h-screen flex flex-col justify-center px-5 sm:px-8 md:px-16 pt-8 pb-12 md:pt-20 md:pb-0 relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-3xl relative w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-[#22c55e] font-mono mb-3 md:mb-4 tracking-[0.2em] uppercase text-[11px] md:text-[13px]"
        >
          Welcome to my world
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[40px] sm:text-6xl md:text-8xl font-bold text-white mb-4 md:mb-6 leading-[1.08]"
        >
          Front-end <br />
          <span className="text-[#22c55e]">Developer</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="text-[#585858] text-base md:text-xl mb-8 md:mb-10 max-w-xl leading-relaxed"
        >
          I build high-end, futuristic digital experiences with a focus on clean
          code and pixel-perfect UI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 md:mb-16"
        >
          <button
            onClick={() => onNavigate('portfolio')}
            className="w-full sm:w-auto bg-[#22c55e] text-black text-sm font-bold px-8 py-4 rounded-full transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(34,197,94,0.35)] active:scale-95 text-center"
          >
            View Portfolio
          </button>
          <a
            href="/EslamMostafa.pdf"
            download="EslamMostafa.pdf"
            className="w-full sm:w-auto border border-[#252525] text-[#aaa] text-sm font-bold px-8 py-4 rounded-full hover:border-[#22c55e]/30 hover:text-white hover:bg-[#22c55e]/[0.05] transition-all duration-200 hover:-translate-y-1 active:scale-95 text-center inline-block"
          >
            myResume.pdf
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex gap-6 sm:gap-10 md:gap-16 border-t border-[#1c1c1c] pt-8 md:pt-10"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 + i * 0.08 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {stat.value}
              </h3>
              <p className="text-[#444] text-[10px] md:text-xs uppercase tracking-[0.14em] mt-0.5 md:mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
