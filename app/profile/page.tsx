"use client"

import { useState } from "react"
import { ProfileForm } from "@/components/profile/profile-form"
import { UserStories } from "@/components/profile/user-stories"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Settings } from "lucide-react"
import Link from "next/link"

// サンプルユーザーデータ
const sampleUser = {
  name: "田中花子",
  email: "hanako@example.com",
  type: "grandparent" as const,
  avatar: "",
  bio: "戦後の子供時代を過ごし、多くの変化を見てきました。昔の生活や文化を若い世代に伝えたいと思っています。",
  birthYear: "1940",
  location: "東京都",
  interests: ["childhood", "culture", "festival", "food"],
}

// サンプル投稿データ
const sampleStories = [
  {
    id: "1",
    title: "戦後の子供時代の遊び",
    content:
      "戦争が終わった頃、私たちは何もない中でも工夫して遊んでいました。空き缶でけん玉を作ったり、新聞紙で折り紙をしたり。物がない時代だからこそ、創造力が育ったのかもしれません。",
    category: "childhood",
    era: "1940s",
    tags: ["遊び", "戦後", "子供時代"],
    createdAt: "2024-01-15T10:00:00Z",
    likes: 24,
    comments: 8,
    isPublished: true,
  },
  {
    id: "2",
    title: "昔の正月料理の思い出",
    content:
      "昔の正月は今とは全く違いました。おせち料理も全て手作りで、母と祖母が何日もかけて作っていました。一つ一つに意味があって、家族の健康と幸せを願って作られていました。",
    category: "food",
    era: "1950s",
    tags: ["正月", "料理", "家族"],
    createdAt: "2024-01-10T15:30:00Z",
    likes: 18,
    comments: 12,
    isPublished: true,
  },
  {
    id: "3",
    title: "学校給食の始まり",
    content: "私が小学生の頃、学校給食が始まりました。最初はパンと牛乳だけでしたが...",
    category: "childhood",
    era: "1950s",
    tags: ["学校", "給食"],
    createdAt: "2024-01-08T09:00:00Z",
    likes: 0,
    comments: 0,
    isPublished: false,
  },
]

export default function ProfilePage() {
  const [user, setUser] = useState(sampleUser)
  const [stories, setStories] = useState(sampleStories)

  const handleSaveProfile = (updatedProfile: any) => {
    setUser(updatedProfile)
    console.log("プロフィール更新:", updatedProfile)
  }

  const handleEditStory = (storyId: string) => {
    console.log("昔話編集:", storyId)
    // 編集ページへのナビゲーション
  }

  const handleDeleteStory = (storyId: string) => {
    setStories(stories.filter((story) => story.id !== storyId))
  }

  const publishedStories = stories.filter((story) => story.isPublished)
  const draftStories = stories.filter((story) => !story.isPublished)

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="bg-card border-b">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/feed">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  フィードに戻る
                </Button>
              </Link>
              <h1 className="text-2xl font-serif text-primary">プロフィール</h1>
            </div>
            <Link href="/profile/settings">
              <Button variant="outline" className="gap-2 bg-transparent">
                <Settings className="h-4 w-4" />
                設定
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto p-4">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="text-base">
              基本情報
            </TabsTrigger>
            <TabsTrigger value="stories" className="text-base">
              投稿した昔話 ({publishedStories.length})
            </TabsTrigger>
            <TabsTrigger value="drafts" className="text-base">
              下書き ({draftStories.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileForm profile={user} onSave={handleSaveProfile} />
          </TabsContent>

          <TabsContent value="stories">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-serif text-primary">公開中の昔話</h2>
                <Link href="/post">
                  <Button>新しい昔話を投稿</Button>
                </Link>
              </div>
              <UserStories stories={publishedStories} onEdit={handleEditStory} onDelete={handleDeleteStory} />
            </div>
          </TabsContent>

          <TabsContent value="drafts">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-serif text-primary">下書き</h2>
                <Link href="/post">
                  <Button>新しい昔話を投稿</Button>
                </Link>
              </div>
              <UserStories stories={draftStories} onEdit={handleEditStory} onDelete={handleDeleteStory} />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
