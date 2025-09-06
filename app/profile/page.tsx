"use client"

import { useState } from "react"
import { ProfileForm } from "@/components/profile/profile-form"
import { UserStories } from "@/components/profile/user-stories"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Settings, Bell, Pickaxe, Heart, MessageCircle, UserPlus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

// サンプルユーザーデータ
const sampleUser = {
  name: "田村花子",
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
    createdAt: "2024-01-15T10:00:00Z",
    likes: 24,
    revivals: 28,
    comments: 8,
    isPublished: true,
  },
  {
    id: "2",
    title: "昔の正月料理の思い出",
    content:
      "年の瀬、家中に漂う煮しめの甘辛い香り。昔の正月準備は、母や祖母を中心に家族総出の一大行事でした。子どもたちも黒豆の選別や栗きんとん作りを小さな手で手伝ったものです。\n大晦日の夜、伊達巻や数の子、田作りなどが美しく重箱に詰められていく光景は、まるで宝箱のようでした。不格好でも手作りの味は格別で、元旦に家族みんなで囲むお雑煮とともに、新しい年の始まりを実感させてくれました。手間暇かけた分だけ、その賑わいや味わいは忘れられない、温かい家族の思い出です。",
    category: "food",
    era: "1950s",
    createdAt: "2024-01-10T15:30:00Z",
    likes: 18,
    revivals: 28,
    comments: 12,
    isPublished: true,
  },
]

type Notification = {
  id: string
  type: "comment" | "like" | "revival" | "follow" | "other"
  message: string
  date: string
  isRead: boolean
}

const sampleNotifications: Notification[] = [
  {
    id: "1",
    type: "comment",
    message: "あなたの昔話に新しいコメントがありました",
    date: "2024-09-01 10:30",
    isRead: false,
  },
  {
    id: "2",
    type: "revival",
    message: "復活ボタンが押されました",
    date: "2024-09-02 14:15",
    isRead: true,
  },
  {
    id: "3",
    type: "follow",
    message: "新しいフォロワーが追加されました",
    date: "2024-09-03 09:00",
    isRead: false,
  },
  {
    id: "4",
    type: "other",
    message: "システムからのお知らせがあります",
    date: "2024-09-04 12:00",
    isRead: true,
  },
  {
    id: "5",
    type: "like",
    message: "あなたの昔話がいいねされました",
    date: "2024-09-04 14:37",
    isRead: true,
  },
]

const notificationIcons: Record<Notification["type"], React.ElementType> = {
  comment: MessageCircle,
  like: Heart,
  revival: Pickaxe,
  follow: UserPlus,
  other: Bell,
}

export default function ProfilePage() {
  const [user, setUser] = useState(sampleUser)
  const [stories, setStories] = useState(sampleStories)
  const [notifications, setNotifications] = useState(sampleNotifications)

  const handleSaveProfile = (updatedProfile: any) => {
    setUser(updatedProfile)
    console.log("プロフィール更新:", updatedProfile)
  }

  const handleEditStory = (storyId: string) => {
    console.log("昔話編集:", storyId)
  }

  const handleDeleteStory = (storyId: string) => {
    setStories(stories.filter((story) => story.id !== storyId))
  }

  // 変更点：通知クリックで既読/未読をトグルする
  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n)))
  }

  const publishedStories = stories.filter((story) => story.isPublished)
  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div className="min-h-screen ">
      {/* ヘッダー */}
      <header className="bg-header border-b">
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
      <main className="max-w-4xl mx-auto p-4 mt-6">
        <Tabs defaultValue="profile" className="space-y-6">
          {/* 👇 スマホは縦並び、PCは横並び */}
          <TabsList className="flex flex-col sm:grid sm:grid-cols-3 w-full">
            <TabsTrigger
              value="profile"
              className="text-base data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              基本情報
            </TabsTrigger>
            <TabsTrigger
              value="stories"
              className="text-base data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              語った昔話 ({publishedStories.length})
            </TabsTrigger>
            <TabsTrigger
              value="drafts"
              className="text-base data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              通知{unreadCount > 0 ? ` (${unreadCount})` : ""}
            </TabsTrigger>
          </TabsList>

          {/* 基本情報 */}
          <TabsContent value="profile">
            <ProfileForm profile={user} onSave={handleSaveProfile} />
          </TabsContent>

          {/* 投稿した昔話 */}
          <TabsContent value="stories">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-serif text-primary">公開中の昔話</h2>
                <Link href="/post">
                  <Button>新しい昔話を語る</Button>
                </Link>
              </div>
              <UserStories
                stories={publishedStories}
                onEdit={handleEditStory}
                onDelete={handleDeleteStory}
              />
            </div>
          </TabsContent>

          {/* 通知 */}
          <TabsContent value="drafts">
            <div className="space-y-4">
              <h2 className="text-xl font-serif text-primary">通知</h2>
              <div className="space-y-3">
                {notifications.map((n) => {
                  const Icon = notificationIcons[n.type]
                  return (
                    <Card
                      key={n.id}
                     className={`shadow-sm border rounded-2xl cursor-pointer transition 
+                        ${n.isRead ? "bg-muted/50 border-primary/30":""}`}
                      onClick={() => markAsRead(n.id)}
                    >
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className="p-2 rounded-full bg-muted">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p
                            className={`text-sm ${
                              n.isRead ? "text-muted-foreground" : "font-semibold text-foreground"
                            }`}
                          >
                            {n.message}
                          </p>
                          <p className="text-xs text-muted-foreground">{n.date}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
