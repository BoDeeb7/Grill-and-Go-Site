"use client"

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const themes = [
  { 
    value: 'light', 
    label: 'Classic Light', 
    icon: Sun,
    description: 'Clean and bright'
  },
  { 
    value: 'dark', 
    label: 'Dark Elegant', 
    icon: Moon,
    description: 'Sophisticated dark'
  },
  { 
    value: 'gold', 
    label: 'Premium Gold', 
    icon: Sparkles,
    description: 'Luxury experience'
  },
]

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="opacity-50">
        <Sun className="h-5 w-5" />
        <span className="sr-only">Theme</span>
      </Button>
    )
  }

  const currentTheme = themes.find(t => t.value === theme) || themes[1]
  const CurrentIcon = currentTheme.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <CurrentIcon className="h-5 w-5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {themes.map((t) => {
          const Icon = t.icon
          return (
            <DropdownMenuItem
              key={t.value}
              onClick={() => setTheme(t.value)}
              className={cn(
                "flex items-center gap-3 cursor-pointer",
                theme === t.value && "bg-accent"
              )}
            >
              <Icon className="h-4 w-4" />
              <div className="flex flex-col">
                <span className="font-medium">{t.label}</span>
                <span className="text-xs text-muted-foreground">{t.description}</span>
              </div>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
