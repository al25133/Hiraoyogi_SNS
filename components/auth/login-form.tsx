"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function LoginForm() {
  const [userType, setUserType] = useState<"grandparent" | "grandchild">("grandparent")
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-serif text-primary">StarRe: -未来つなぎ-</CardTitle>
          <CardDescription className="text-base">昔話を通じて世代をつなぐSNS</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={isLogin ? "login" : "register"} onValueChange={(value) => setIsLogin(value === "login")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">ログイン</TabsTrigger>
              <TabsTrigger value="register">新規登録</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base">
                  メールアドレス
                </Label>
                <Input id="email" type="email" placeholder="example@email.com" className="text-base h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-base">
                  パスワード
                </Label>
                <Input id="password" type="password" className="text-base h-12" />
              </div>
              <Button className="w-full h-12 text-base">ログイン</Button>
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <div className="space-y-3">
                <Label className="text-base font-medium">あなたの立場を選んでください</Label>
                <RadioGroup
                  value={userType}
                  onValueChange={(value) => setUserType(value as "grandparent" | "grandchild")}
                >
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="grandparent" id="grandparent" />
                    <Label htmlFor="grandparent" className="text-base cursor-pointer flex-1">
                      <div className="font-medium">おじいちゃん・おばあちゃん</div>
                      <div className="text-sm text-muted-foreground">昔話や経験を共有したい</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="grandchild" id="grandchild" />
                    <Label htmlFor="grandchild" className="text-base cursor-pointer flex-1">
                      <div className="font-medium">お孫さん・若い方</div>
                      <div className="text-sm text-muted-foreground">昔話を聞いて学びたい</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-base">
                  お名前
                </Label>
                <Input id="name" placeholder="田中太郎" className="text-base h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-register" className="text-base">
                  メールアドレス
                </Label>
                <Input id="email-register" type="email" placeholder="example@email.com" className="text-base h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-register" className="text-base">
                  パスワード
                </Label>
                <Input id="password-register" type="password" className="text-base h-12" />
              </div>
              <Button className="w-full h-12 text-base">アカウント作成</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
