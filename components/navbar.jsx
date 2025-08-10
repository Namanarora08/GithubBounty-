"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, ChevronDown, Github, LogOut, Settings, User2, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"
import GlassDropdown from "@/components/glass-dropdown"

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/explore", label: "Explore" },
  { href: "/discussions", label: "Discussions" },
  { href: "/leaderboard", label: "Leaderboard" },
]

function NavLink({ href = "#", label = "", active = false }) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
        active ? "text-white bg-[#1F6FEB] shadow-sm" : "text-[#C9D1D9] hover:text-white hover:bg-white/10"
      }`}
    >
      {label}
    </Link>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const [openNotif, setOpenNotif] = React.useState(false)
  const [openUser, setOpenUser] = React.useState(false)

  const notifications = [
    { id: 1, text: "You were mentioned in a discussion.", time: "2m ago" },
    { id: 2, text: "New bounty matches your tag: performance", time: "15m ago" },
    { id: 3, text: "Your submission was approved!", time: "1h ago" },
    { id: 4, text: "New comment on your bounty.", time: "3h ago" },
    { id: 5, text: "Weekly summary is ready.", time: "1d ago" },
  ]

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
        delay: 0.1,
      }}
      className="sticky top-0 z-50 border-b border-white/10 bg-[#0D1117]/90 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0D1117]/70 shadow-lg shadow-black/5"
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <motion.div
            className="rounded-lg bg-[#1F6FEB] p-2.5 shadow-sm"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(31, 111, 235, 0.3)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Github className="h-5 w-5 text-white" />
          </motion.div>
          <span className="text-base font-semibold text-white">GitHub Bounty</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} active={pathname.startsWith(link.href)} />
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <DropdownMenu open={openNotif} onOpenChange={setOpenNotif}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10 text-[#C9D1D9] hover:text-white hover:bg-white/10 transition-all duration-300 rounded-lg"
              >
                <Bell className="h-5 w-5" />
                <motion.span
                  className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#1F6FEB]"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <GlassDropdown open={openNotif} onOpenChange={setOpenNotif} className="w-80">
              <DropdownMenuLabel className="text-[#C9D1D9] font-semibold">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <ScrollArea className="h-64">
                <div className="space-y-1 p-1">
                  {notifications.map((notif, index) => (
                    <motion.div
                      key={notif.id}
                      className="rounded-md p-3 transition-all duration-300 hover:bg-white/10 cursor-pointer"
                      whileHover={{ x: 4, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <p className="text-sm text-[#C9D1D9]">{notif.text}</p>
                      <p className="mt-1 text-xs text-[#8B949E]">{notif.time}</p>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </GlassDropdown>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu open={openUser} onOpenChange={setOpenUser}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-3 py-2 text-[#C9D1D9] hover:text-white hover:bg-white/10 transition-all duration-300 rounded-lg"
              >
                <Avatar className="h-8 w-8 ring-1 ring-white/10">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback className="bg-[#1F6FEB] text-white text-xs font-bold">JD</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <GlassDropdown open={openUser} onOpenChange={setOpenUser} className="w-56">
              <DropdownMenuLabel className="text-[#C9D1D9] font-semibold">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem asChild className="text-[#C9D1D9] focus:bg-white/10">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <User2 className="h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="text-[#C9D1D9] focus:bg-white/10">
                <Link href="/discussions" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Discussions
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="text-[#C9D1D9] focus:bg-white/10">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="text-red-400 focus:bg-red-500/10 focus:text-red-300">
                <LogOut className="h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </GlassDropdown>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="block border-t border-white/10 md:hidden">
        <nav className="mx-auto flex max-w-7xl items-center justify-center gap-1 px-4 py-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${
                pathname.startsWith(link.href)
                  ? "text-white bg-[#1F6FEB] shadow-sm"
                  : "text-[#C9D1D9] hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}
