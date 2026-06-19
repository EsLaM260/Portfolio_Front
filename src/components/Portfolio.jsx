import React, { useState, useEffect } from 'react'
import { Eye, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import ProjectPanel from './ProjectPanel'

const API_URL = import.meta.env.VITE_API_URL

const Portfolio = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log(API_URL);
        const res = await fetch(`${API_URL}/api/projects`)
        if (!res.ok) throw new Error(`Server responded with ${res.status}`)
        const data = await res.json()
        if (!data.success) throw new Error(data.message || 'Failed to load projects')
        setProjects(data.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const filters = ['All', 'FullStack App', 'Frontend', 'Backend']
  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.filter === activeFilter)

  return (
    <>
      <section id="portfolio" className="py-16 md:py-24 px-5 sm:px-8 md:px-16">

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <span className="text-[#22c55e] font-mono tracking-widest uppercase text-sm">Selected Works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Featured Portfolio</h2>
          </div>

          <div className="flex gap-1 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${activeFilter === f
                    ? 'bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20'
                    : 'text-[#555] hover:text-gray-300 border border-transparent hover:border-[#282828]'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="rounded-2xl bg-[#141414] border border-[#1f1f1f] overflow-hidden animate-pulse"
              >
                <div className="h-52 md:h-60 bg-[#1a1a1a]" />
                <div className="p-4 md:p-6 flex flex-col gap-3">
                  <div className="h-2.5 w-24 bg-[#1f1f1f] rounded-full" />
                  <div className="h-4 w-3/4 bg-[#1f1f1f] rounded-full" />
                  <div className="h-3 w-full bg-[#1a1a1a] rounded-full" />
                  <div className="h-3 w-2/3 bg-[#1a1a1a] rounded-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
            <span className="text-3xl">⚠️</span>
            <p className="text-[#555] text-sm font-mono">Could not load projects</p>
            <p className="text-[#333] text-xs font-mono">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <p className="text-[#555] text-sm font-mono">No projects found.</p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedProject(project)}
                className="group relative overflow-hidden rounded-2xl bg-[#141414] border border-[#1f1f1f] hover:border-[#22c55e]/25 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] cursor-pointer active:scale-[0.99]"
              >
                <div className="relative h-52 md:h-60 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#000]/40 to-transparent opacity-60" />

                  <div className="hidden md:flex absolute inset-0 bg-[#000]/70 opacity-0 group-hover:opacity-100 transition-all duration-300 items-center justify-center">
                    <div className="flex flex-col items-center gap-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="w-12 h-12 bg-[#22c55e] rounded-full flex items-center justify-center text-black shadow-lg shadow-[#22c55e]/30">
                        <Eye size={18} />
                      </div>
                      <span className="text-white text-xs font-semibold tracking-wide">View Details</span>
                    </div>
                  </div>

                  <div className="md:hidden absolute top-3 right-3">
                    <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1">
                      <Eye size={10} className="text-[#22c55e]" />
                      <span className="text-[10px] text-white/70 font-medium">Tap</span>
                    </div>
                  </div>

                  <div className="hidden md:block absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <div className="w-8 h-8 bg-[#22c55e] rounded-full flex items-center justify-center shadow-md shadow-[#22c55e]/40">
                      <ArrowUpRight size={14} className="text-black" />
                    </div>
                  </div>

                  {project.images?.length > 1 && (
                    <div className="absolute bottom-3 left-3 flex gap-1">
                      {project.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-[3px] rounded-full transition-all ${idx === 0 ? 'w-5 bg-[#22c55e]' : 'w-2 bg-white/30'
                            }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4 md:p-6">
                  <span className="text-[#22c55e] text-[10px] font-mono uppercase tracking-[0.16em] mb-1.5 block">
                    {project.category}
                  </span>
                  <h3 className="text-[15px] md:text-lg font-bold text-white mb-1.5">
                    {project.title}
                  </h3>
                  <p className="text-[#4a4a4a] text-xs md:text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </section>

      <ProjectPanel project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}

export default Portfolio
