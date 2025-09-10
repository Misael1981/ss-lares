"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext({
  theme: "light",
  setTheme: () => null,
})

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

export const ThemeProvider = ({ children, ...props }) => {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    // Verificar se há tema salvo no localStorage
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // Verificar preferência do sistema
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      setTheme(systemTheme)
    }
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    
    // Remover classes anteriores
    root.classList.remove("light", "dark")
    
    // Adicionar nova classe
    root.classList.add(theme)
    
    // Salvar no localStorage
    localStorage.setItem("theme", theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme) => {
      setTheme(theme)
    },
  }

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  )
}