"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { withBase } from "@/utils/withBase"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/feed")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Image
          src={withBase("/logo.png")}
          alt="re:StarRe Logo"
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
