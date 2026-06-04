import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
  const cards = [
    { title: 'Pixel Perfection', desc: 'Every detail matters in high-end design.' },
    { title: 'Clean Code', desc: 'Maintainable and scalable architecture.' },
  ]

  return (
    <section
      id="about"
      className="py-16 md:py-24 px-5 sm:px-8 md:px-16 bg-[#0c0c0c]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="text-[#22c55e] font-mono tracking-widest uppercase text-sm">
            A bit about me
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-5 md:mb-6">
            Building Digital Futures
          </h2>
          <p className="text-[#555] text-base md:text-lg leading-relaxed mb-5 md:mb-6">
            I am Eslam Mostafa, a passionate Front-end Developer with over 2
            years of experience in creating modern, high-performance web
            applications. My journey started with a fascination for digital art,
            which naturally evolved into a career in building beautiful,
            functional code.
          </p>
          <p className="text-[#484848] leading-relaxed mb-7 md:mb-8 text-sm">
            I specialize in React and modern CSS frameworks, focusing on
            building interfaces that are not only visually stunning but also
            highly accessible and efficient.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className="bg-[#141414] p-5 rounded-xl border border-[#1f1f1f] hover:border-[#2d2d2d] hover:shadow-[0_6px_20px_rgba(0,0,0,0.4)] transition-all duration-200 cursor-default"
              >
                <div className="w-6 h-[2px] bg-[#22c55e] mb-3 rounded-full" />
                <h4 className="text-white font-bold text-sm mb-1.5">{card.title}</h4>
                <p className="text-[#4a4a4a] text-xs leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative hidden lg:block"
        >
          <div className="aspect-square rounded-2xl overflow-hidden border border-[#1f1f1f] hover:border-[#22c55e]/20 hover:shadow-[0_0_40px_rgba(34,197,94,0.07)] transition-all duration-500 group">
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
              alt="Workspace"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.02]"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#22c55e]/8 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-[#22c55e]/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  )
}

export default About
