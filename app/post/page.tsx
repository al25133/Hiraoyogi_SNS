"use client"

import { useRouter } from "next/navigation"
import { StoryForm } from "@/components/story/story-form"
import type React from "react"

/**
 * app/post/page.tsx
 * - 既存の StoryForm UI をそのまま使い、onSubmit ハンドラで localStorage に保存します。
 * - 保存キー: starre_stories
 * - 保存後、/feed に遷移します（router.push）
 */

const STORAGE_STORIES_KEY = "starre_stories"

export default function PostPage(): React.ReactElement {
  const router = useRouter()

  // StoryForm から渡される「部分的な story オブジェクト」を受け取り、
  // 必要なメタデータを付与して localStorage に永続化します。
  const handleSubmit = async (partialStory: {
    title?: string
    content?: string
    category?: string
    era?: string
    createdAt?: string
  }) => {
    try {
      // 既存の配列を読み込み
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_STORIES_KEY) : null
      const current = raw ? JSON.parse(raw) : []

      // 新しい story を整形
      const newStory = {
        id: `${Date.now()}`, // 単純なユニークID
        title: partialStory.title ?? "",
        content: partialStory.content ?? "",
        category: partialStory.category ?? "other",
        era: partialStory.era ?? "unknown",
        author: { name: "あなた", type: "grandparent" }, // 必要なら認証ユーザー情報に差し替えてください
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

      // 投稿後にフィードへ遷移
      router.push("/feed")
    } catch (err) {
      console.error("投稿保存に失敗しました", err)
      // 必要なら UI でエラーハンドリングを追加してください
    }
  }

  return (
    <div className="min-h-screen p-6">
      {/* StoryForm は既存コンポーネント（UIそのまま）を使用 */}
      <StoryForm onSubmit={handleSubmit} />
    </div>
  )
}
