"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Pickaxe, MessageCircle, Calendar, Edit } from "lucide-react"

interface Story {
  id: string
  title: string
  content: string
  category: string
  era: string
  createdAt: string
  likes: number
  Revivals: number
  comments: number
  isPublished: boolean
}

interface UserStoriesProps {
  stories: Story[]
  onEdit?: (storyId: string) => void
  onDelete?: (storyId: string) => void
}

export function UserStories({ stories, onEdit, onDelete }: UserStoriesProps) {
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

  if (stories.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">まだ昔話を語っていません</p>
          <Button>最初の昔話を語る</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {stories.map((story) => (
        <Card key={story.id}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-lg font-serif text-primary">{story.title}</CardTitle>
                  <Badge variant={story.isPublished ? "default" : "secondary"}>
                    {story.isPublished ? "公開中" : "下書き"}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(story.createdAt)}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {getCategoryLabel(story.category)}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {story.era}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => onEdit?.(story.id)}
                className="gap-2"
              >
                <Edit className="h-4 w-4" />
                編集
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base leading-relaxed text-foreground">
              {story.content.length > 200 ? `${story.content.substring(0, 200)}...` : story.content}
            </p>

            <div className="flex items-center gap-4 pt-2 border-t">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Heart className="h-4 w-4" />
                {story.likes}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Pickaxe className="h-4 w-4" />
                {story.Revivals}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
                {story.comments}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
