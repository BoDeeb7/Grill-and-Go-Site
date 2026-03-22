"use client"

import { useState } from 'react'
import Image from 'next/image'
import { useStore, MenuItem, MenuCategory } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Plus, Check } from 'lucide-react'

const categories: { id: MenuCategory; label: string }[] = [
  { id: 'burger', label: 'Burgers' },
  { id: 'sandwich', label: 'Sandwiches' },
  { id: 'wraps', label: 'Wraps' },
  { id: 'platters', label: 'Platters' },
  { id: 'appetizer', label: 'Appetizers' },
  { id: 'offer', label: 'Offers' },
  { id: 'drinks', label: 'Drinks' },
]

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('burger')
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())
  const { menuItems, addToCart } = useStore()

  const filteredItems = menuItems.filter(item => item.category === activeCategory)

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item)
    setAddedItems(prev => new Set([...prev, item.id]))
    setTimeout(() => {
      setAddedItems(prev => {
        const next = new Set(prev)
        next.delete(item.id)
        return next
      })
    }, 1500)
  }

  return (
    <section id="menu" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-primary uppercase tracking-[0.3em] text-sm">
            Our Selection
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-2 font-serif">
            The Menu
          </h2>
          <p className="text-foreground/60 mt-4 max-w-xl mx-auto">
            Discover our carefully crafted dishes, made with passion and the finest ingredients
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2.5 md:px-6 md:py-3 rounded-full font-medium transition-all duration-300 text-sm md:text-base ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-secondary text-foreground/70 hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-xl overflow-hidden group hover:border-primary/50 transition-all hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-secondary">
                {item.image && typeof item.image === 'string' && item.image.trim().length > 0 && item.image.startsWith('/') ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
                    <div className="text-primary text-7xl font-black opacity-30">
                      {item.category === 'burger' ? 'B' : 
                       item.category === 'sandwich' ? 'S' : 
                       item.category === 'wraps' ? 'W' : 
                       item.category === 'platters' ? 'P' : 
                       item.category === 'appetizer' ? 'A' : 
                       item.category === 'offer' ? 'O' : 'D'}
                    </div>
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  ${item.price.toFixed(2)}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {item.name}
                </h3>
                <p className="text-foreground/60 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                  {item.description}
                </p>
                <Button
                  onClick={() => handleAddToCart(item)}
                  size="sm"
                  className={`w-full transition-all duration-300 ${
                    addedItems.has(item.id)
                      ? "bg-green-600 hover:bg-green-600 text-white"
                      : ""
                  }`}
                >
                  {addedItems.has(item.id) ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Added
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-foreground/60">
            No items available in this category.
          </div>
        )}
      </div>
    </section>
  )
}
