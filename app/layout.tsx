import * as React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'
import { AuthProvider } from './auth-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Time Tracker',
  description: 'Track your time, boost your productivity',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

