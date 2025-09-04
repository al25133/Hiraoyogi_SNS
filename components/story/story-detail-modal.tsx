"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Clock } from "lucide-react"
import { CommentSection } from "./comment-section"

interface Story {
  id: string
  title: string
  content: string
  category: string
  era: string
  tags: string[]
  author: {
    name: string
    avatar?: string
    type: "grandparent" | "grandchild"
  }
  createdAt: string
  likes: number
  comments: number
  isLiked?: boolean
}

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

interface StoryDetailModalProps {
  story: Story | null
  isOpen: boolean
  onClose: () => void
  onLike?: (storyId: string) => void
  onShare?: (storyId: string) => void
  comments?: Comment[]
  onAddComment?: (storyId: string, content: string) => void
  onLikeComment?: (commentId: string) => void
}

export function StoryDetailModal({
  story,
  isOpen,
  onClose,
  onLike,
  onShare,
  comments = [],
  onAddComment,
  onLikeComment,
}: StoryDetailModalProps) {
  if (!story) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      childhood: "子供時代",
      work: "仕事・職業",
      family: "家族・結婚",
      culture: "文化・伝統",
      food: "料理・食べ物",
      festival: "祭り・行事",
      technology: "技術・道具",
      other: "その他",
    }
    return labels[category] || category
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Avatar className="h-12 w-12">
                <AvatarImage src={story.author.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {story.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-base">{story.author.name}</h4>
                  <Badge variant={story.author.type === "grandparent" ? "default" : "secondary"} className="text-xs">
                    {story.author.type === "grandparent" ? "おじいちゃん・おばあちゃん" : "お孫さん"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <Clock className="h-3 w-3" />
                  {formatDate(story.createdAt)}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">{getCategoryLabel(story.category)}</Badge>
              <Badge variant="outline">{story.era}</Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* 昔話の内容 */}
          <div>
            <DialogTitle className="text-2xl font-serif text-primary mb-4 leading-relaxed">{story.title}</DialogTitle>
            <p className="text-base leading-relaxed text-foreground whitespace-pre-wrap">{story.content}</p>
          </div>

          {/* タグ */}
          {story.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {story.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* アクションボタン */}
          <div className="flex items-center justify-between py-4 border-y">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLike?.(story.id)}
                className={`gap-2 ${story.isLiked ? "text-red-500" : "text-muted-foreground"}`}
              >
                <Heart className={`h-4 w-4 ${story.isLiked ? "fill-current" : ""}`} />
                {story.likes}
              </Button>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
                <span>{comments.length}件のコメント</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShare?.(story.id)}
              className="gap-2 text-muted-foreground"
            >
              <Share2 className="h-4 w-4" />
              共有
            </Button>
          </div>

          {/* コメントセクション */}
          <div>
            <h3 className="text-lg font-medium mb-4">コメント</h3>
            <CommentSection
              storyId={story.id}
              comments={comments}
              onAddComment={onAddComment}
              onLikeComment={onLikeComment}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
