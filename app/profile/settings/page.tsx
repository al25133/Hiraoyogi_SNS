// app/profile/settings/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Bell, Shield, Palette, HelpCircle, Monitor } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    newComments: true,
    newLikes: true,
    weeklyDigest: true,
  })

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEmail: false,
  })

  // next-themes
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // UI 上で「現在どれが有効か」を判定するロジック：
  // - userTheme: ユーザーが明示的に選んだ theme（"light" | "dark" | "system"）
  // - effectiveTheme: 実際にページに反映されている（resolvedTheme）
  const userTheme = theme // "light" | "dark" | "system"
  const effectiveTheme = mounted ? (userTheme === "system" ? resolvedTheme : userTheme) : undefined

  return (
    <div className="min-h-screen ">
      {/* ヘッダー */}
      <header className="bg-header border-b">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                戻る
              </Button>
            </Link>
            <h1 className="text-2xl font-serif text-primary">設定</h1>
          </div>
        </div>
      </header>

      {/* メイン */}
      <main className="max-w-4xl mx-auto p-4 space-y-6">
         {/* 通知設定 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-serif text-primary">
              <Bell className="h-5 w-5" />
              通知設定
            </CardTitle>
            <CardDescription>どのような通知を受け取るかを設定できます</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="new-comments" className="text-base">
                新しいコメント
              </Label>
              <Switch
                id="new-comments"
                checked={notifications.newComments}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, newComments: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="new-likes" className="text-base">
                いいね
              </Label>
              <Switch
                id="new-likes"
                checked={notifications.newLikes}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, newLikes: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="weekly-digest" className="text-base">
                週間まとめ
              </Label>
              <Switch
                id="weekly-digest"
                checked={notifications.weeklyDigest}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, weeklyDigest: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* プライバシー設定 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-serif text-primary">
              <Shield className="h-5 w-5" />
              プライバシー設定
            </CardTitle>
            <CardDescription>あなたの情報の公開範囲を設定できます</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="profile-public" className="text-base">
                  プロフィールを公開
                </Label>
                <p className="text-sm text-muted-foreground">
                  他のユーザーがあなたのプロフィールを見ることができます
                </p>
              </div>
              <Switch
                id="profile-public"
                checked={privacy.profilePublic}
                onCheckedChange={(checked) =>
                  setPrivacy({ ...privacy, profilePublic: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-email" className="text-base">
                  メールアドレスを表示
                </Label>
                <p className="text-sm text-muted-foreground">
                  プロフィールにメールアドレスを表示します
                </p>
              </div>
              <Switch
                id="show-email"
                checked={privacy.showEmail}
                onCheckedChange={(checked) =>
                  setPrivacy({ ...privacy, showEmail: checked })
                }
              />
            </div>
          </CardContent>
        </Card>
        {/* 表示設定 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-serif text-primary">
              <Palette className="h-5 w-5" />
              表示設定
            </CardTitle>
            <CardDescription>アプリの見た目を調整できます</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base">テーマ</Label>

              {/* ライト / ダーク / システム の三択に */}
              <div className="flex gap-2">
                <Button
                  variant={mounted && userTheme === "light" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("light")}
                >
                  ライト
                </Button>

                <Button
                  variant={mounted && userTheme === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                >
                  ダーク
                </Button>

                <Button
                  variant={mounted && userTheme === "system" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("system")}
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  システムに従う
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 通知 / ヘルプは既存ロジックのまま */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-serif text-primary">
              <HelpCircle className="h-5 w-5" />
              ヘルプ・サポート
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="ghost" className="w-full justify-start text-base h-12">
              よくある質問
            </Button>
            <Button variant="ghost" className="w-full justify-start text-base h-12">
              お問い合わせ
            </Button>
            <Button variant="ghost" className="w-full justify-start text-base h-12">
              利用規約
            </Button>
            <Button variant="ghost" className="w-full justify-start text-base h-12">
              プライバシーポリシー
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
