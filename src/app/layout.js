import { Roboto } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import AppProvider from '@/components/AppContext'
import Header from '@/components/layout/Header'
import './globals.css'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className="max-w-4xl mx-auto p-4">
          <AppProvider>
            <Toaster />
            <Header />
            {children}
            <footer className="border-t p-4 text-center text-gray-500 mt-16">
              &copy; 2024 All rights reserved. - Made by Túlio Tenório -
            </footer>
          </AppProvider>
        </main>
      </body>
    </html>
  )
}