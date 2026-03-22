"use client"

import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Minus, Plus, Trash2, MessageCircle } from 'lucide-react'

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

export function Cart({ isOpen, onClose }: CartProps) {
  const {
    cart,
    branches,
    selectedBranch,
    setSelectedBranch,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
  } = useStore()

  const handleBranchSelect = (branchId: string) => {
    const branch = branches.find(b => b.id === branchId)
    if (branch) {
      setSelectedBranch(branch)
    }
  }

  const handleCheckout = () => {
    if (!selectedBranch) {
      alert('Please select a branch first')
      return
    }

    if (cart.length === 0) {
      alert('Your cart is empty')
      return
    }

    // Build the WhatsApp message
    const orderDetails = cart.map(item => 
      `- ${item.name} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n')

    const message = encodeURIComponent(
      `*New Order from Grill & Go*\n\n` +
      `*Branch:* ${selectedBranch.name}\n\n` +
      `*Order Details:*\n${orderDetails}\n\n` +
      `*Total:* $${getCartTotal().toFixed(2)}\n\n` +
      `Thank you!`
    )

    // Open WhatsApp with the selected branch's number
    const whatsappUrl = `https://wa.me/${selectedBranch.phone}?text=${message}`
    window.open(whatsappUrl, '_blank')
    
    // Clear cart after ordering
    clearCart()
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-background border-border w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-foreground text-xl font-serif">
            Your Cart
          </SheetTitle>
          <SheetDescription className="text-foreground/60">
            Review your items and select a branch to order via WhatsApp.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-foreground/60">
              <p className="text-lg">Your cart is empty</p>
              <p className="text-sm mt-2">Add some delicious items from our menu</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-secondary/50 rounded-lg p-4"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{item.name}</h4>
                    <p className="text-primary font-medium">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-border"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium text-foreground">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-border"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkout Section */}
        {cart.length > 0 && (
          <div className="border-t border-border pt-4 space-y-4">
            {/* Branch Selector */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Select Branch
              </label>
              <Select
                value={selectedBranch?.id || ''}
                onValueChange={handleBranchSelect}
              >
                <SelectTrigger className="w-full bg-secondary border-border">
                  <SelectValue placeholder="Choose your pickup branch" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between text-lg">
              <span className="font-medium text-foreground">Total:</span>
              <span className="font-bold text-primary text-xl">
                ${getCartTotal().toFixed(2)}
              </span>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={handleCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
              disabled={!selectedBranch}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Order via WhatsApp
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
