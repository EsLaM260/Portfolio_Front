import React from 'react'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-[#22c55e] font-mono tracking-widest uppercase text-sm mb-4">404 — Not Found</p>
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">Oops.</h1>
        <p className="text-[#484848] text-base md:text-lg mb-8">
          This page doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#22c55e] text-black text-sm font-bold px-8 py-4 rounded-full transition-all hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(34,197,94,0.35)]"
        >
          <Home size={16} />
          Back to Portfolio
        </Link>
      </div>
    </div>
  )
}
