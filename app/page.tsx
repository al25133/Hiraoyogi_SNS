// app/page.tsx もしくは pages/index.tsx（あなたの実際の配置に合わせて上書きしてください）
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { withBase } from "@/utils/withBase" // 追加: utils/withBase.ts を作ってある前提

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // 実際のアプリでは認証状態をチェックしてからリダイレクト
    router.push("/feed")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Image
          src={withBase("/logo.png")}
          alt="StarRe Logo"
          className="w-auto"
          width={732}
          height={341}
          unoptimized
          priority
        />
        <p className="text-muted-foreground mt-4">読み込み中...</p>
      </div>
    </div>
  )
}
