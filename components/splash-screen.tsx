"use client"

import { useState, useEffect } from 'react'

interface SplashScreenProps {
  onComplete: () => void
}

// Fork/Spatula SVG for the "I" in GRILL
const ForkIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 60" 
    fill="currentColor" 
    className={className}
    style={{ height: '1em', width: 'auto' }}
  >
    {/* Handle */}
    <rect x="10" y="30" width="4" height="30" rx="1" />
    {/* Fork head */}
    <rect x="4" y="0" width="3" height="20" rx="1" />
    <rect x="10.5" y="0" width="3" height="20" rx="1" />
    <rect x="17" y="0" width="3" height="20" rx="1" />
    {/* Connector */}
    <rect x="4" y="18" width="16" height="4" rx="1" />
  </svg>
)

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'logo' | 'wave' | 'exit'>('logo')

  useEffect(() => {
    // Phase 1: Show logo for 3.5 seconds
    const logoTimer = setTimeout(() => {
      setPhase('wave')
    }, 3500)

    // Phase 2: Show wave for 2 seconds (total 5.5 seconds)
    const waveTimer = setTimeout(() => {
      setPhase('exit')
    }, 5500)

    // Phase 3: Exit animation takes 1 second
    const exitTimer = setTimeout(() => {
      onComplete()
    }, 6500)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(waveTimer)
      clearTimeout(exitTimer)
    }
  }, [onComplete])

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-all duration-1000 ease-out ${
        phase === 'exit' ? 'splash-slide-up' : ''
      }`}
    >
      {/* Logo Container with Animation */}
      <div 
        className={`relative transition-all duration-700 ease-out ${
          phase === 'logo' ? 'logo-entrance' : 
          phase === 'wave' ? 'logo-float-up' : ''
        }`}
      >
        <div className="flex flex-col items-center leading-none">
          {/* GRILL with fork as I */}
          <div className="font-black tracking-tight text-6xl md:text-8xl flex items-center" style={{ color: '#DC2626' }}>
            <span>GR</span>
            <ForkIcon className="text-5xl md:text-7xl" />
            <span>LL</span>
          </div>
          {/* & GO */}
          <div className="flex items-center gap-2 text-white mt-1">
            <span className="font-light text-xl md:text-2xl">&</span>
            <span className="font-bold text-3xl md:text-4xl">GO</span>
          </div>
        </div>
      </div>

      {/* Waving Hand - appears after logo settles */}
      <div 
        className={`mt-8 flex items-center gap-4 transition-all duration-500 ${
          phase === 'wave' || phase === 'exit' 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <span 
          className={`text-6xl ${phase === 'wave' ? 'wave-animation' : ''}`}
          role="img" 
          aria-label="waving hand"
        >
          👋
        </span>
        <span className="text-white text-3xl font-serif">Hello!</span>
      </div>

      {/* Decorative glow effect */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          phase === 'logo' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at center, rgba(220, 38, 38, 0.15) 0%, transparent 50%)'
        }}
      />
    </div>
  )
}
