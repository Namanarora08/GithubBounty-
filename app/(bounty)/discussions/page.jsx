"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import RippleButton from "@/components/ripple-button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Smile, Hash, TrendingUp, MessageSquare, Users, Pin, Heart, Reply } from "lucide-react"

function Message({ message = {}, index = 0, onReply }) {
  const {
    id,
    user = { name: "user", avatar: "/placeholder.svg?height=64&width=64", level: 1 },
    text = "",
    time = "now",
    likes = 0,
    replies = [],
    isPinned = false,
    tags = [],
  } = message

  const [isLiked, setIsLiked] = useState(false)
  const [showReplies, setShowReplies] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`group rounded-lg border border-white/10 bg-[#161B22]/90 p-4 backdrop-blur-sm transition-all duration-300 hover:border-white/20 ${
        isPinned ? "ring-1 ring-[#1F6FEB]/30 bg-[#1F6FEB]/5" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-1 ring-white/10">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={`${user.name} avatar`} />
            <AvatarFallback className="bg-[#1F6FEB]/20 text-[#1F6FEB] text-sm font-semibold">
              {user.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-white">{user.name}</p>
              <Badge variant="secondary" className="bg-[#1F6FEB]/20 text-[#89B5FF] text-xs px-2 py-0.5">
                Level {user.level}
              </Badge>
              {isPinned && <Pin className="h-4 w-4 text-[#1F6FEB]" />}
            </div>
            <p className="text-xs text-[#8B949E]">{time}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-3">
        <p className="text-[#C9D1D9] leading-relaxed mb-2">{text}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-[#1F6FEB]/30 text-[#89B5FF] text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`flex items-center gap-1 text-sm transition-colors duration-200 ${
              isLiked ? "text-red-400" : "text-[#8B949E] hover:text-red-400"
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            <span>{likes + (isLiked ? 1 : 0)}</span>
          </button>
          <button
            onClick={() => onReply?.(message)}
            className="flex items-center gap-1 text-sm text-[#8B949E] hover:text-[#1F6FEB] transition-colors duration-200"
          >
            <Reply className="h-4 w-4" />
            <span>Reply</span>
          </button>
          {replies.length > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-1 text-sm text-[#8B949E] hover:text-white transition-colors duration-200"
            >
              <MessageSquare className="h-4 w-4" />
              <span>{replies.length} replies</span>
            </button>
          )}
        </div>
      </div>

      {/* Replies */}
      <AnimatePresence>
        {showReplies && replies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-3 border-l-2 border-[#1F6FEB]/30 pl-4"
          >
            {replies.map((reply, i) => (
              <div key={i} className="flex items-start gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={reply.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-[#1F6FEB]/20 text-[#1F6FEB] text-xs">
                    {reply.user.name.substring(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-white">{reply.user.name}</span>
                    <span className="text-xs text-[#8B949E]">{reply.time}</span>
                  </div>
                  <p className="text-sm text-[#C9D1D9]">{reply.text}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function TopicCard({ topic, isActive, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`cursor-pointer rounded-lg border p-4 transition-all duration-300 ${
        isActive ? "border-[#1F6FEB]/50 bg-[#1F6FEB]/10" : "border-white/10 bg-[#161B22]/90 hover:border-white/20"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Hash className="h-4 w-4 text-[#1F6FEB]" />
          <h3 className="font-semibold text-white">{topic.name}</h3>
        </div>
        <Badge variant="secondary" className="bg-white/10 text-[#C9D1D9] text-xs">
          {topic.messageCount}
        </Badge>
      </div>
      <p className="text-sm text-[#8B949E] mb-2">{topic.description}</p>
      <div className="flex items-center gap-4 text-xs text-[#8B949E]">
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span>{topic.activeUsers} active</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare className="h-3 w-3" />
          <span>{topic.todayMessages} today</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function DiscussionsPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: { name: "alice_dev", avatar: "/placeholder.svg?height=64&width=64", level: 8 },
      text: "Has anyone worked with the new React Server Components? I'm trying to implement them in a bounty project and running into some hydration issues.",
      time: "2 minutes ago",
      likes: 12,
      isPinned: true,
      tags: ["react", "server-components"],
      replies: [
        {
          user: { name: "bob_expert", avatar: "/placeholder.svg?height=64&width=64" },
          text: "I've been using them extensively. What specific hydration issues are you seeing?",
          time: "1 minute ago",
        },
      ],
    },
    {
      id: 2,
      user: { name: "code_ninja", avatar: "/placeholder.svg?height=64&width=64", level: 12 },
      text: "Just completed my 50th bounty! 🎉 The key is to focus on understanding the problem deeply before jumping into code. Thanks to this community for all the help!",
      time: "15 minutes ago",
      likes: 28,
      tags: ["milestone", "tips"],
      replies: [],
    },
    {
      id: 3,
      user: { name: "performance_guru", avatar: "/placeholder.svg?height=64&width=64", level: 15 },
      text: "Pro tip: When optimizing algorithms for bounties, always benchmark with realistic data sizes. I see too many solutions that work great with small test cases but fail in production.",
      time: "1 hour ago",
      likes: 45,
      tags: ["performance", "algorithms", "tips"],
      replies: [
        {
          user: { name: "newbie_dev", avatar: "/placeholder.svg?height=64&width=64" },
          text: "What tools do you recommend for benchmarking?",
          time: "45 minutes ago",
        },
        {
          user: { name: "performance_guru", avatar: "/placeholder.svg?height=64&width=64" },
          text: "For JavaScript, I use Benchmark.js. For other languages, check out hyperfine for CLI tools.",
          time: "30 minutes ago",
        },
      ],
    },
    {
      id: 4,
      user: { name: "ui_wizard", avatar: "/placeholder.svg?height=64&width=64", level: 9 },
      text: "Looking for collaborators on a design system bounty. Need someone with Figma skills and component library experience. DM me if interested!",
      time: "2 hours ago",
      likes: 8,
      tags: ["collaboration", "design-system", "figma"],
      replies: [],
    },
  ])

  const [topics] = useState([
    {
      id: "general",
      name: "General Discussion",
      description: "General chat about bounties, coding, and community",
      messageCount: 1247,
      activeUsers: 89,
      todayMessages: 156,
    },
    {
      id: "help",
      name: "Help & Support",
      description: "Get help with bounties, technical issues, and platform questions",
      messageCount: 892,
      activeUsers: 45,
      todayMessages: 73,
    },
    {
      id: "showcase",
      name: "Showcase",
      description: "Share your completed bounties and get feedback",
      messageCount: 634,
      activeUsers: 32,
      todayMessages: 28,
    },
    {
      id: "jobs",
      name: "Job Board",
      description: "Job opportunities and freelance work discussions",
      messageCount: 445,
      activeUsers: 28,
      todayMessages: 19,
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("general")
  const [replyingTo, setReplyingTo] = useState(null)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: messages.length + 1,
      user: { name: "You", avatar: "/placeholder.svg?height=64&width=64", level: 5 },
      text: newMessage,
      time: "Just now",
      likes: 0,
      tags: [],
      replies: [],
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
    setReplyingTo(null)
  }

  const handleReply = (message) => {
    setReplyingTo(message)
    setNewMessage(`@${message.user.name} `)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const trendingTopics = ["react", "performance", "algorithms", "design-system", "nodejs", "typescript"]

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white md:text-4xl mb-2">Community Discussions</h1>
          <p className="text-lg text-[#8B949E]">Connect with fellow developers, share knowledge, and get help</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Topics */}
            <Card className="border-white/10 bg-[#161B22]/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Hash className="h-5 w-5 text-[#1F6FEB]" />
                  Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {topics.map((topic) => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    isActive={selectedTopic === topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                  />
                ))}
              </CardContent>
            </Card>

            {/* Trending Tags */}
            <Card className="border-white/10 bg-[#161B22]/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#1F6FEB]" />
                  Trending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {trendingTopics.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-[#1F6FEB]/30 text-[#89B5FF] hover:bg-[#1F6FEB]/20 cursor-pointer transition-colors duration-200"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Online Users */}
            <Card className="border-white/10 bg-[#161B22]/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#1F6FEB]" />
                  Online Now
                  <Badge className="bg-green-500/20 text-green-400 ml-auto">247</Badge>
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="flex flex-col h-[calc(100vh-12rem)]">
            {/* Current Topic Header */}
            <div className="mb-4 rounded-lg border border-white/10 bg-[#161B22]/90 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Hash className="h-5 w-5 text-[#1F6FEB]" />
                  <h2 className="text-xl font-semibold text-white">
                    {topics.find((t) => t.id === selectedTopic)?.name}
                  </h2>
                  <Badge className="bg-green-500/20 text-green-400">
                    {topics.find((t) => t.id === selectedTopic)?.activeUsers} online
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-[#8B949E] mt-1">{topics.find((t) => t.id === selectedTopic)?.description}</p>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto rounded-lg border border-white/10 bg-[#0D1117]/50 p-4 backdrop-blur-sm">
              {messages.map((message, index) => (
                <Message key={message.id} message={message} index={index} onReply={handleReply} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="mt-4">
              {replyingTo && (
                <div className="mb-2 rounded-lg bg-[#1F6FEB]/10 p-2 text-sm">
                  <span className="text-[#8B949E]">Replying to </span>
                  <span className="text-[#1F6FEB]">{replyingTo.user.name}</span>
                  <button onClick={() => setReplyingTo(null)} className="ml-2 text-[#8B949E] hover:text-white">
                    ×
                  </button>
                </div>
              )}
              <form
                className="flex gap-3"
                onSubmit={(e) => {
                  e.preventDefault()
                  sendMessage()
                }}
              >
                <div className="flex-1 relative">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Message #${topics
                      .find((t) => t.id === selectedTopic)
                      ?.name.toLowerCase()
                      .replace(" ", "-")}...`}
                    className="pr-12 bg-white/5 border-white/10 text-[#C9D1D9] placeholder:text-[#8B949E] focus:border-[#1F6FEB]/50 focus:ring-[#1F6FEB]/20"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-[#8B949E] hover:text-white"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <RippleButton
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-[#1F6FEB] text-white hover:bg-[#2270ff] disabled:opacity-50 disabled:cursor-not-allowed px-4"
                >
                  <Send className="h-4 w-4" />
                </RippleButton>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
