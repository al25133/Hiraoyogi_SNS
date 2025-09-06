import type React from "react"
import { ThemeProvider } from "next-themes"
import type { Metadata } from "next"
import { Noto_Sans_JP, JetBrains_Mono } from "next/font/google"
import "./globals.css"

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

export const metadata: Metadata = {
  title: "StarRe: -未来つなぎ-",
  description: "祖父母と孫をつなぐ、昔話と文化を共有するソーシャルネットワーク",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

  return (
    <html lang="ja" className={`${notoSansJP.variable} ${jetbrainsMono.variable}`}>
      <body
        className="font-sans antialiased min-h-screen bg-cover bg-center"
        style={
          {
            // TypeScript のため any キャスト。CSS カスタムプロパティは文字列で渡す
            ["--bg-url" as any]: `url(${base}/background.png)`,
          } as React.CSSProperties
        }
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
