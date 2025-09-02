import './globals.css'

export const metadata = {
  title: 'HeadwayOS – Get started',
  description: 'Your journey, in stunning clarity1. Extraordinary career workflow. No design skills required.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black">
        {children}
      </body>
    </html>
  )
}