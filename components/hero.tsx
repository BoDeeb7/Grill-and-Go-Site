"use client"

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronDown, Flame, Utensils, Clock } from 'lucide-react'
import { GrillGoLogo } from '@/components/logo'

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Grill & Go restaurant interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/85" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-primary/10 animate-pulse">
          <Flame className="h-24 w-24" />
        </div>
        <div className="absolute top-40 right-20 text-primary/10 animate-pulse" style={{ animationDelay: '1s' }}>
          <Utensils className="h-20 w-20" />
        </div>
        <div className="absolute bottom-40 left-20 text-primary/10 animate-pulse" style={{ animationDelay: '0.5s' }}>
          <Flame className="h-16 w-16" />
        </div>
        <div className="absolute bottom-20 right-10 text-primary/10 animate-pulse" style={{ animationDelay: '1.5s' }}>
          <Clock className="h-20 w-20" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div data-aos="fade-down" data-aos-duration="1000" className="mt-10">
          <span className="inline-block text-primary uppercase tracking-[0.3em] text-sm md:text-base mb-4 font-semibold">
            Premium Grilled Cuisine
          </span>
        </div>
        
        <div 
          className="mb-6 flex justify-center"
          data-aos="zoom-in" 
          data-aos-duration="1000" 
          data-aos-delay="200"
        >
          <GrillGoLogo size="lg" />
        </div>
        
        <p 
          className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-8 text-pretty"
          data-aos="fade-up" 
          data-aos-duration="800" 
          data-aos-delay="200"
        >
          Experience the art of grilling. Our master chefs create unforgettable dishes 
          using only the finest ingredients, grilled to perfection.
        </p>
        
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          data-aos="fade-up" 
          data-aos-duration="800" 
          data-aos-delay="300"
        >
          <Button
            asChild
            size="lg"
            className="text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <a href="#menu">View Menu</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary/10"
          >
            <a href="#contact">Contact Us</a>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a 
        href="#menu"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary animate-bounce"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <ChevronDown className="h-8 w-8" />
        <span className="sr-only">Scroll to menu</span>
      </a>
    </section>
  )
}
