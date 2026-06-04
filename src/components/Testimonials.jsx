import React from 'react'
import { Quote } from 'lucide-react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    text: "Eslam is a visionary developer. His attention to detail and ability to create futuristic interfaces is unmatched. Our conversion rate increased by 40% after the redesign.",
    author: 'Sarah Jenkins',
    role: 'CEO at NexaStream',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=150&h=150',
  },
  {
    id: 2,
    text: 'Working with Eslam was a breeze. He translated our complex requirements into a clean, modern dashboard that our users love. Highly recommended!',
    author: 'Michael Chen',
    role: 'CTO at CloudBase',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fit=crop&w=150&h=150',
  },
]

const Testimonials = () => (
  <section id="testimonials" className="py-16 md:py-24 px-5 sm:px-8 md:px-16">
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true }}
      className="mb-10 md:mb-16"
    >
      <span className="text-[#22c55e] font-mono tracking-widest uppercase text-sm">Kind Words</span>
      <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Testimonials</h2>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
      {testimonials.map((t, i) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: i * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
          className="bg-[#141414] p-6 md:p-9 rounded-2xl border border-[#1e1e1e] relative group hover:border-[#22c55e]/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.55)] transition-all duration-300 overflow-hidden"
        >
          <Quote className="absolute top-7 right-7 text-[#22c55e]/[0.06] w-20 h-20 group-hover:text-[#22c55e]/[0.1] transition-all" />
          <div className="flex gap-1 mb-5">
            {Array.from({ length: 5 }).map((_, si) => (
              <div key={si} className="w-1.5 h-1.5 rounded-full bg-[#22c55e] opacity-70" />
            ))}
          </div>
          <p className="text-[#4e4e4e] text-base leading-[1.8] mb-8 italic relative z-10 group-hover:text-[#5a5a5a] transition-colors">
            "{t.text}"
          </p>
          <div className="flex items-center gap-4">
            <img
              src={t.image}
              alt={t.author}
              className="w-11 h-11 rounded-full border border-[#282828] object-cover"
            />
            <div>
              <h4 className="text-white font-bold text-sm">{t.author}</h4>
              <p className="text-[#22c55e] text-[10px] uppercase font-mono tracking-[0.14em] mt-0.5">
                {t.role}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
)

export default Testimonials
