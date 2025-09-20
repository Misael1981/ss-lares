"use client"

import AuthProviders from './auth'
import { ThemeProvider } from '@/lib/theme-context'
import { CartProvider } from '@/contexts/CartContext'

const AllProviders = ({ children }) => {
  return (
    <AuthProviders>
      <ThemeProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </ThemeProvider>
    </AuthProviders>
  )
}

export default AllProviders