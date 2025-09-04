"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, Send, Clock } from "lucide-react"

interface Comment {
  id: string
  content: string
  author: {
    name: string
    avatar?: string
    type: "grandparent" | "grandchild"
  }
  createdAt: string
  likes: number
  isLiked?: boolean
}

interface CommentSectionProps {
  storyId: string
  comments: Comment[]
  onAddComment?: (storyId: string, content: string) => void
  onLikeComment?: (commentId: string) => void
}

export function CommentSection({ storyId, comments, onAddComment, onLikeComment }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)
    try {
      await onAddComment?.(storyId, newComment.trim())
      setNewComment("")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "たった今"
    if (diffInHours < 24) return `${diffInHours}時間前`
    if (diffInHours < 48) return "昨日"
    return date.toLocaleDateString("ja-JP", { month: "long", day: "numeric" })
  }

  return (
    <div className="space-y-4">
      {/* コメント投稿フォーム */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="この昔話についてコメントを書いてください..."
          className="min-h-[80px] text-base leading-relaxed resize-none"
          maxLength={500}
        />
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{newComment.length}/500文字</span>
          <Button type="submit" disabled={!newComment.trim() || isSubmitting} className="gap-2">
            <Send className="h-4 w-4" />
            {isSubmitting ? "投稿中..." : "コメント投稿"}
          </Button>
        </div>
      </form>

      {/* コメント一覧 */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-base">まだコメントがありません</p>
            <p className="text-sm">最初にコメントを投稿してみませんか？</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-muted/30 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {comment.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h5 className="font-medium text-sm">{comment.author.name}</h5>
                    <Badge
                      variant={comment.author.type === "grandparent" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {comment.author.type === "grandparent" ? "おじいちゃん・おばあちゃん" : "お孫さん"}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatDate(comment.createdAt)}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">{comment.content}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pl-13">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onLikeComment?.(comment.id)}
                  className={`gap-1 h-8 text-xs ${comment.isLiked ? "text-red-500" : "text-muted-foreground"}`}
                >
                  <Heart className={`h-3 w-3 ${comment.isLiked ? "fill-current" : ""}`} />
                  {comment.likes > 0 && comment.likes}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
