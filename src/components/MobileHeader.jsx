import React from 'react'
import { Menu, Github } from 'lucide-react'

const MobileHeader = ({ onMenuOpen }) => (
  <header
    className="fixed top-0 left-0 right-0 z-[70] md:hidden flex items-center justify-between px-4 h-14"
    style={{
      background: 'rgba(10,10,10,0.92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid #1a1a1a',
    }}
  >
    <button
      onClick={onMenuOpen}
      className="w-9 h-9 flex items-center justify-center rounded-lg text-[#666] hover:text-white hover:bg-white/5 transition-all active:scale-95"
    >
      <Menu size={20} />
    </button>

    <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none select-none">
      <span className="text-white text-[15px] font-bold tracking-tight leading-tight">Eslam Mostafa</span>
      <span className="text-[#22c55e] text-[9px] font-semibold tracking-[0.2em] uppercase leading-tight">Front-end Dev</span>
    </div>

    <a
      href="https://github.com/EsLaM260"
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 flex items-center justify-center rounded-lg text-[#555] hover:text-[#22c55e] transition-all active:scale-95"
    >
      <Github size={18} />
    </a>
  </header>
)

export default MobileHeader
