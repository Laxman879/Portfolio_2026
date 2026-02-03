import CommonLayout from '@/components/client-view/common-layout'
import Analytics from '@/components/analytics'
import AnalyticsTracker from '@/components/analytics/tracker'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata = {
  title: 'Portfolio - Full Stack Developer',
  description: 'Professional portfolio showcasing modern web development projects and skills. Specializing in React, Next.js, and full-stack solutions.',
  keywords: 'portfolio, web developer, full stack, React, Next.js, JavaScript, TypeScript',
  authors: [{ name: 'Portfolio Developer' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#22c55e',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <CommonLayout>{children}</CommonLayout>
        <Analytics />
        <AnalyticsTracker />
      </body>
    </html>
  )
}
