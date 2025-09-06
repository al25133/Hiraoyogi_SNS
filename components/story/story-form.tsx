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



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const story = {
      title,
      content,
      category,
      era,
      createdAt: new Date().toISOString(),
    }
    onSubmit?.(story)
    // Reset form
    setTitle("")
    setContent("")
    setCategory("")
    setEra("")
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

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* カテゴリー */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-base font-medium">
                カテゴリー
              </Label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="h-12 w-full rounded-md border border-input  px-3 text-base"
              >
                <option value="">カテゴリーを選択</option>
                <option value="childhood">子供時代</option>
                <option value="work">仕事・職業</option>
                <option value="family">家族・結婚</option>
                <option value="culture">文化・伝統</option>
                <option value="food">料理・食べ物</option>
                <option value="festival">祭り・行事</option>
                <option value="technology">技術・道具</option>
                <option value="other">その他</option>
              </select>
            </div>
          
            {/* 時代 */}
            <div className="space-y-2">
              <Label htmlFor="era" className="text-base font-medium">
                時代
              </Label>
              <select
                id="era"
                value={era}
                onChange={(e) => setEra(e.target.value)}
                required
                className="h-12 w-full rounded-md border border-input  px-3 text-base"
              >
                <option value="">時代を選択</option>
                <option value="1930s">1930年代</option>
                <option value="1940s">1940年代</option>
                <option value="1950s">1950年代</option>
                <option value="1960s">1960年代</option>
                <option value="1970s">1970年代</option>
                <option value="1980s">1980年代</option>
                <option value="1990s">1990年代</option>
                <option value="2000s">2000年代</option>
              </select>
            </div>
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

          <Button type="submit" className="w-full h-12 text-base">
            昔話を投稿する
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
