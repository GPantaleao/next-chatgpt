"use client"

import { Session } from 'next-auth'
import { SessionProvider as Provider } from 'next-auth/react' 
import { ReactNode } from 'react'

interface SessionProps {
  children: ReactNode,
}

export function SessionProvider({ children }: SessionProps) {
  return (
    <Provider>
      {children}
    </Provider>
  )
}