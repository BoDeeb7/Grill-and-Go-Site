"use client"

import Image from 'next/image'
import { Flame, Clock, Award } from 'lucide-react'

const features = [
  {
    icon: Flame,
    title: 'Open Fire Grilling',
    description: 'Our signature technique for maximum flavor and perfect char',
  },
  {
    icon: Clock,
    title: 'Fast Service',
    description: 'Quick preparation without compromising on quality',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Only the finest cuts and freshest ingredients',
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div 
            className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden"
            data-aos="fade-right"
          >
            <Image
              src="/images/main-dish.jpg"
              alt="Our signature grilled dishes"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4 border border-border">
                <p className="text-primary font-serif text-xl">
                  {"\"Where Every Bite Tells a Story\""}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div data-aos="fade-left">
            <span className="text-primary uppercase tracking-[0.3em] text-sm">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6 font-serif">
              About Grill & Go
            </h2>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              Founded with a passion for authentic grilled cuisine, Grill & Go has been 
              serving the finest grilled dishes since day one. Our commitment to quality 
              and flavor has made us a beloved destination for food lovers.
            </p>
            <p className="text-foreground/70 mb-8 leading-relaxed">
              We believe in the art of grilling - where fire meets premium ingredients 
              to create unforgettable culinary experiences. Every dish is prepared with 
              care, ensuring you get the perfect meal every time.
            </p>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="flex items-start gap-4"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-foreground/60 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
