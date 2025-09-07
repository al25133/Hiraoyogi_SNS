"use client"

import { useEffect, useRef, useState } from "react"
import { StoryForm } from "@/components/story/story-form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { STORAGE_STORIES_KEY, FLASH_KEY } from "@/lib/constants"

const STORAGE_STORIES_KEY = "starre_stories"
const FLASH_KEY = "starre_flash" // ← ここを必ず定義する

export default function PostPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      // コンポーネントがアンマウントされるときにタイマーをクリア
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleStorySubmit = (story: any) => {
    try {
      if (typeof window !== "undefined") {
        const raw = localStorage.getItem(STORAGE_STORIES_KEY)
        const current = raw ? JSON.parse(raw) : []

        const newStory = {
          id: `${Date.now()}`,
          title: story?.title ?? "",
          content: story?.content ?? "",
          category: story?.category ?? "other",
          era: story?.era ?? "unknown",
          author: story?.author ?? { name: "あなた", type: "grandparent" },
          createdAt: story?.createdAt ?? new Date().toISOString(),
          likes: 0,
          comments: 0,
          revivals: 0,
          isLiked: false,
          isRevived: false,
          isPublished: true,
        }

        const next = [newStory, ...current]
        localStorage.setItem(STORAGE_STORIES_KEY, JSON.stringify(next))

        const flash = { message: "投稿が保存されました", type: "success", createdAt: Date.now() }
        localStorage.setItem(FLASH_KEY, JSON.stringify(flash))
      }
    } catch (err) {
      console.error("localStorage 保存エラー:", err)
      try {
        if (typeof window !== "undefined") {
          const flash = { message: "投稿の保存に失敗しました", type: "error", createdAt: Date.now() }
          localStorage.setItem(FLASH_KEY, JSON.stringify(flash))
        }
      } catch {}
    }

    setIsSubmitted(true)

    // タイマーを保持しておく（アンマウント時にクリアできるように）
    timeoutRef.current = window.setTimeout(() => {
      router.push("/feed")
    }, 1000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen  flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="text-6xl">🎉</div>
          <h2 className="text-2xl font-serif text-primary">昔話を語りました！</h2>
          <p className="text-base text-muted-foreground">あなたの大切な思い出が若い世代に届けられます</p>
          <p className="text-sm text-muted-foreground">まもなくフィードページに移動します...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/feed">
            <Button variant="ghost" className="gap-2 text-base">
              <ArrowLeft className="h-4 w-4" />
              フィードに戻る
            </Button>
          </Link>
        </div>

        <StoryForm onSubmit={handleStorySubmit} />
      </div>
    </div>
  )
}
