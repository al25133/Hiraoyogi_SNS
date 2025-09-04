"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface StoryFormProps {
  onSubmit?: (story: any) => void
}

export function StoryForm({ onSubmit }: StoryFormProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [era, setEra] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const story = {
      title,
      content,
      category,
      era,
      tags,
      createdAt: new Date().toISOString(),
    }
    onSubmit?.(story)
    // Reset form
    setTitle("")
    setContent("")
    setCategory("")
    setEra("")
    setTags([])
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-serif text-primary">昔話を投稿する</CardTitle>
        <CardDescription className="text-base">あなたの大切な思い出や経験を若い世代に伝えましょう</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-medium">
              タイトル
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例：戦後の子供時代の遊び"
              className="text-base h-12"
              required
            />
          </div>

                    {/* カテゴリー */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-base font-medium">
              カテゴリー
            </Label>
            <Select
              value={category}
              onValueChange={(val) => {
                setCategory(val)
                const hidden = document.getElementById("category-hidden") as HTMLInputElement | null
                if (hidden) hidden.value = val
              }}
            >
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="カテゴリーを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="childhood">子供時代</SelectItem>
                <SelectItem value="work">仕事・職業</SelectItem>
                <SelectItem value="family">家族・結婚</SelectItem>
                <SelectItem value="culture">文化・伝統</SelectItem>
                <SelectItem value="food">料理・食べ物</SelectItem>
                <SelectItem value="festival">祭り・行事</SelectItem>
                <SelectItem value="technology">技術・道具</SelectItem>
                <SelectItem value="other">その他</SelectItem>
              </SelectContent>
            </Select>
          
            {/* hidden input → ブラウザ標準の required を効かせる */}
            <input
              type="text"
              id="category-hidden"
              tabIndex={-1}
              autoComplete="off"
              required
              defaultValue=""
              style={{ opacity: 0, height: 0, position: "absolute", pointerEvents: "none" }}
            />
          </div>
          
          {/* 時代 */}
          <div className="space-y-2">
            <Label htmlFor="era" className="text-base font-medium">
              時代
            </Label>
            <Select
              value={era}
              onValueChange={(val) => {
                setEra(val)
                const hidden = document.getElementById("era-hidden") as HTMLInputElement | null
                if (hidden) hidden.value = val
              }}
            >
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="時代を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1930s">1930年代</SelectItem>
                <SelectItem value="1940s">1940年代</SelectItem>
                <SelectItem value="1950s">1950年代</SelectItem>
                <SelectItem value="1960s">1960年代</SelectItem>
                <SelectItem value="1970s">1970年代</SelectItem>
                <SelectItem value="1980s">1980年代</SelectItem>
                <SelectItem value="1990s">1990年代</SelectItem>
                <SelectItem value="2000s">2000年代</SelectItem>
              </SelectContent>
            </Select>
          
            {/* hidden input */}
            <input
              type="text"
              id="era-hidden"
              tabIndex={-1}
              autoComplete="off"
              required
              defaultValue=""
              style={{ opacity: 0, height: 0, position: "absolute", pointerEvents: "none" }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-base font-medium">
              昔話の内容
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="あなたの思い出や経験を詳しく書いてください。当時の様子、感じたこと、学んだことなど..."
              className="min-h-[200px] text-base leading-relaxed"
              required
            />
            <p className="text-sm text-muted-foreground">{content.length}/2000文字</p>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-medium">タグ（キーワード）</Label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="例：遊び、学校、戦争"
                className="text-base h-10"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              />
              <Button type="button" onClick={handleAddTag} variant="outline" className="h-10 bg-transparent">
                追加
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-sm">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-xs hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Button type="submit" className="w-full h-12 text-base">
            昔話を投稿する
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
