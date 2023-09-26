import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'No queue',
  description: 'Stop wasting time in queues and enjoy the moment!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} mainContainer`}>
        {children}
      </body>
    </html>
  )
}
