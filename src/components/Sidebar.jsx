import React from 'react'
import {
  Home, User, FileText, Briefcase, Mail,
  Github, Linkedin, MessageCircle as Whatsapp,
} from 'lucide-react'
import ProfileImage from '../assets/image/profileImage.jpg'

const menuItems = [
  { id: 'home',      label: 'Home',      icon: Home     },
  { id: 'about',     label: 'About',     icon: User     },
  { id: 'resume',    label: 'Resume',    icon: FileText },
  { id: 'portfolio', label: 'Portfolio', icon: Briefcase},
  { id: 'contact',   label: 'Contact',   icon: Mail     },
]

const socialLinks = [
  { icon: Github,   href: 'https://github.com/EsLaM260' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/eslam-mostafa-27a617238/' },
  { icon: Whatsapp, href: 'https://wa.me/+201127023827' },
]

const Sidebar = ({ activeSection, onNavigate }) => (
  <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[240px] bg-[#0e0e0e] border-r border-[#1c1c1c] flex-col items-center overflow-auto py-10 z-[58]">
    {/* Profile */}
    <div className="relative mb-5 group cursor-pointer">
      <div className="w-[110px] h-[110px] rounded-full overflow-hidden border-2 border-[#252525] transition-all duration-500 group-hover:border-[#22c55e]/50 group-hover:shadow-[0_0_28px_rgba(34,197,94,0.2)]">
        <img
          src={ProfileImage}
          alt="Eslam Mostafa"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-[#22c55e] rounded-full border-2 border-[#0e0e0e] shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
    </div>

    {/* Name & Role */}
    <div className="text-center mb-5 px-4">
      <h2 className="text-white text-[17px] font-bold tracking-tight">Eslam Mostafa</h2>
      <p className="text-[#22c55e] text-[11px] font-semibold tracking-[0.18em] uppercase mt-1.5">
        Front-end Developer
      </p>
    </div>

    {/* Divider */}
    <div className="w-full px-8 mb-5">
      <div className="h-px bg-gradient-to-r from-transparent via-[#282828] to-transparent" />
    </div>

    {/* Skills tags */}
    <div className="flex flex-wrap justify-center gap-1.5 mb-8 px-5">
      {['JavaScript', 'React'].map((skill) => (
        <span
          key={skill}
          className="text-[9px] uppercase tracking-[0.14em] text-[#555] bg-[#171717] px-2.5 py-1 rounded-full border border-[#242424] hover:border-[#22c55e]/30 hover:text-gray-300 transition-all cursor-default"
        >
          {skill}
        </span>
      ))}
    </div>

    {/* Nav */}
    <nav className="w-full flex-1 px-3">
      <ul className="space-y-0.5">
        {menuItems.map((item) => {
          const isActive = activeSection === item.id
          return (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-[11px] rounded-xl transition-all duration-200 relative group/nav overflow-hidden ${
                  isActive
                    ? 'bg-[#22c55e]/[0.08] text-[#22c55e]'
                    : 'text-[#555] hover:text-[#ccc] hover:bg-white/[0.03]'
                }`}
              >
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full bg-[#22c55e] transition-all duration-300 ${
                    isActive ? 'h-[22px] opacity-100' : 'h-0 opacity-0'
                  }`}
                />
                <item.icon
                  size={15}
                  className={`flex-shrink-0 transition-transform duration-200 ${!isActive ? 'group-hover/nav:translate-x-[2px]' : ''}`}
                />
                <span
                  className={`font-medium text-[13px] tracking-wide transition-transform duration-200 ${!isActive ? 'group-hover/nav:translate-x-[2px]' : ''}`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.9)] flex-shrink-0" />
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>

    {/* Divider */}
    <div className="w-full px-8 mb-6 mt-4">
      <div className="h-px bg-gradient-to-r from-transparent via-[#282828] to-transparent" />
    </div>

    {/* Socials */}
    <div className="flex gap-5 text-[#444]">
      {socialLinks.map(({ icon: Icon, href }, i) => (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-200 hover:text-[#22c55e] hover:scale-110 hover:-translate-y-0.5 hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.5)]"
        >
          <Icon size={16} />
        </a>
      ))}
    </div>
  </aside>
)

export default Sidebar
