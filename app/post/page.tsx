"use client"

import { useState } from "react"
import { StoryForm } from "@/components/story/story-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PostPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleStorySubmit = (story: any) => {
    console.log("投稿された昔話:", story)
    // ここで実際のAPI呼び出しを行う
    setIsSubmitted(true)

    // 3秒後にフィードページにリダイレクト
    setTimeout(() => {
      window.location.href = "/HiraoyogiSNS/feed"
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="text-6xl">🎉</div>
          <h2 className="text-2xl font-serif text-primary">昔話を投稿しました！</h2>
          <p className="text-base text-muted-foreground">あなたの大切な思い出が若い世代に届けられます</p>
          <p className="text-sm text-muted-foreground">まもなくフィードページに移動します...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
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
