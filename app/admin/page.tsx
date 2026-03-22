"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { StoreProvider, useStore, MenuItem, Branch, MenuCategory } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Lock, Plus, Edit2, Trash2, MapPin, QrCode, ArrowLeft, Menu, X } from 'lucide-react'
import QRCode from 'qrcode'

const ADMIN_PASSWORD = 'GrillTaRaKa&Go3'

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('grill-go-admin-auth', 'true')
      onLogin()
    } else {
      setError('Incorrect password')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-serif text-foreground">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-secondary border-border text-foreground"
              />
              {error && <p className="text-destructive text-sm mt-2">{error}</p>}
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Login
            </Button>
            <Link href="/" className="block text-center text-foreground/60 hover:text-primary transition-colors">
              Back to Website
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

function MenuItemForm({ 
  item, 
  onSave, 
  onCancel 
}: { 
  item?: MenuItem
  onSave: (data: Omit<MenuItem, 'id'>) => void
  onCancel: () => void 
}) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    price: item?.price?.toString() || '',
    description: item?.description || '',
    category: item?.category || 'burger' as MenuCategory,
    image: item?.image || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      name: formData.name,
      price: parseFloat(formData.price) || 0,
      description: formData.description,
      category: formData.category,
      image: formData.image,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Name</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="bg-secondary border-border text-foreground"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Price ($)</label>
        <Input
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="bg-secondary border-border text-foreground"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="bg-secondary border-border text-foreground"
          rows={3}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Category</label>
        <Select
          value={formData.category}
          onValueChange={(value: MenuCategory) => setFormData({ ...formData, category: value })}
        >
          <SelectTrigger className="bg-secondary border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="burger">Burgers</SelectItem>
            <SelectItem value="sandwich">Sandwiches</SelectItem>
            <SelectItem value="wraps">Wraps</SelectItem>
            <SelectItem value="platters">Platters</SelectItem>
            <SelectItem value="appetizer">Appetizers</SelectItem>
            <SelectItem value="offer">Offers</SelectItem>
            <SelectItem value="drinks">Drinks</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Image URL</label>
        <Input
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="bg-secondary border-border text-foreground"
          placeholder="/images/appetizer.jpg"
        />
      </div>
      <DialogFooter className="gap-2">
        <Button type="button" variant="outline" onClick={onCancel} className="border-border">
          Cancel
        </Button>
        <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
          Save
        </Button>
      </DialogFooter>
    </form>
  )
}

function BranchForm({ 
  branch, 
  onSave, 
  onCancel 
}: { 
  branch?: Branch
  onSave: (data: Omit<Branch, 'id'>) => void
  onCancel: () => void 
}) {
  const [formData, setFormData] = useState({
    name: branch?.name || '',
    phone: branch?.phone || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      name: formData.name,
      phone: formData.phone.replace(/[^0-9]/g, ''),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Branch Name</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="bg-secondary border-border text-foreground"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">WhatsApp Number</label>
        <Input
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="bg-secondary border-border text-foreground"
          placeholder="0096179147183"
          required
        />
        <p className="text-xs text-foreground/60 mt-1">Include country code without + symbol</p>
      </div>
      <DialogFooter className="gap-2">
        <Button type="button" variant="outline" onClick={onCancel} className="border-border">
          Cancel
        </Button>
        <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
          Save
        </Button>
      </DialogFooter>
    </form>
  )
}

function QRCodeGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.origin)
    }
  }, [])

  useEffect(() => {
    if (canvasRef.current && url) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 200,
        margin: 2,
        color: {
          dark: '#dc2626',
          light: '#0a0a0a',
        },
      })
    }
  }, [url])

  const downloadQR = () => {
    if (canvasRef.current) {
      const link = document.createElement('a')
      link.download = 'grill-go-qr.png'
      link.href = canvasRef.current.toDataURL()
      link.click()
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <QrCode className="h-5 w-5 text-primary" />
          QR Code Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="inline-block bg-secondary p-4 rounded-lg mb-4">
          <canvas ref={canvasRef} />
        </div>
        <p className="text-foreground/60 text-sm mb-4 break-all">{url}</p>
        <Button onClick={downloadQR} className="bg-primary text-primary-foreground hover:bg-primary/90">
          Download QR Code
        </Button>
      </CardContent>
    </Card>
  )
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { 
    menuItems, 
    branches,
    addMenuItem, 
    updateMenuItem, 
    deleteMenuItem,
    addBranch,
    updateBranch,
    deleteBranch,
  } = useStore()
  
  const [activeTab, setActiveTab] = useState<'menu' | 'branches' | 'qr'>('menu')
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null)
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [isAddingBranch, setIsAddingBranch] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Auto-logout when navigating away or closing the tab
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('grill-go-admin-auth')
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // User switched tabs or minimized - we keep them logged in
        // But if they navigate away completely, beforeunload handles it
      }
    }

    const handlePopState = () => {
      // User pressed back button
      localStorage.removeItem('grill-go-admin-auth')
      onLogout()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('popstate', handlePopState)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [onLogout])

  const handleSaveMenuItem = (data: Omit<MenuItem, 'id'>) => {
    if (editingItem) {
      updateMenuItem(editingItem.id, data)
      setEditingItem(null)
    } else {
      addMenuItem(data)
      setIsAddingItem(false)
    }
  }

  const handleSaveBranch = (data: Omit<Branch, 'id'>) => {
    if (editingBranch) {
      updateBranch(editingBranch.id, data)
      setEditingBranch(null)
    } else {
      addBranch(data)
      setIsAddingBranch(false)
    }
  }

  const tabs = [
    { id: 'menu', label: 'Menu Items', icon: Menu },
    { id: 'branches', label: 'Branches', icon: MapPin },
    { id: 'qr', label: 'QR Code', icon: QrCode },
  ] as const

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-foreground/60 hover:text-primary transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-xl font-bold text-primary font-serif">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <Button 
                variant="outline" 
                onClick={onLogout}
                className="border-border hidden md:flex"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mb-6 bg-card border border-border rounded-lg p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setMobileMenuOpen(false)
                }}
                className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground/70 hover:text-foreground'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
            <Button 
              variant="outline" 
              onClick={onLogout}
              className="w-full border-border mt-4"
            >
              Logout
            </Button>
          </div>
        )}

        {/* Desktop Tabs */}
        <div className="hidden md:flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground/70 hover:text-foreground'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Menu Items Tab */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold text-foreground font-serif">Menu Items</h2>
              <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">Add Menu Item</DialogTitle>
                    <DialogDescription className="text-foreground/60">Add a new item to your menu.</DialogDescription>
                  </DialogHeader>
                  <MenuItemForm 
                    onSave={handleSaveMenuItem} 
                    onCancel={() => setIsAddingItem(false)} 
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {[
                  { id: 'burger', label: 'Burgers' },
                  { id: 'sandwich', label: 'Sandwiches' },
                  { id: 'wraps', label: 'Wraps' },
                  { id: 'platters', label: 'Platters' },
                  { id: 'appetizer', label: 'Appetizers' },
                  { id: 'offer', label: 'Offers' },
                  { id: 'drinks', label: 'Drinks' },
                ].map((category) => {
                const categoryItems = menuItems.filter(item => item.category === category.id)
                if (categoryItems.length === 0) return null
                
                return (
                  <div key={category.id}>
                    <h3 className="text-lg font-semibold text-primary mb-3">
                      {category.label}
                    </h3>
                    <div className="space-y-2">
                      {categoryItems.map((item) => (
                        <div
                          key={item.id}
                          className="bg-card border border-border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground truncate">{item.name}</h4>
                            <p className="text-foreground/60 text-sm truncate">{item.description}</p>
                            <p className="text-primary font-medium">${item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <Dialog open={editingItem?.id === item.id} onOpenChange={(open) => !open && setEditingItem(null)}>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="border-border"
                                  onClick={() => setEditingItem(item)}
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-card border-border max-w-md">
                                <DialogHeader>
                                  <DialogTitle className="text-foreground">Edit Menu Item</DialogTitle>
                                  <DialogDescription className="text-foreground/60">Update item details.</DialogDescription>
                                </DialogHeader>
                                <MenuItemForm 
                                  item={editingItem || undefined}
                                  onSave={handleSaveMenuItem} 
                                  onCancel={() => setEditingItem(null)} 
                                />
                              </DialogContent>
                            </Dialog>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="border-destructive text-destructive hover:bg-destructive/10"
                              onClick={() => deleteMenuItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Branches Tab */}
        {activeTab === 'branches' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold text-foreground font-serif">Branches</h2>
              <Dialog open={isAddingBranch} onOpenChange={setIsAddingBranch}>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Branch
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">Add Branch</DialogTitle>
                    <DialogDescription className="text-foreground/60">Add a new branch location.</DialogDescription>
                  </DialogHeader>
                  <BranchForm 
                    onSave={handleSaveBranch} 
                    onCancel={() => setIsAddingBranch(false)} 
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {branches.map((branch) => (
                <Card key={branch.id} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex gap-2">
                        <Dialog open={editingBranch?.id === branch.id} onOpenChange={(open) => !open && setEditingBranch(null)}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="border-border"
                              onClick={() => setEditingBranch(branch)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-card border-border max-w-md">
                            <DialogHeader>
                              <DialogTitle className="text-foreground">Edit Branch</DialogTitle>
                              <DialogDescription className="text-foreground/60">Update branch details.</DialogDescription>
                            </DialogHeader>
                            <BranchForm 
                              branch={editingBranch || undefined}
                              onSave={handleSaveBranch} 
                              onCancel={() => setEditingBranch(null)} 
                            />
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="border-destructive text-destructive hover:bg-destructive/10"
                          onClick={() => deleteBranch(branch.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{branch.name}</h3>
                    <p className="text-foreground/60">+{branch.phone}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* QR Code Tab */}
        {activeTab === 'qr' && (
          <div className="max-w-md mx-auto">
            <QRCodeGenerator />
          </div>
        )}
      </div>
    </div>
  )
}

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const auth = localStorage.getItem('grill-go-admin-auth')
    setIsAuthenticated(auth === 'true')
    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('grill-go-admin-auth')
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={() => setIsAuthenticated(true)} />
  }

  return <AdminDashboard onLogout={handleLogout} />
}

export default function Page() {
  return (
    <StoreProvider>
      <AdminPage />
    </StoreProvider>
  )
}
