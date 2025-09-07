"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { withBase } from "@/utils/withBase"
import { StoryForm } from "@/components/story/story-form"
import { Button } from "@/components/ui/button"
import { PlusCircle, User } from "lucide-react"
import type React from "react"

const STORAGE_STORIES_KEY = "starre_stories"
const FLASH_KEY = "starre_flash"

export default function PostPage(): React.ReactElement {
  const router = useRouter()

  const handleSubmit = async (partialStory: {
    title?: string
    content?: string
    category?: string
    era?: string
    createdAt?: string
  }) => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_STORIES_KEY) : null
      const current = raw ? JSON.parse(raw) : []

      const newStory = {
        id: `${Date.now()}`,
        title: partialStory.title ?? "",
        content: partialStory.content ?? "",
        category: partialStory.category ?? "other",
        era: partialStory.era ?? "unknown",
        author: { name: "あなた", type: "grandparent" },
        createdAt: partialStory.createdAt ?? new Date().toISOString(),
        likes: 0,
        comments: 0,
        revivals: 0,
        isLiked: false,
        isRevived: false,
        isPublished: true,
      }

      const next = [newStory, ...current]
      localStorage.setItem(STORAGE_STORIES_KEY, JSON.stringify(next))

      // フラッシュをセット（feed 側で1回表示して削除されます）
      const flash = { message: "投稿が保存されました", type: "success", createdAt: Date.now() }
      localStorage.setItem(FLASH_KEY, JSON.stringify(flash))

      router.push("/feed")
    } catch (err) {
      console.error("投稿保存に失敗しました", err)
      // エラー時のフラッシュ（任意）
      const flash = { message: "投稿の保存に失敗しました", type: "error", createdAt: Date.now() }
      try {
        localStorage.setItem(FLASH_KEY, JSON.stringify(flash))
      } catch {}
      router.push("/feed")
    }
  }

  return (
    <div className="min-h-screen pb-10">
      {/* ヘッダー（feed と見た目を合わせる） */}
      <header className="bg-header border-b sticky top-0 z-10 w-full">
        <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
          <Link href="/feed" className="inline-flex items-center gap-3">
            <Image src={withBase("/header.png")} alt="StarRe" width={200} height={40} className="h-8 w-auto" unoptimized />
          </Link>

          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => router.push("/feed")} className="gap-2">
              <span className="hidden sm:inline">フィードへ</span>
            </Button>

            <Link href="/profile">
              <Button variant="outline" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">プロフィール</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 本文（既存の StoryForm UI をそのまま利用） */}
      <main className="max-w-3xl mx-auto p-6">
        <StoryForm onSubmit={handleSubmit} />
      </main>
    </div>
  )
}
