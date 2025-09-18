'use client'

import { createContext, useContext, useReducer, useEffect, useState } from 'react'

// 🎯 Ações do carrinho
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
  SET_SHIPPING: 'SET_SHIPPING'
}

// 🏗️ Estado inicial
const initialState = {
  items: [],
  shipping: {
    method: 'standard',
    price: 0,
    estimatedDays: 0
  },
  totals: {
    subtotal: 0,
    shipping: 0,
    total: 0
  }
}

// 🔄 Reducer para gerenciar estado
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      let newItems
      if (existingItem) {
        // ➕ Incrementa quantidade se já existe
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // 🆕 Adiciona novo item
        newItems = [...state.items, { ...action.payload, quantity: 1 }]
      }
      
      return {
        ...state,
        items: newItems,
        totals: calculateTotals(newItems, state.shipping.price)
      }
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const newItems = state.items.filter(item => item.id !== action.payload)
      return {
        ...state,
        items: newItems,
        totals: calculateTotals(newItems, state.shipping.price)
      }
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0)
      
      return {
        ...state,
        items: newItems,
        totals: calculateTotals(newItems, state.shipping.price)
      }
    }

    case CART_ACTIONS.CLEAR_CART: {
      return {
        ...initialState,
        shipping: state.shipping
      }
    }

    case CART_ACTIONS.LOAD_CART: {
      return {
        ...state,
        ...action.payload,
        totals: calculateTotals(action.payload.items || [], action.payload.shipping?.price || 0)
      }
    }

    case CART_ACTIONS.SET_SHIPPING: {
      return {
        ...state,
        shipping: action.payload,
        totals: calculateTotals(state.items, action.payload.price)
      }
    }

    default:
      return state
  }
}

// 💰 Função para calcular totais
function calculateTotals(items, shippingPrice = 0) {
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.price * item.quantity)
  }, 0)
  
  const shipping = subtotal >= 200 ? 0 : shippingPrice // Frete grátis acima de R$ 200
  const total = subtotal + shipping
  
  return {
    subtotal: Number(subtotal.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    total: Number(total.toFixed(2))
  }
}

// 🎯 Contexto (só valores padrão)
const CartContext = createContext()

// 🏪 Provider do carrinho
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  
  // 🛒 Estado para controlar abertura/fechamento do carrinho
  const [isOpen, setIsOpen] = useState(false)

  // 🎯 Função para alternar carrinho
  const toggleCart = () => {
    setIsOpen(prev => !prev)
  }

  // 🎯 Funções para controle manual
  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  // 💾 Carregar do localStorage na inicialização
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('sslares-cart')
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart })
      }
    } catch (error) {
      console.error('❌ Erro ao carregar carrinho:', error)
    }
  }, [])

  // 💾 Salvar no localStorage sempre que o estado mudar
  useEffect(() => {
    try {
      localStorage.setItem('sslares-cart', JSON.stringify(state))
    } catch (error) {
      console.error('❌ Erro ao salvar carrinho:', error)
    }
  }, [state])

  // 🎯 Funções do carrinho
  const addItem = (product) => {
    // 🔍 DEBUG: Vamos ver o que tem no produto
    console.log('🛒 Produto sendo adicionado:', product)
    
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        // 🎯 GARANTIR QUE SEMPRE TENHA UMA IMAGEM VÁLIDA:
        image: product.imageUrl || product.images?.[0] || "/image/placeholder.png",
        slug: product.slug
      }
    })
  }

  const removeItem = (productId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId })
  }

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id: productId, quantity }
    })
  }

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART })
  }

  const setShipping = (shippingData) => {
    dispatch({ type: CART_ACTIONS.SET_SHIPPING, payload: shippingData })
  }

  // 📊 Informações úteis
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const isEmpty = state.items.length === 0

  const value = {
    // 📦 Estado do carrinho
    items: state.items,
    shipping: state.shipping,
    totals: state.totals,
    
    // 🛒 Estado da UI
    isOpen,
    
    // 📊 Informações
    itemCount,
    isEmpty,
    
    // 🎯 Ações do carrinho
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setShipping,
    
    // 🎯 Ações da UI
    toggleCart,
    openCart,
    closeCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// 🪝 Hook personalizado
export function useCart() {
  const context = useContext(CartContext)
  
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider')
  }
  
  return context
}