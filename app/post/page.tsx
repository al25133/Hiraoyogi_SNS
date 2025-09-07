"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Story = {
  id: string
  title: string
  content: string
  category: string
  era: string
  author: { name: string; type: string }
  createdAt: string
  likes: number
  comments: number
  revivals: number
  isLiked?: boolean
  isRevived?: boolean
  isPublished?: boolean
}

const STORAGE_STORIES_KEY = "starre_stories"

export default function PostPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("childhood")
  const [era, setEra] = useState("1970s")
  const [isPublished, setIsPublished] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    setIsSubmitting(true)

    try {
      const newStory: Story = {
        id: `${Date.now()}`,
        title: title.trim(),
        content: content.trim(),
        category,
        era,
        author: { name: "あなた", type: "grandparent" },
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: 0,
        revivals: 0,
        isLiked: false,
        isRevived: false,
        isPublished,
      }

      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_STORIES_KEY) : null
      const current: Story[] = raw ? JSON.parse(raw) : []
      const next = [newStory, ...current]
      localStorage.setItem(STORAGE_STORIES_KEY, JSON.stringify(next))

      // フィードへ遷移（投稿が追加された状態で表示される）
      router.push("/feed")
    } catch (err) {
      console.error("投稿エラー", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-serif text-primary mb-4">新しい昔話を語る</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm">タイトル</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="例：戦後の子供時代の遊び" />
        </div>

        <div>
          <label className="block mb-1 text-sm">本文</label>
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="ここに昔話を書いてください..." rows={8} />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block mb-1 text-sm">カテゴリー</label>
            <Select value={category} onValueChange={(v) => setCategory(v)}>
              <SelectTrigger className="w-full h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="childhood">子供時代</SelectItem>
                <SelectItem value="food">料理・食べ物</SelectItem>
                <SelectItem value="festival">祭り・行事</SelectItem>
                <SelectItem value="culture">文化・伝統</SelectItem>
                <SelectItem value="work">仕事・職業</SelectItem>
                <SelectItem value="other">その他</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-40">
            <label className="block mb-1 text-sm">時代</label>
            <Select value={era} onValueChange={(v) => setEra(v)}>
              <SelectTrigger className="w-full h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1930s">1930年代</SelectItem>
                <SelectItem value="1940s">1940年代</SelectItem>
                <SelectItem value="1950s">1950年代</SelectItem>
                <SelectItem value="1960s">1960年代</SelectItem>
                <SelectItem value="1970s">1970年代</SelectItem>
                <SelectItem value="1980s">1980年代</SelectItem>
                <SelectItem value="1990s">1990年代</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
            <span className="text-sm">公開する</span>
          </label>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "投稿中..." : "投稿する"}
          </Button>
        </div>
      </form>
    </div>
  )
}
