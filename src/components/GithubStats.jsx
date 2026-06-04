import React from 'react'
import { Github, Star, GitFork, ExternalLink, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useGithubData } from '../hooks/useGithubData'

const GithubStats = () => {
  const { user, repos, loading, error } = useGithubData('EsLaM260')

  if (loading) {
    return (
      <section className="py-12 px-5 sm:px-8 md:px-16 flex justify-center">
        <Loader2 className="w-6 h-6 text-[#22c55e] animate-spin" />
      </section>
    )
  }

  if (error || !user) return null

  return (
    <section className="py-12 md:py-16 px-5 sm:px-8 md:px-16 bg-[#0c0c0c]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Github size={18} className="text-[#22c55e]" />
          <span className="text-[#22c55e] font-mono tracking-widest uppercase text-sm">GitHub Activity</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          {user.public_repos} Public Repositories
        </h2>
        {user.bio && <p className="text-[#484848] text-sm mt-2">{user.bio}</p>}
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.slice(0, 6).map((repo, i) => (
          <motion.a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
            className="bg-[#141414] p-4 rounded-xl border border-[#1f1f1f] hover:border-[#22c55e]/20 hover:shadow-[0_6px_20px_rgba(0,0,0,0.4)] transition-all duration-200 group block"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-white font-semibold text-sm truncate mr-2 group-hover:text-[#22c55e] transition-colors">
                {repo.name}
              </h4>
              <ExternalLink size={12} className="text-[#333] flex-shrink-0 mt-0.5 group-hover:text-[#22c55e] transition-colors" />
            </div>
            {repo.description && (
              <p className="text-[#484848] text-xs leading-relaxed mb-3 line-clamp-2">
                {repo.description}
              </p>
            )}
            <div className="flex items-center gap-4 mt-auto">
              {repo.language && (
                <span className="text-[#22c55e] text-[10px] font-mono">{repo.language}</span>
              )}
              <div className="flex items-center gap-1 text-[#444] text-[10px]">
                <Star size={10} />
                <span>{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center gap-1 text-[#444] text-[10px]">
                <GitFork size={10} />
                <span>{repo.forks_count}</span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}

export default GithubStats
