import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AppProvider } from '@/lib/context'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Maktab Monitor - Maktab holatini kuzatish',
  description: 'Ota-onalar va o\'qituvchilar uchun maktab holatini kuzatish platformasi. Holat haqida xabar bering va natijalarni ko\'ring.',
  generator: 'v0.app',
  keywords: ['maktab', 'ta\'lim', 'monitoring', 'O\'zbekiston', 'school', 'education'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3d9970' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1f2e' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <AppProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AppProvider>
        <Analytics />
      </body>
    </html>
  )
}
