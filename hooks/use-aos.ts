"use client"

import { useEffect } from 'react'

export function useAOS() {
  useEffect(() => {
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
      // Set transition duration
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
}
