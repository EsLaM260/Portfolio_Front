import React, { useRef, useState } from 'react'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { sendContactEmail } from '../api'

const infoCards = [
  { icon: Mail,   label: 'Email',    value: 'islammostafa296@gmail.com' },
  { icon: Phone,  label: 'Phone',    value: '+201127023827'             },
  { icon: MapPin, label: 'Location', value: 'October, Giza, Egypt'      },
]

const Contact = () => {
  const formRef = useRef()
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(formRef.current)
    const name    = data.get('user_name')
    const email   = data.get('user_email')
    const subject = data.get('user_subject')
    const message = data.get('user_message')

    if (!name || !email || !message) {
      toast.error('Please fill in all required fields.')
      return
    }

    try {
      setSending(true)
      await sendContactEmail({ name, email, subject, message })
      formRef.current.reset()
      toast.success('Message sent successfully ✅')
    } catch (err) {
      toast.error('Failed to send message ❌')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24 px-5 sm:px-8 md:px-16 bg-[#0c0c0c]">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        viewport={{ once: true }}
        className="mb-10 md:mb-16 text-center"
      >
        <span className="text-[#22c55e] font-mono tracking-widest uppercase text-sm">Get In Touch</span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Contact Me</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
        {/* Info cards */}
        <div className="space-y-3 md:space-y-4">
          {infoCards.map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
              className="bg-[#141414] p-4 md:p-6 rounded-2xl border border-[#1e1e1e] flex items-center gap-4 hover:border-[#2a2a2a] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all group"
            >
              <div className="w-10 h-10 md:w-11 md:h-11 bg-[#1a1a1a] rounded-xl flex items-center justify-center text-[#22c55e] flex-shrink-0 border border-[#252525] group-hover:bg-[#22c55e]/10 group-hover:border-[#22c55e]/20 transition-all">
                <Icon size={17} />
              </div>
              <div>
                <p className="text-[#444] text-[10px] uppercase font-mono tracking-[0.14em] mb-0.5">{label}</p>
                <p className="text-[#ccc] font-medium text-sm">{value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-[#141414] p-5 md:p-8 rounded-2xl border border-[#1e1e1e] space-y-4 md:space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[#555] text-xs font-medium tracking-wide uppercase">Your Name</label>
                <input
                  type="text"
                  name="user_name"
                  placeholder="John Doe"
                  className="w-full bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl px-5 py-3.5 text-white text-sm placeholder-[#333] focus:border-[#22c55e]/40 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.06)] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[#555] text-xs font-medium tracking-wide uppercase">Email Address</label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="john@example.com"
                  className="w-full bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl px-5 py-3.5 text-white text-sm placeholder-[#333] focus:border-[#22c55e]/40 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.06)] transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[#555] text-xs font-medium tracking-wide uppercase">Subject</label>
              <input
                type="text"
                name="user_subject"
                placeholder="Project Inquiry"
                className="w-full bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl px-5 py-3.5 text-white text-sm placeholder-[#333] focus:border-[#22c55e]/40 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.06)] transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[#555] text-xs font-medium tracking-wide uppercase">Message</label>
              <textarea
                name="user_message"
                rows="5"
                placeholder="Tell me about your project..."
                className="w-full bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl px-5 py-3.5 text-white text-sm placeholder-[#333] focus:border-[#22c55e]/40 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.06)] transition-all resize-none"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={sending}
              className="w-full bg-[#22c55e] text-black text-sm font-bold py-4 rounded-xl hover:shadow-[0_8px_28px_rgba(34,197,94,0.3)] transition-all flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>{sending ? 'Sending…' : 'Send Message'}</span>
              <Send size={16} />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
