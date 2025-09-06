"use client"

import { Button } from "@/components/ui/button"
import { Home, PlusCircle, User, Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/feed",
      icon: Home,
      label: "ホーム",
      active: pathname === "/feed",
    },
    {
      href: "/post",
      icon: PlusCircle,
      label: "語る",
      active: pathname === "/post",
    },
    {
      href: "/profile",
      icon: User,
      label: "プロフィール",
      active: pathname === "/profile",
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t z-50 md:hidden">
      <div className="flex items-center justify-around p-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={item.active ? "default" : "ghost"}
                size="lg"
                className={`flex flex-col gap-1 h-auto py-2 px-3 ${
                  item.active ? "text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
