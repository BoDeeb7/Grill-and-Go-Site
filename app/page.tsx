"use client"

import { useState, useEffect, useCallback } from 'react'
import { StoreProvider } from '@/lib/store'
import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { MenuSection } from '@/components/menu-section'
import { AboutSection } from '@/components/about-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { Cart } from '@/components/cart'
import { SplashScreen } from '@/components/splash-screen'

function useAOS() {
  const initAOS = useCallback(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    const elements = document.querySelectorAll('[data-aos]')
    elements.forEach((el) => {
      const duration = el.getAttribute('data-aos-duration') || '600'
      const delay = el.getAttribute('data-aos-delay') || '0'
      ;(el as HTMLElement).style.transitionDuration = `${duration}ms`
      ;(el as HTMLElement).style.transitionDelay = `${delay}ms`
      observer.observe(el)
    })

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return initAOS
}

function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const initAOS = useAOS()

  // Check if splash was already shown in this session
  useEffect(() => {
    const splashShown = sessionStorage.getItem('grill-go-splash-shown')
    if (splashShown) {
      setShowSplash(false)
      setShowContent(true)
    }
  }, [])

  // Initialize AOS when content becomes visible
  useEffect(() => {
    if (showContent) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        initAOS()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [showContent, initAOS])

  const handleSplashComplete = () => {
    sessionStorage.setItem('grill-go-splash-shown', 'true')
    setShowSplash(false)
    setShowContent(true)
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      {showContent && (
        <div className="content-enter">
          <Header onCartClick={() => setIsCartOpen(true)} />
          <main>
            <Hero />
            <MenuSection />
            <AboutSection />
            <ContactSection />
          </main>
          <Footer />
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      )}
    </>
  )
}

export default function Page() {
  return (
    <StoreProvider>
      <HomePage />
    </StoreProvider>
  )
}
