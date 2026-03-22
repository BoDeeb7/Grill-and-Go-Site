"use client"

import { useStore } from '@/lib/store'
import { MapPin, Phone, Clock } from 'lucide-react'

export function ContactSection() {
  const { branches } = useStore()

  return (
    <section id="contact" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="text-primary uppercase tracking-[0.3em] text-sm">
            Visit Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-2 font-serif">
            Our Branches
          </h2>
          <p className="text-foreground/60 mt-4 max-w-xl mx-auto">
            Find us at any of our convenient locations
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {branches.map((branch, index) => (
            <div
              key={branch.id}
              className="bg-card border border-border rounded-lg p-6 md:p-8 text-center"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 font-serif">
                {branch.name}
              </h3>
              <div className="space-y-3 text-foreground/70">
                <div className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <a 
                    href={`tel:${branch.phone}`}
                    className="hover:text-primary transition-colors"
                  >
                    +{branch.phone}
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>1:00 PM - 1:00 AM</span>
                </div>
              </div>
              <a
                href={`https://wa.me/${branch.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          ))}
        </div>

        {/* Hours */}
        <div 
          className="mt-16 text-center bg-card border border-border rounded-lg p-8 max-w-2xl mx-auto"
          data-aos="fade-up"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4 font-serif">
            Opening Hours
          </h3>
          <div className="text-foreground/70">
            <p className="font-semibold text-foreground">All Days</p>
            <p className="text-xl text-primary font-bold mt-2">1:00 PM - 1:00 AM</p>
          </div>
        </div>
      </div>
    </section>
  )
}
