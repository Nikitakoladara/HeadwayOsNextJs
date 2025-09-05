'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 px-0 cursor-default"
      disabled
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      <span className="sr-only">Dark mode active</span>
    </Button>
  )
}