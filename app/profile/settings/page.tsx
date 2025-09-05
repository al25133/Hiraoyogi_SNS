"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Bell, Shield, Palette, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    newComments: true,
    newLikes: true,
    newFollowers: false,
    weeklyDigest: true,
  })

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEmail: false,
    allowMessages: true,
  })

  const { theme, setTheme } = useTheme()
  const [tempTheme, setTempTheme] = useState(theme || "light")

  const handleSave = () => {
    setTheme(tempTheme)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ヘッダー */}
      <header className="bg-card border-b">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                プロフィールに戻る
              </Button>
            </Link>
            <h1 className="text-2xl font-serif text-primary">設定</h1>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
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
                onCheckedChange={(checked) => setNotifications({ ...notifications, newComments: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="new-likes" className="text-base">
                いいね
              </Label>
              <Switch
                id="new-likes"
                checked={notifications.newLikes}
                onCheckedChange={(checked) => setNotifications({ ...notifications, newLikes: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="weekly-digest" className="text-base">
                週間まとめ
              </Label>
              <Switch
                id="weekly-digest"
                checked={notifications.weeklyDigest}
                onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyDigest: checked })}
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
                <p className="text-sm text-muted-foreground">他のユーザーがあなたのプロフィールを見ることができます</p>
              </div>
              <Switch
                id="profile-public"
                checked={privacy.profilePublic}
                onCheckedChange={(checked) => setPrivacy({ ...privacy, profilePublic: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-email" className="text-base">
                  メールアドレスを表示
                </Label>
                <p className="text-sm text-muted-foreground">プロフィールにメールアドレスを表示します</p>
              </div>
              <Switch
                id="show-email"
                checked={privacy.showEmail}
                onCheckedChange={(checked) => setPrivacy({ ...privacy, showEmail: checked })}
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
              <Label className="text-base">文字サイズ</Label>
              <Button variant="outline" size="sm">
                標準
              </Button>
            </div>
             <div className="flex items-center justify-between">
            <Label className="text-base">テーマ</Label>
            <div className="flex gap-2">
              <Button
                variant={tempTheme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => setTempTheme("light")}
              >
                ライト
              </Button>
              <Button
                variant={tempTheme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => setTempTheme("dark")}
              >
                ダーク
              </Button>
            </div>
          </div>
          </CardContent>
        </Card>

        {/* ヘルプ・サポート */}
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

        {/* 保存ボタン */}
        <div className="flex justify-end">
          <Button className="text-base">設定を保存</Button>
        </div>
      </main>
    </div>
  )
}
