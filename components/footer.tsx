"use client"

import { Instagram, Facebook, MessageCircle } from 'lucide-react'
import { GrillGoLogo } from '@/components/logo'

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <GrillGoLogo size="sm" />
            </div>
            <p className="text-foreground/60 text-sm">
              Premium grilled cuisine crafted with passion. 
              Order online and experience the art of grilling.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#menu" className="text-foreground/60 hover:text-primary transition-colors">
                  Menu
                </a>
              </li>
              <li>
                <a href="#about" className="text-foreground/60 hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-foreground/60 hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/grillandgorestaurant/?__d=11" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61560290537356&sk=about" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#contact" 
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-foreground/60 text-sm">
          <div className="text-center">
  <p>© 2026 Grill & Go. All rights reserved.</p>
  <p className="text-sm mt-1 text-gray-500">
    Powered By <span className="font-bold text-blue-600">DeebData</span>
  </p>
</div>
        </div>
      </div>
    </footer>
  )
}
