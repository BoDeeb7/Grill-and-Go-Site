"use client"

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock } from 'lucide-react'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const ADMIN_PASSWORD = 'Grill20Go26#3'
const CLICK_THRESHOLD = 7
const CLICK_TIMEOUT = 2000

export function GrillGoLogo({ className = '', size = 'md' }: LogoProps) {
  const [clickCount, setClickCount] = useState(0)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  const sizeConfig = {
    sm: {
      grill: 'text-2xl',
      and: 'text-xs',
      go: 'text-base',
      gap: 'gap-0.5',
      fork: 'text-xl',
    },
    md: {
      grill: 'text-3xl md:text-4xl',
      and: 'text-sm',
      go: 'text-lg md:text-xl',
      gap: 'gap-1',
      fork: 'text-2xl md:text-3xl',
    },
    lg: {
      grill: 'text-5xl md:text-7xl',
      and: 'text-lg md:text-xl',
      go: 'text-2xl md:text-3xl',
      gap: 'gap-1',
      fork: 'text-4xl md:text-5xl',
    },
  }

  const config = sizeConfig[size]

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    const newCount = clickCount + 1
    setClickCount(newCount)

    if (newCount >= CLICK_THRESHOLD) {
      setClickCount(0)
      setShowPasswordModal(true)
      setPassword('')
      setError('')
      return
    }

    timeoutRef.current = setTimeout(() => {
      setClickCount(0)
    }, CLICK_TIMEOUT)
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password === ADMIN_PASSWORD) {
      setShowPasswordModal(false)
      setPassword('')
      setError('')
      router.push('/admin')
    } else {
      setError('Incorrect password')
      setPassword('')
    }
  }

  const handleCloseModal = () => {
    setShowPasswordModal(false)
    setPassword('')
    setError('')
  }

  // Fork/Spatula SVG for the "I" in GRILL
  const ForkIcon = ({ className: iconClass }: { className?: string }) => (
    <svg 
      viewBox="0 0 24 60" 
      fill="currentColor" 
      className={iconClass}
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

  return (
    <>
      <button 
        onClick={handleLogoClick}
        className={`inline-flex items-center ${config.gap} ${className} cursor-pointer bg-transparent border-none select-none`}
      >
        <div className="flex flex-col items-start leading-none">
          {/* GRILL with fork as I */}
          <div className={`font-black tracking-tight ${config.grill} flex items-center`} style={{ color: '#DC2626' }}>
            <span>GR</span>
            <ForkIcon className={config.fork} />
            <span>LL</span>
          </div>
          {/* & GO */}
          <div className="flex items-center gap-1 text-white">
            <span className={`font-light ${config.and}`}>&</span>
            <span className={`font-bold ${config.go}`}>GO</span>
          </div>
        </div>
      </button>

      <Dialog open={showPasswordModal} onOpenChange={handleCloseModal}>
        <DialogContent className="bg-card border-border sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Admin Access
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Enter the admin password to continue.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4 mt-4">
            <div>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                className="bg-secondary border-border text-foreground"
                autoFocus
              />
              {error && (
                <p className="text-destructive text-sm mt-2">{error}</p>
              )}
            </div>
            
            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseModal}
                className="border-border"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Login
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
