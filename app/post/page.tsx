"use client"

import { useState } from "react"
import { StoryForm } from "@/components/story/story-form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const STORAGE_STORIES_KEY = "starre_stories"
const FLASH_KEY = "starre_flash"

export default function PostPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleStorySubmit = (story: any) => {
    console.log("語られた昔話:", story)

    try {
      if (typeof window !== "undefined") {
        // 既存ストーリーを読み込む（無ければ空配列）
        const raw = localStorage.getItem(STORAGE_STORIES_KEY)
        const current = raw ? JSON.parse(raw) : []

        // 新しい story を整形（StoryForm が渡す構造に合わせて必要なフィールドを取る）
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

        // 先頭に追加して保存
        const next = [newStory, ...current]
        localStorage.setItem(STORAGE_STORIES_KEY, JSON.stringify(next))

        // フラッシュをセット（feed 側で1回表示して削除する想定）
        const flash = { message: "投稿が保存されました", type: "success", createdAt: Date.now() }
        localStorage.setItem(FLASH_KEY, JSON.stringify(flash))
      }
    } catch (err) {
      console.error("localStorage 保存エラー:", err)
      // エラー時のフラッシュ（任意）
      try {
        if (typeof window !== "undefined") {
          const flash = { message: "投稿の保存に失敗しました", type: "error", createdAt: Date.now() }
          localStorage.setItem(FLASH_KEY, JSON.stringify(flash))
        }
      } catch {}
    }

    // UI: 完了表示に切り替え
    setIsSubmitted(true)

    // 1秒後にフィードページにリダイレクト
    setTimeout(() => {
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

        {/* 元の StoryForm UI をそのまま使う */}
        <StoryForm onSubmit={handleStorySubmit} />
      </div>
    </div>
  )
}
