"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { StoryCard } from "@/components/story/story-card"
import { StoryDetailModal } from "@/components/story/story-detail-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Search, User } from "lucide-react"
import { withBase } from "@/utils/withBase"

type Author = { name: string; type: string }
type Story = {
  id: string
  title: string
  content: string
  category: string
  era: string
  author: Author
  createdAt: string
  likes: number
  comments: number
  revivals: number
  isLiked?: boolean
  isRevived?: boolean
  isPublished?: boolean
}

type Comment = {
  id: string
  content: string
  author: Author
  createdAt: string
  likes: number
  isLiked?: boolean
}

const STORAGE_STORIES_KEY = "starre_stories"
const STORAGE_COMMENTS_KEY = "starre_comments"

/** サンプルデータ（初回ロード用） */
const sampleStories: Story[] = [
   {
    id: "s1",
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
    revivals: 24,
    isRevived: false,
  },
  {
    id: "s2",
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
    revivals: 24,
    isRevived: false,
  },
  {
    id: "s3",
    title: "昔の遊び",
    content:
      "めんこという遊びを知っていますか？\n 私が子供の頃に遊んでいた遊びです。遊び方は簡単で、めんこという画用紙を幾つにも折って丸くした道具を地面に置きます。そして、もうひとりが力一杯自分のめんこを地面に叩きつけるのです。地面に置いためんこが裏返る。あるいは、めんこの下を通過したら地面のめんこを貰うことができます。\n\n昔は様々な絵が描かれためんこが沢山あってね。皆それぞれがめんこを沢山もっていたよ。それを持ち寄ってめんこを取りあってね。懐かしい思い出だね。",
    category: "childhood",
    era: "1970s",
    author: {
      name: "鈴木満子",
      type: "grandparent" as const,
    },
    createdAt: "2024-01-14T15:30:00Z",
    likes: 48,
    comments: 10,
    isLiked: true,
    revivals: 50,
    isRevived: true,
  },
  {
    id: "s4",
    title: "柳川鍋",
    content:
      "私は、柳川鍋という鍋料理をよく食べていたんじゃ。柳川っていうのはドジョウのことだ。ドジョウを開いて、甘辛い割り下で似てから卵で閉じて食べるんじゃ。\n\n昔はなドジョウというのは「精のつくもの食べ物」とされておった。ドジョウはうなぎと似ているがとても安くて栄養があったんじゃよ。\n名前の由来も色々あってな。私はドジョウを並べた姿が柳の葉に似とるからだと思っていたんじゃか。柳川で作られたからという説もあるらしい。どれか本当かは分からんが愛されていた料理なのは確かじゃ。 ",
    category: "food",
    era: "1930s",
    author: {
      name: "齋藤樽助",
      type: "grandparent" as const,
    },
    createdAt: "2024-01-14T15:30:00Z",
    likes: 20,
    comments: 3,
    isLiked: false,
    revivals: 5,
    isRevived: false,
  },
  {
    id: "s5",
    title: "川で遊んだ夏の日",
    content:
      "子供の頃、近所の川で毎日遊んでいた。石を投げては競争し、夕方になると家に帰るとおばあちゃんのご飯が待っていた。",
    category: "childhood",
    era: "1970s",
    author: { name: "山田一郎", type: "grandparent" },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 30).toISOString(),
    likes: 12,
    comments: 2,
    revivals: 3,
    isLiked: false,
    isRevived: false,
    isPublished: true,
  },
  {
    id: "s6",
    title: "祭りの夜の屋台",
    content:
      "子どもの頃、夏祭りの屋台で食べた焼きそばの味は今でも忘れられない。友達とお小遣いを合わせてゲームをした記憶。",
    category: "festival",
    era: "1980s",
    author: { name: "鈴木花子", type: "grandparent" },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 25).toISOString(),
    likes: 8,
    comments: 1,
    revivals: 1,
    isLiked: false,
    isRevived: false,
    isPublished: true,
  },
  {
    id: "s7",
    title: "台所で教わった味",
    content:
      "祖母に教わった漬物の作り方。季節ごとに違う野菜で作った漬物を囲んで家族が笑い合った。",
    category: "food",
    era: "1950s",
    author: { name: "佐藤太郎", type: "grandparent" },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 50).toISOString(),
    likes: 20,
    comments: 5,
    revivals: 7,
    isLiked: false,
    isRevived: false,
    isPublished: true,
  },
]

const sampleComments: Record<string, Comment[]> = {
  s1: [
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
  s2: [
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
  s5: [
    {
      id: "c1",
      content: "いい話ですね！川の思い出は懐かしいです。",
      author: { name: "読者A", type: "user" },
      createdAt: new Date().toISOString(),
      likes: 1,
      isLiked: false,
    },
  ],
  s7: [
    {
      id: "c2",
      content: "私も祖母の漬物が好きでした。作り方を教えてほしいです。",
      author: { name: "読者B", type: "user" },
      createdAt: new Date().toISOString(),
      likes: 2,
      isLiked: false,
    },
  ],
}

export default function FeedPage() {
  const router = useRouter()
  const [stories, setStories] = useState<any[]>([])
  const [comments, setComments] = useState<Record<string, any[]>>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [eraFilter, setEraFilter] = useState("all")
  const [selectedStory, setSelectedStory] = useState<any | null>(null)

  // フラッシュメッセージ state
  const [flash, setFlash] = useState<{ message: string; type?: string } | null>(null)

  // 初回ロード：stories/comments とフラッシュを読み込む
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const raw = localStorage.getItem(STORAGE_STORIES_KEY)
      if (raw) {
        setStories(JSON.parse(raw))
      } else {
        localStorage.setItem(STORAGE_STORIES_KEY, JSON.stringify(sampleStories))
        setStories(sampleStories)
      }
    } catch (e) {
      console.error("stories load failed", e)
      setStories(sampleStories)
    }

    try {
      const rawC = localStorage.getItem(STORAGE_COMMENTS_KEY)
      if (rawC) {
        setComments(JSON.parse(rawC))
      } else {
        localStorage.setItem(STORAGE_COMMENTS_KEY, JSON.stringify(sampleComments))
        setComments(sampleComments)
      }
    } catch (e) {
      console.error("comments load failed", e)
      setComments(sampleComments)
    }

    // フラッシュ読み取り（1回だけ）
    try {
      const rawF = localStorage.getItem(FLASH_KEY)
      if (rawF) {
        const parsed = JSON.parse(rawF)
        if (parsed && parsed.message) {
          setFlash({ message: parsed.message, type: parsed.type })
        }
        localStorage.removeItem(FLASH_KEY)
      }
    } catch (e) {
      console.error("flash read error", e)
    }
  }, [])

  // フラッシュ自動消去（数秒後）
  useEffect(() => {
    if (!flash) return
    const t = setTimeout(() => setFlash(null), 4500)
    return () => clearTimeout(t)
  }, [flash])

  const persistStories = (next: any[]) => {
    setStories(next)
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_STORIES_KEY, JSON.stringify(next))
      } catch (e) {
        console.error("persist stories failed", e)
      }
    }
  }

  const persistComments = (next: Record<string, any[]>) => {
    setComments(next)
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_COMMENTS_KEY, JSON.stringify(next))
      } catch (e) {
        console.error("persist comments failed", e)
      }
    }
  }

  const handleLike = (storyId: string) => {
    const next = stories.map((s: any) =>
      s.id === storyId ? { ...s, isLiked: !s.isLiked, likes: s.isLiked ? s.likes - 1 : s.likes + 1 } : s,
    )
    persistStories(next)
  }

  const handleRevival = (storyId: string) => {
    const next = stories.map((s: any) =>
      s.id === storyId ? { ...s, isRevived: !s.isRevived, revivals: s.isRevived ? s.revivals - 1 : s.revivals + 1 } : s,
    )
    persistStories(next)
  }

  const handleAddComment = (storyId: string, content: string) => {
    if (!content.trim()) return
    const newComment = {
      id: `c${Date.now()}`,
      content: content.trim(),
      author: { name: "あなた", type: "user" },
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    }
    const nextComments = { ...(comments || {}) }
    nextComments[storyId] = [...(nextComments[storyId] || []), newComment]
    persistComments(nextComments)

    const nextStories = stories.map((s: any) => (s.id === storyId ? { ...s, comments: (s.comments || 0) + 1 } : s))
    persistStories(nextStories)
  }

  const handleLikeComment = (commentId: string) => {
    const nextComments = Object.fromEntries(
      Object.entries(comments || {}).map(([storyId, list]) => [
        storyId,
        list.map((c: any) => (c.id === commentId ? { ...c, isLiked: !c.isLiked, likes: c.isLiked ? c.likes - 1 : c.likes + 1 } : c)),
      ]),
    )
    persistComments(nextComments)
  }

  const filtered = stories.filter((s: any) => {
    const term = searchTerm.trim().toLowerCase()
    const matchesSearch = !term || s.title.toLowerCase().includes(term) || s.content.toLowerCase().includes(term)
    const matchesCategory = categoryFilter === "all" || s.category === categoryFilter
    const matchesEra = eraFilter === "all" || s.era === eraFilter
    return matchesSearch && matchesCategory && matchesEra
  })

  return (
    <div className="min-h-screen pb-20">
      <header className="bg-header border-b sticky top-0 z-10 w-full">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center justify-between gap-3 mb-4">
            <Image src={withBase("/header.png")} alt="header" width={200} height={40} className="h-8 w-auto" unoptimized />
            <div className="flex items-center gap-2">
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

          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="昔話を検索..." className="pl-10 h-12" />
            </div>

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

        {/* フラッシュ（header の直下に出す） */}
        {flash && (
          <div className="w-full bg-transparent">
            <div
              role="alert"
              className={`max-w-4xl mx-auto px-4 py-2 text-sm rounded-b-md mt-0 ${
                flash.type === "error" ? "bg-red-50 text-red-800 border-red-100" : "bg-green-50 text-green-800 border-green-100"
              } border`}
            >
              {flash.message}
            </div>
          </div>
        )}
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <div className="space-y-6">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">条件に合う昔話が見つかりませんでした</p>
            </div>
          ) : (
            filtered.map((s: any) => (
              <StoryCard
                key={s.id}
                story={s}
                onLike={() => handleLike(s.id)}
                onRevival={() => handleRevival(s.id)}
                onComment={() => setSelectedStory(s)}
                onShare={() => console.log("share", s.id)}
                onClick={() => setSelectedStory(s)}
              />
            ))
          )}
        </div>
      </main>

      <StoryDetailModal
        story={selectedStory}
        isOpen={!!selectedStory}
        onClose={() => setSelectedStory(null)}
        onLike={(id: string) => handleLike(id)}
        onRevival={(id: string) => handleRevival(id)}
        onShare={(id: string) => console.log("share", id)}
        comments={selectedStory ? comments[selectedStory.id] || [] : []}
        onAddComment={(storyId: string, content: string) => handleAddComment(storyId, content)}
        onLikeComment={(commentId: string) => handleLikeComment(commentId)}
      />
    </div>
  )
}
