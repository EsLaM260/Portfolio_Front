import React from 'react'
import { motion } from 'framer-motion'

const experiences = [
  // {
  //   id: 1,
  //   type: 'experience',
  //   title: 'Senior Front-end Developer',
  //   company: 'Tech Innovators Inc.',
  //   date: '2024 - Present',
  //   description:
  //     'Leading the front-end team in developing complex web applications using React and Next.js. Implementing high-performance UI components and ensuring accessibility.',
  // },
  {
    id: 2,
    type: 'experience',
    title: 'Front-end Developer',
    company: 'Digital Solutions Agency',
    date: '2022 - Present',
    description:
      'Developed responsive websites and web applications for various clients. Collaborated with designers to translate UI/UX designs into pixel-perfect code.',
  },
  {
    id: 3,
    type: 'education',
    title: 'Bachelor of Computer Science',
    company: 'University of Engineering',
    date: '2020 - 2024',
    description:
      'Focused on software engineering, web technologies, and human-computer interaction.',
  },
]

const Resume = () => (
  <section id="resume" className="py-16 md:py-24 px-5 sm:px-8 md:px-16">
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true }}
      className="mb-10 md:mb-16"
    >
      <span className="text-[#22c55e] font-mono tracking-widest uppercase text-sm">
        Experience & Education
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">My Resume</h2>
    </motion.div>

    <div className="relative max-w-4xl">
      {/* Timeline line */}
      <div
        className="absolute left-[23px] top-0 bottom-0 w-[1px]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(34,197,94,0.4) 0%, rgba(34,197,94,0.15) 40%, rgba(34,34,34,0.3) 100%)',
        }}
      />

      <div className="space-y-8 md:space-y-10">
        {experiences.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="relative pl-14 md:pl-16"
          >
            {/* Dot */}
            <div className="absolute left-0 top-4 w-[46px] h-[46px] bg-[#0f0f0f] border border-[#222] rounded-full flex items-center justify-center z-10">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  item.type === 'experience'
                    ? 'bg-[#22c55e] shadow-[0_0_10px_rgba(34,197,94,0.7)]'
                    : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.7)]'
                }`}
              />
            </div>

            <motion.div
              whileHover={{ y: -2 }}
              className="bg-[#141414] p-5 md:p-7 rounded-2xl border border-[#1e1e1e] hover:border-[#22c55e]/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-250"
            >
              <span className="text-[#22c55e] text-[11px] font-mono tracking-[0.15em] uppercase mb-2 block">
                {item.date}
              </span>
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">{item.title}</h3>
              <h4 className="text-[#555] font-medium text-sm mb-3 md:mb-4">{item.company}</h4>
              <p className="text-[#484848] text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

export default Resume
