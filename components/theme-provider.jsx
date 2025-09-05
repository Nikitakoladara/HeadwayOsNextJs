'use client'

import React, { createContext, useContext, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  // Dark mode only - no switching
  const theme = 'dark'

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add('dark')
  }, [])

  const value = {
    theme,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}