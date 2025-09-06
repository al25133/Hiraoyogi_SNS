"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Pickaxe, MessageCircle, Share2, Clock } from "lucide-react"

interface Story {
  id: string
  title: string
  content: string
  category: string
  era: string
  author: {
    name: string
    avatar?: string
    type: "grandparent" | "grandchild"
  }
  createdAt: string
  likes: number
  comments: number
  isLiked?: boolean
  revivals: number
  isRevived?: boolean
}

interface StoryCardProps {
  story: Story
  onLike?: (storyId: string) => void
  onRevival?: (storyId: string) => void
  onComment?: (storyId: string) => void
  onShare?: (storyId: string) => void
  onClick?: (story: Story) => void
}

export function StoryCard({
  story,
  onLike,
  onRevival,
  onComment,
  onShare,
  onClick,
}: StoryCardProps) {
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
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          {/* 左側：アイコン＋名前 */}
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={story.author.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {story.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-medium text-base">{story.author.name}</h4>
                <Badge
                  variant={
                    story.author.type === "grandparent"
                      ? "default"
                      : "secondary"
                  }
                  className="text-xs"
                >
                  {story.author.type === "grandparent"
                    ? "おじいちゃん・おばあちゃん"
                    : "お孫さん"}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Clock className="h-3 w-3" />
                {formatDate(story.createdAt)}
              </div>
            </div>
          </div>

          {/* 右側：カテゴリー＋時代 */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Badge variant="outline">{getCategoryLabel(story.category)}</Badge>
            <Badge variant="outline">{story.era}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="cursor-pointer" onClick={() => onClick?.(story)}>
          <h3 className="text-xl font-serif text-primary mb-3 leading-relaxed hover:text-primary/80 transition-colors">
            {story.title}
          </h3>
          <p className="text-base leading-relaxed text-foreground whitespace-pre-wrap break-words">
            {story.content.length > 300
              ? `${story.content.substring(0, 300)}...`
              : story.content}
          </p>
          {story.content.length > 300 && (
            <Button variant="link" className="p-0 h-auto text-accent mt-2">
              続きを読む
            </Button>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="lg"
              onClick={(e) => {
                e.stopPropagation()
                onLike?.(story.id)
              }}
              className={`gap-2 ${
                story.isLiked ? "text-red-500" : "text-muted-foreground"
              }`}
            >
              <Heart
                className={`h-6 w-6 ${story.isLiked ? "fill-current" : ""}`}
              />
              {story.likes}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={(e) => {
                e.stopPropagation()
                onRevival?.(story.id)
              }}
              className={`gap-2 ${
                story.isRevived ? "text-green-500" : "text-muted-foreground"
              }`}
            >
              <Pickaxe
                className={`h-6 w-6 ${story.isRevived ? "fill-current" : ""}`}
              />
              {story.revivals}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={(e) => {
                e.stopPropagation()
                onComment?.(story.id)
              }}
              className="gap-2 text-muted-foreground"
            >
              <MessageCircle className="h-6 w-6" />
              {story.comments}
            </Button>
          </div>
          <Button
            variant="ghost"
            size="lg"
            onClick={(e) => {
              e.stopPropagation()
              onShare?.(story.id)
            }}
            className="gap-2 text-muted-foreground"
          >
            <Share2 className="h-6 w-6" />
            共有
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
