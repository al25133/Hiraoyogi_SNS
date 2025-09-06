"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // 実際のアプリでは認証状態をチェックしてからリダイレクト
    router.push("/feed")
  }, [router])

  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="text-center">
         <Image  src="/logo.png" alt="StarRe Logo" className="h-50 w-auto" width={732} height={341} unoptimized />
        <p className="text-muted-foreground h-30">読み込み中...</p>
      </div>
    </div>
  )
}
