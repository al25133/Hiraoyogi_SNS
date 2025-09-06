import type React from "react"
import { Noto_Sans_JP, JetBrains_Mono } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-jp",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

  return (
   <html lang="ja" suppressHydrationWarning className={`${notoSansJP.variable} ${jetbrainsMono.variable}`}>
      <body
        className="font-sans antialiased min-h-screen bg-cover bg-center"
        style={
          {
            ["--bg-url" as any]: `url(${base}/background.png)`,
          } as React.CSSProperties
        }
      >
        {/* ThemeProvider に system を既定にして attribute="class" を渡す */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
