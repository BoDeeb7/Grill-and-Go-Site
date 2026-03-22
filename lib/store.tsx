"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type MenuCategory = 'burger' | 'sandwich' | 'wraps' | 'platters' | 'appetizer' | 'offer' | 'drinks'

export interface MenuItem {
  id: string
  name: string
  price: number
  description: string
  category: MenuCategory
  image: string
}

export interface CartItem extends MenuItem {
  quantity: number
}

export interface Branch {
  id: string
  name: string
  phone: string
}

const defaultMenuItems: MenuItem[] = [
  // BURGERS
  { id: 'b1', name: 'Lebanese Burger', price: 4.30, description: '100g beef, cheddar, tomato, coleslaw, cocktail sauce', category: 'burger', image: '/images/burger.jpg' },
  { id: 'b2', name: 'The Crunch Boss', price: 7.50, description: '120g beef, special sauce, cocktail sauce, pickles, turkey bacon, cabbage, crunchy cheddar patty, chips sticks', category: 'burger', image: '/images/burger.jpg' },
  { id: 'b3', name: 'Grill & Go Burger', price: 7.50, description: '200g beef, special sauce, pickles, iceberg, lettuce, mozzarella patty', category: 'burger', image: '/images/burger.jpg' },
  { id: 'b4', name: 'Zinger Burger', price: 5.90, description: 'Hot crispy chicken, mayo, cocktail sauce, cheddar cheese, pickles, iceberg lettuce, tomato', category: 'burger', image: '/images/burger.jpg' },
  { id: 'b5', name: 'Double Trouble', price: 6.90, description: '200g beef, double cheddar slice, tomato, onions, coleslaw, pickles, cocktail sauce', category: 'burger', image: '/images/burger.jpg' },
  { id: 'b6', name: 'Grill & Go Honey', price: 6.90, description: '150g grilled chicken dipped in honey mustard sauce, iceberg lettuce, pickles, mozzarella patty, chips, special sauce', category: 'burger', image: '/images/burger.jpg' },
  { id: 'b7', name: 'Zinger Supreme', price: 7.20, description: 'Hot crispy chicken, mayo, cocktail sauce, cheddar cheese, pickles, iceberg lettuce, tomato, mozzarella patty', category: 'burger', image: '/images/burger.jpg' },
  { id: 'b8', name: 'The Burger Beast', price: 8.90, description: 'Double 200g beef, double cheddar slice, pickles, coleslaw with corn, mozzarella patty, caramelized onions, smoked turkey, tomato, chips, special sauce', category: 'burger', image: '/images/burger.jpg' },
  { id: 'b9', name: 'Swiss Mushroom Beef', price: 6.90, description: '120g beef, swiss cheese slice, special mushroom sauce, Rocca, pickles', category: 'burger', image: '/images/burger.jpg' },
  { id: 'b10', name: 'Swiss Mushroom Chicken', price: 6.80, description: '150g grilled chicken, swiss cheese slice, special mushroom sauce, Rocca, pickles', category: 'burger', image: '/images/burger.jpg' },
  { id: 'b11', name: 'Shrimpy Burger', price: 7.50, description: 'Golden crispy shrimp, iceberg, mozzarella patty, palmito slices, top with tartar sauce and cocktail sauce', category: 'burger', image: '/images/burger.jpg' },
  
  // SANDWICHES
  { id: 's1', name: 'Tawook', price: 4.50, description: 'Grilled chicken, garlic sauce, coleslaw, potato, pickles', category: 'sandwich', image: '/images/sandwich.jpg' },
  { id: 's2', name: 'Fajita', price: 5.50, description: 'Chicken, sweet pepper, onion, mozzarella, corn, mayo', category: 'sandwich', image: '/images/sandwich.jpg' },
  { id: 's3', name: 'Sejook', price: 4.50, description: 'Sejook, special sauce, pickles, tomato', category: 'sandwich', image: '/images/sandwich.jpg' },
  { id: 's4', name: 'Crispy', price: 5.50, description: 'Crispy chicken, cheddar cheese, coleslaw, cocktail sauce, potato', category: 'sandwich', image: '/images/sandwich.jpg' },
  { id: 's5', name: 'Steak', price: 6.50, description: 'Smoked beef, steak sauce, bell peppers, onion slices', category: 'sandwich', image: '/images/sandwich.jpg' },
  { id: 's6', name: 'Potato', price: 2.00, description: 'French fries, coleslaw, pickles, cocktail sauce, garlic sauce', category: 'sandwich', image: '/images/sandwich.jpg' },
  
  // WRAPS
  { id: 'w1', name: 'Boneless Grill & Go', price: 6.00, description: 'Crispy chicken dipped in BBQ sauce, iceberg, special sauce, chips, cheddar sauce', category: 'wraps', image: '/images/wrap.jpg' },
  { id: 'w2', name: 'Special Wrap', price: 7.90, description: '200g beef, mozzarella, cheddar slice, cocktail sauce, chips, iceberg lettuce, tomato, cheddar sauce', category: 'wraps', image: '/images/wrap.jpg' },
  { id: 'w3', name: 'Honey Mustard', price: 6.00, description: 'Crispy chicken dipped in honey mustard sauce, iceberg, special sauce, chips, cheddar sauce, bbq sauce', category: 'wraps', image: '/images/wrap.jpg' },
  { id: 'w4', name: 'Buffalo Chicken', price: 6.00, description: 'Crispy chicken dipped in buffalo sauce, iceberg, pickles, special sauce, chips, cheddar sauce', category: 'wraps', image: '/images/wrap.jpg' },
  
  // PLATTERS
  { id: 'p1', name: 'Crispy Attack', price: 8.90, description: '6 pcs crispy chicken, 3 sauces, coleslaw, fries', category: 'platters', image: '/images/platter.jpg' },
  { id: 'p2', name: 'Tawook Plate', price: 6.50, description: 'Grilled chicken plate with sides', category: 'platters', image: '/images/platter.jpg' },
  { id: 'p3', name: 'Combo Meal Add', price: 3.00, description: 'With Fries & Soft Drink', category: 'platters', image: '/images/platter.jpg' },
  { id: 'p4', name: 'Extra Sauce', price: 0.80, description: 'Additional sauce of your choice', category: 'platters', image: '/images/platter.jpg' },
  
  // APPETIZERS
  { id: 'a1', name: 'Curly Fries', price: 4.50, description: 'Served with sauce', category: 'appetizer', image: '/images/fries.jpg' },
  { id: 'a2', name: 'Chicken Tenders', price: 4.00, description: 'Crispy golden chicken tenders (5 pcs), served with sauce', category: 'appetizer', image: '/images/fries.jpg' },
  { id: 'a3', name: 'French Fries', price: 2.50, description: 'Served with sauce', category: 'appetizer', image: '/images/fries.jpg' },
  { id: 'a4', name: 'Mozzarella Sticks', price: 4.50, description: 'Crispy golden mozzarella cheese sticks (5 pcs), served with sauce', category: 'appetizer', image: '/images/fries.jpg' },
  { id: 'a5', name: 'Cheese Balls', price: 4.00, description: 'Crispy golden cheese balls (5 pcs), served with sauce', category: 'appetizer', image: '/images/fries.jpg' },
  { id: 'a6', name: 'Deditos', price: 4.00, description: 'Fried dough stuffed with halloumi cheese (5 pcs)', category: 'appetizer', image: '/images/fries.jpg' },
  { id: 'a7', name: 'Jalapeno Bites', price: 4.50, description: 'Crispy cheese bites stuffed with a spicy kick', category: 'appetizer', image: '/images/fries.jpg' },
  { id: 'a8', name: 'Angry Fries Chicken', price: 7.90, description: 'French fries, crispy chicken, mozzarella, cheddar cheese sauce, cocktail sauce, barbecue sauce, jalapeno, buffalo', category: 'appetizer', image: '/images/fries.jpg' },
  { id: 'a9', name: 'Angry Fries Beef', price: 7.90, description: 'French fries, 200g beef, mozzarella, cheddar cheese sauce, cocktail sauce, barbecue sauce, jalapeno, buffalo', category: 'appetizer', image: '/images/fries.jpg' },
  { id: 'a10', name: 'Large Fries', price: 4.50, description: 'French fries served with 2 sauces', category: 'appetizer', image: '/images/fries.jpg' },
  
  // OFFERS
  { id: 'o1', name: 'Fire Box', price: 21.00, description: '5pcs crispy chicken, 5 pcs chicken tenders, 5 pcs mozzarella sticks, 5 pcs cheese balls, special fries, french fries, 4 sauces', category: 'offer', image: '/images/combo.jpg' },
  { id: 'o2', name: 'Lebanese Quad Combo', price: 18.00, description: '4 Lebanese burgers (2 beef + 2 chicken), french fries, 2 soft drinks, 2 sauces of your choice - perfect for sharing', category: 'offer', image: '/images/combo.jpg' },
  { id: 'o3', name: 'Burger Duo', price: 8.00, description: '2 Lebanese burgers + soft drink', category: 'offer', image: '/images/combo.jpg' },
  
  // DRINKS
  { id: 'd1', name: 'Soft Drinks', price: 1.30, description: 'Coca-Cola, Sprite, Fanta, or Pepsi', category: 'drinks', image: '/images/drink.jpg' },
  { id: 'd2', name: 'Perrier', price: 1.60, description: 'Sparkling mineral water', category: 'drinks', image: '/images/drink.jpg' },
  { id: 'd3', name: 'Water', price: 0.40, description: 'Still mineral water', category: 'drinks', image: '/images/drink.jpg' },
]

const defaultBranches: Branch[] = [
  { id: '1', name: 'Tamnin', phone: '96179147183' },
  { id: '2', name: 'Karak', phone: '96171717057' },
  { id: '3', name: 'Rayak', phone: '96176453219' },
]

const STORAGE_KEYS = {
  MENU: 'grill-go-menu-v16',
  BRANCHES: 'grill-go-branches-v16',
  CART: 'grill-go-cart-v12',
}

// Helper to validate and fix menu item images
const validateMenuItem = (item: MenuItem): MenuItem => {
  const validImage = item.image && typeof item.image === 'string' && item.image.trim().length > 0 && item.image.startsWith('/') 
    ? item.image 
    : getDefaultImageForCategory(item.category)
  return { ...item, image: validImage }
}

const getDefaultImageForCategory = (category: MenuCategory): string => {
  const categoryImages: Record<MenuCategory, string> = {
    burger: '/images/burger.jpg',
    sandwich: '/images/sandwich.jpg',
    wraps: '/images/wrap.jpg',
    platters: '/images/platter.jpg',
    appetizer: '/images/fries.jpg',
    offer: '/images/combo.jpg',
    drinks: '/images/drink.jpg',
  }
  return categoryImages[category] || '/images/burger.jpg'
}

interface StoreContextType {
  menuItems: MenuItem[]
  cart: CartItem[]
  branches: Branch[]
  selectedBranch: Branch | null
  addToCart: (item: MenuItem) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  setSelectedBranch: (branch: Branch) => void
  getCartTotal: () => number
  getCartCount: () => number
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void
  deleteMenuItem: (id: string) => void
  addBranch: (branch: Omit<Branch, 'id'>) => void
  updateBranch: (id: string, branch: Partial<Branch>) => void
  deleteBranch: (id: string) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => defaultMenuItems.map(validateMenuItem))
  const [cart, setCart] = useState<CartItem[]>([])
  const [branches, setBranches] = useState<Branch[]>(defaultBranches)
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load all data from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Clear all old storage versions to prevent stale data
      for (let i = 1; i <= 14; i++) {
        localStorage.removeItem(`grill-go-menu-v${i}`)
        localStorage.removeItem(`grill-go-branches-v${i}`)
        localStorage.removeItem(`grill-go-cart-v${i}`)
      }
      localStorage.removeItem('grill-go-menu')
      localStorage.removeItem('grill-go-branches')
      localStorage.removeItem('grill-go-cart')
      
      try {
        const savedMenu = localStorage.getItem(STORAGE_KEYS.MENU)
        const savedBranches = localStorage.getItem(STORAGE_KEYS.BRANCHES)
        const savedCart = localStorage.getItem(STORAGE_KEYS.CART)

        if (savedMenu) {
          const parsed = JSON.parse(savedMenu)
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Validate and fix images for all items
            const validatedItems = parsed.map(validateMenuItem)
            setMenuItems(validatedItems)
          }
        }

        if (savedBranches) {
          const parsed = JSON.parse(savedBranches)
          if (Array.isArray(parsed) && parsed.length > 0) {
            setBranches(parsed)
          }
        }

        if (savedCart) {
          const parsed = JSON.parse(savedCart)
          if (Array.isArray(parsed)) {
            setCart(parsed)
          }
        }
      } catch (e) {
        console.error('Error loading from localStorage:', e)
      }
      setIsInitialized(true)
    }
  }, [])

  // Save menu items to localStorage whenever they change
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(menuItems))
    }
  }, [menuItems, isInitialized])

  // Save branches to localStorage whenever they change
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.BRANCHES, JSON.stringify(branches))
    }
  }, [branches, isInitialized])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart))
    }
  }, [cart, isInitialized])

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
    } else {
      setCart(prev => prev.map(i => i.id === itemId ? { ...i, quantity } : i))
    }
  }

  const clearCart = () => setCart([])

  const getCartTotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const getCartCount = () => cart.reduce((sum, item) => sum + item.quantity, 0)

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      image: item.image && item.image.trim().length > 0 ? item.image : getDefaultImageForCategory(item.category),
    }
    setMenuItems(prev => [...prev, newItem])
  }

  const updateMenuItem = (id: string, item: Partial<MenuItem>) => {
    setMenuItems(prev => prev.map(i => {
      if (i.id === id) {
        const updated = { ...i, ...item }
        // Validate image
        if (!updated.image || typeof updated.image !== 'string' || updated.image.trim().length === 0 || !updated.image.startsWith('/')) {
          updated.image = getDefaultImageForCategory(updated.category)
        }
        return updated
      }
      return i
    }))
  }

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(i => i.id !== id))
  }

  const addBranch = (branch: Omit<Branch, 'id'>) => {
    const newBranch: Branch = {
      ...branch,
      id: `branch-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }
    setBranches(prev => [...prev, newBranch])
  }

  const updateBranch = (id: string, branch: Partial<Branch>) => {
    setBranches(prev => prev.map(b => b.id === id ? { ...b, ...branch } : b))
  }

  const deleteBranch = (id: string) => {
    setBranches(prev => prev.filter(b => b.id !== id))
  }

  return (
    <StoreContext.Provider value={{
      menuItems,
      cart,
      branches,
      selectedBranch,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      setSelectedBranch,
      getCartTotal,
      getCartCount,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
      addBranch,
      updateBranch,
      deleteBranch,
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
