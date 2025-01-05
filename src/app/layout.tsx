"use client"
import './globals.css'
import type { Metadata } from 'next'
import { usePathname } from 'next/navigation'
import { Inter } from 'next/font/google'
import Navbar from './Navbar'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

const disableNavbar=["/login","/register"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
       <SessionProvider>
       {!disableNavbar.includes(pathname) && <Navbar />}
       {children}
       </SessionProvider>
        </body>
    </html>
  )
}
