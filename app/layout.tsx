import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"

export const metadata = {
  title: "Taxventure - Digital Invoice Management | FBR-Integrated SaaS Platform",
  description: "Pakistan's leading digital invoice management solution. Streamline your business operations with our cutting-edge SaaS platform, fully integrated with FBR for seamless compliance and automated tax calculations.",
  keywords: "digital invoice management, FBR integration, SaaS platform, Pakistan, tax compliance, business automation, invoice processing, cloud-based solutions, digital documentation",
  authors: [{ name: "Taxventure Team" }],
  creator: "Taxventure",
  publisher: "Taxventure",
  robots: "index, follow",
  openGraph: {
    title: "Taxventure - Digital Invoice Management Simplified",
    description: "Transform your business operations with Pakistan's most trusted FBR-integrated invoice management platform.",
    url: "https://taxventure.net",
    siteName: "Taxventure",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taxventure - Digital Invoice Management",
    description: "FBR-integrated SaaS platform for modern businesses in Pakistan",
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#DC2626',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Roboto:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="msapplication-TileColor" content="#DC2626" />
        <meta name="application-name" content="Taxventure" />
        <meta name="apple-mobile-web-app-title" content="Taxventure" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="font-inter antialiased" suppressHydrationWarning>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          {/* Toast notifications - positioned at top-right */}
          <Toaster 
            position="top-right"
            expand={true}
            richColors={true}
            closeButton={true}
            toastOptions={{
              duration: 5000,
              style: {
                background: '#ffffff',
                color: '#1f2937',
                border: '1px solid #e5e7eb',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
              },
              className: 'font-inter',
              descriptionClassName: 'text-gray-600',
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}