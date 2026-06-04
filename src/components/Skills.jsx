import React from 'react'
import { motion } from 'framer-motion'
import * as SiIcons from 'react-icons/si'
import {
  Code2, Layout, Cpu, Terminal, Globe, Database,
  Zap, Github, Figma, Brain, Layers
} from 'lucide-react'



const getIconComponent = (iconName) => {
  if (iconName.startsWith('Si')) {
    return SiIcons[iconName]
  } else if (iconName === 'Brain') {
    return Brain
  } else if (iconName === 'Zap') {
    return Zap
  } else if (iconName === 'Layers') {
    return Layers
  }[]
  return null
}

const skillGroups = [
  {
    title: 'Front-end',
    skills: [
      { name: 'JavaScript', icon: 'SiJavascript', color: 'text-yellow-400' },
      { name: 'React', icon: 'SiReact', color: 'text-green-400' },
      { name: 'Next.js', icon: 'SiNextdotjs', color: 'text-blue-300' },
      { name: 'Tailwind CSS', icon: 'SiTailwindcss', color: 'text-teal-400' },
    ],
  },
  {
    title: 'Back-end',
    skills: [
      { name: 'Node.js', icon: 'SiNodedotjs', color: 'text-green-400' },
      { name: 'MongoDB', icon: 'SiMongodb', color: 'text-indigo-400' },
      { name: 'Express.js', icon: 'SiExpress', color: 'text-gray-300' },
      { name: 'MVC', icon: 'Layers', color: 'text-purple-300' },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Figma', icon: 'SiFigma', color: 'text-orange-400' },
      { name: 'AI Tools', icon: 'Brain', color: 'text-green-400' },
      { name: 'Framer Motion', icon: 'Zap', color: 'text-purple-400' },
      { name: 'GitHub', icon: 'SiGithub', color: 'text-gray-300' },
    ],
  },
]

const Skills = () => (
  <section id="skills" className="py-16 md:py-24 px-5 sm:px-8 md:px-16 bg-[#0c0c0c]">
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true }}
      className="mb-10 md:mb-16"
    >
      <span className="text-[#22c55e] font-mono tracking-widest uppercase text-sm">Abilities</span>
      <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Professional Skills</h2>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
      {skillGroups.map((group, gi) => (
        <motion.div
          key={group.title}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: gi * 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-[15px] font-bold text-white mb-7 border-l-2 border-[#22c55e] pl-4 tracking-wide">
            {group.title}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {group.skills.map((skill, si) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: gi * 0.1 + si * 0.06 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className="bg-[#141414] p-4 rounded-xl border border-[#1f1f1f] hover:border-[#2e2e2e] hover:bg-[#181818] hover:shadow-[0_6px_20px_rgba(0,0,0,0.4)] transition-all duration-200 flex flex-col items-center text-center group cursor-default"
              >
                {(() => {
                  const IconComponent = getIconComponent(skill.icon)
                  return IconComponent ? (
                    <IconComponent
                      size={28}
                      className={`mb-2.5 ${skill.color} transition-all duration-200 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_currentColor]`}
                    />
                  ) : null
                })()}
                <span className="text-[#666] text-[11px] font-medium group-hover:text-[#999] transition-colors duration-200">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
)

export default Skills
