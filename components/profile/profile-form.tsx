"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Camera, Save } from "lucide-react"

interface UserProfile {
  name: string
  email: string
  type: "grandparent" | "grandchild"
  avatar?: string
  bio: string
  birthYear: string
  location: string
  interests: string[]
}

interface ProfileFormProps {
  profile: UserProfile
  onSave?: (profile: UserProfile) => void
}

const availableInterests = [
  { id: "childhood", label: "子供時代" },
  { id: "work", label: "仕事・職業" },
  { id: "family", label: "家族・結婚" },
  { id: "culture", label: "文化・伝統" },
  { id: "food", label: "料理・食べ物" },
  { id: "festival", label: "祭り・行事" },
  { id: "technology", label: "技術・道具" },
  { id: "other", label: "その他" },
]

export function ProfileForm({ profile, onSave }: ProfileFormProps) {
  const [formData, setFormData] = useState<UserProfile>(profile)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    onSave?.(formData)
    setIsEditing(false)
  }

  const handleInterestChange = (interestId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interests: checked ? [...prev.interests, interestId] : prev.interests.filter((id) => id !== interestId),
    }))
  }

  const getTypeLabel = (type: string) => {
    return type === "grandparent" ? "おじいちゃん・おばあちゃん" : "お孫さん・若い方"
  }

  const getInterestLabel = (interestId: string) => {
    return availableInterests.find((interest) => interest.id === interestId)?.label || interestId
  }

  return (
    <div className="space-y-6">
      {/* プロフィール基本情報 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-serif text-primary">基本情報</CardTitle>
          <CardDescription>あなたのプロフィール情報を管理できます</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* アバター */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={formData.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl">{formData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button variant="outline" className="gap-2 bg-transparent">
                <Camera className="h-4 w-4" />
                写真を変更
              </Button>
            )}
          </div>

          {/* 基本情報フォーム */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-medium">
                お名前
              </Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="text-base h-12"
                />
              ) : (
                <p className="text-base py-3">{formData.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium">
                メールアドレス
              </Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="text-base h-12"
                />
              ) : (
                <p className="text-base py-3">{formData.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium">世代</Label>
              {isEditing ? (
                <RadioGroup
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value as "grandparent" | "grandchild" })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="grandparent" id="grandparent" />
                    <Label htmlFor="grandparent" className="text-base">
                      おじいちゃん・おばあちゃん
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="grandchild" id="grandchild" />
                    <Label htmlFor="grandchild" className="text-base">
                      お孫さん・若い方
                    </Label>
                  </div>
                </RadioGroup>
              ) : (
                <div className="py-3">
                  <Badge variant={formData.type === "grandparent" ? "default" : "secondary"}>
                    {getTypeLabel(formData.type)}
                  </Badge>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthYear" className="text-base font-medium">
                生まれ年
              </Label>
              {isEditing ? (
                <Input
                  id="birthYear"
                  value={formData.birthYear}
                  onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                  placeholder="例：1950"
                  className="text-base h-12"
                />
              ) : (
                <p className="text-base py-3">{formData.birthYear}年生まれ</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="location" className="text-base font-medium">
                お住まいの地域
              </Label>
              {isEditing ? (
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="例：東京都"
                  className="text-base h-12"
                />
              ) : (
                <p className="text-base py-3">{formData.location}</p>
              )}
            </div>
          </div>

          {/* 自己紹介 */}
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-base font-medium">
              自己紹介
            </Label>
            {isEditing ? (
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="あなたについて教えてください..."
                className="min-h-[100px] text-base leading-relaxed"
                maxLength={300}
              />
            ) : (
              <p className="text-base leading-relaxed py-3 whitespace-pre-wrap">
                {formData.bio || "自己紹介が設定されていません"}
              </p>
            )}
          </div>

          {/* 編集ボタン */}
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" />
                  保存
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  キャンセル
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                編集
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 興味のあるカテゴリー */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-serif text-primary">興味のあるカテゴリー</CardTitle>
          <CardDescription>
            {formData.type === "grandparent"
              ? "どのような昔話を投稿したいですか？"
              : "どのような昔話に興味がありますか？"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableInterests.map((interest) => (
                <div key={interest.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest.id}
                    checked={formData.interests.includes(interest.id)}
                    onCheckedChange={(checked) => handleInterestChange(interest.id, checked as boolean)}
                  />
                  <Label htmlFor={interest.id} className="text-base cursor-pointer">
                    {interest.label}
                  </Label>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {formData.interests.length > 0 ? (
                formData.interests.map((interestId) => (
                  <Badge key={interestId} variant="secondary">
                    {getInterestLabel(interestId)}
                  </Badge>
                ))
              ) : (
                <p className="text-muted-foreground">興味のあるカテゴリーが設定されていません</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
