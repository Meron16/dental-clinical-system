import "./globals.css"

export const metadata = {
  title: "Dental Clinic Management System",
  description: "A comprehensive system for managing dental clinic operations",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

