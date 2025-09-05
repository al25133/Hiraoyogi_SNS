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
  const { theme, setTheme } = useTheme()

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
              <div className="flex gap-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("light")}
                >
                  ライト
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                >
                  ダーク
                </Button>
              </div>
            </div>
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
