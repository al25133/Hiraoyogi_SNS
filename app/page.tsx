"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // 実際のアプリでは認証状態をチェックしてからリダイレクト
    router.push("/feed")
  }, [router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-serif text-primary mb-4">世代つなぎ</h1>
        <p className="text-muted-foreground">読み込み中...</p>
      </div>
    </div>
  )
}
