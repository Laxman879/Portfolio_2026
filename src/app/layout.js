import CommonLayout from '@/components/client-view/common-layout'
import Analytics from '@/components/analytics'
import AnalyticsTracker from '@/components/analytics/tracker'
import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'

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
        
        {/* Google Tag Manager */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NP896R68');`,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-NP896R68"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        
        <CommonLayout>{children}</CommonLayout>
        <Analytics />
        <AnalyticsTracker />
      </body>
    </html>
  )
}
