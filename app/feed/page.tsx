"use client"

import { useState } from "react"
import { StoryCard } from "@/components/story/story-card"
import { StoryDetailModal } from "@/components/story/story-detail-modal"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Search, User } from "lucide-react"
import Link from "next/link"

// サンプルデータ
const sampleStories = [
  {
    id: "1",
    title: "戦後の子供時代の遊び",
    content:
      "戦争が終わった頃、私たちは何もない中でも工夫して遊んでいました。空き缶でけん玉を作ったり、新聞紙で折り紙をしたり。物がない時代だからこそ、創造力が育ったのかもしれません。近所の子供たちと一緒に、夕方まで外で遊び回っていた日々が懐かしいです。\n\n特に印象に残っているのは、みんなでビー玉遊びをしたことです。道路に穴を掘って、そこにビー玉を入れる遊びでした。今思えば危険でしたが、車もほとんど通らない時代でしたから。勝った人がみんなのビー玉をもらえるルールで、とても真剣に遊んでいました。",
    category: "childhood",
    era: "1940s",
    author: {
      name: "田中花子",
      type: "grandparent" as const,
    },
    createdAt: "2024-01-15T10:00:00Z",
    likes: 24,
    comments: 2,
    isLiked: false,
    Revivals: 24,
    isRevived: false,
  },
  {
    id: "2",
    title: "昔の正月の過ごし方",
    content:
      "昔の正月は今とは全く違いました。12月の終わりから準備を始めて、餅つきは家族総出で行いました。おせち料理も全て手作りで、母と祖母が何日もかけて作っていました。元旦には着物を着て、親戚みんなで集まって新年の挨拶をしました。\n\n子供たちは羽根つきやコマ回し、かるた取りをして遊びました。お年玉も今ほど多くはありませんでしたが、それでもとても嬉しかったものです。一年で一番特別な時間でした。",
    category: "festival",
    era: "1960s",
    author: {
      name: "佐藤一郎",
      type: "grandparent" as const,
    },
    createdAt: "2024-01-14T15:30:00Z",
    likes: 18,
    comments: 1,
    isLiked: true,
    Revivals: 24,
    isRevived: false,
  },
]

// サンプルコメントデータ
const sampleComments = {
  "1": [
    {
      id: "c1",
      content:
        "とても懐かしいお話ですね！私も同じような経験があります。物がない時代だからこそ、みんなで工夫して遊んでいましたよね。",
      author: {
        name: "山田太郎",
        type: "grandparent" as const,
      },
      createdAt: "2024-01-15T12:00:00Z",
      likes: 3,
      isLiked: false,
    },
    {
      id: "c2",
      content:
        "今の時代では考えられないような遊びですが、とても創造的で素敵だと思います。おじいちゃんおばあちゃんの知恵を学びたいです！",
      author: {
        name: "鈴木花子",
        type: "grandchild" as const,
      },
      createdAt: "2024-01-15T14:30:00Z",
      likes: 5,
      isLiked: true,
    },
  ],
  "2": [
    {
      id: "c3",
      content: "昔の正月は本当に特別でしたね。家族みんなが集まって、一年で一番大切な時間でした。",
      author: {
        name: "高橋一郎",
        type: "grandparent" as const,
      },
      createdAt: "2024-01-14T16:00:00Z",
      likes: 2,
      isLiked: false,
    },
  ],
}

export default function FeedPage() {
  const [stories, setStories] = useState(sampleStories)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [eraFilter, setEraFilter] = useState("all")
  const [selectedStory, setSelectedStory] = useState<any>(null)
  const [comments, setComments] = useState(sampleComments)

  const handleLike = (storyId: string) => {
    setStories(
      stories.map((story) =>
        story.id === storyId
          ? {
              ...story,
              isLiked: !story.isLiked,
              likes: story.isLiked ? story.likes - 1 : story.likes + 1,
            }
          : story,
      ),
    )
  }

  const handleRevival = (storyId: string) => {
    setStories(
      stories.map((story) =>
        story.id === storyId
          ? {
              ...story,
              isRevived: !story.isRevived,
              Revivals: story.isRevived ? story.Revivals - 1 : story.Revivals + 1,
            }
          : story,
      ),
    )
  }

  const handleComment = (storyId: string) => {
    const story = stories.find((s) => s.id === storyId)
    if (story) {
      setSelectedStory(story)
    }
  }

  const handleShare = (storyId: string) => {
    console.log("共有機能:", storyId)
    // 共有機能の実装（ハリボテ）
  }

  const handleAddComment = (storyId: string, content: string) => {
    const newComment = {
      id: `c${Date.now()}`,
      content,
      author: {
        name: "あなた", // 実際のアプリでは認証されたユーザー情報を使用
        type: "grandparent" as const,
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    }

    setComments((prev) => ({
      ...prev,
      [storyId]: [...(prev[storyId] || []), newComment],
    }))

    // Update story comment count
    setStories((prev) =>
      prev.map((story) => (story.id === storyId ? { ...story, comments: story.comments + 1 } : story)),
    )
  }

  const handleLikeComment = (commentId: string) => {
    setComments((prev) => {
      const newComments = { ...prev }
      Object.keys(newComments).forEach((storyId) => {
        newComments[storyId] = newComments[storyId].map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                isLiked: !comment.isLiked,
                likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              }
            : comment,
        )
      })
      return newComments
    })
  }

  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || story.category === categoryFilter
    const matchesEra = eraFilter === "all" || story.era === eraFilter

    return matchesSearch && matchesCategory && matchesEra
  })

  return (
    <div className="min-h-screen  pb-20 md:pb-0">
      {/* ヘッダー */}
      <header className="bg-header border-b sticky top-0 z-10 w-full">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <img src="/header.png" alt="StarRe Logo" className="h-8 sm:h-10 w-auto" />
            <div className="flex items-center gap-3 sm:gap-6">
              <Link href="/post">
                <Button size="sm" className="gap-2">
                  <PlusCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">語る</span>
                </Button>
              </Link>

              <Link href="/profile">
                <Button variant="outline" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">プロフィール</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* 検索・フィルター */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="昔話を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-base h-12"
              />
            </div>

            {/* カテゴリー + 時代 */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:flex-1 h-10">
                  <SelectValue placeholder="カテゴリー" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全てのカテゴリー</SelectItem>
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

              <Select value={eraFilter} onValueChange={setEraFilter}>
                <SelectTrigger className="w-full sm:flex-1 h-10">
                  <SelectValue placeholder="時代" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全ての時代</SelectItem>
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
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto p-4">
        <div className="space-y-6">
          {filteredStories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">条件に合う昔話が見つかりませんでした</p>
            </div>
          ) : (
            filteredStories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                onLike={handleLike}
                onRevival={handleRevival}
                onComment={handleComment}
                onShare={handleShare}
                onClick={() => setSelectedStory(story)}
              />
            ))
          )}
        </div>
      </main>

      {/* ストーリー詳細モーダル */}
      <StoryDetailModal
        story={selectedStory}
        isOpen={!!selectedStory}
        onClose={() => setSelectedStory(null)}
        onLike={handleLike}
        onRevival={handleRevival}
        onShare={handleShare}
        comments={selectedStory ? comments[selectedStory.id] || [] : []}
        onAddComment={handleAddComment}
        onLikeComment={handleLikeComment}
      />

      {/* ボトムナビゲーション（モバイル用） */}
      <BottomNav />
    </div>
  )
}
