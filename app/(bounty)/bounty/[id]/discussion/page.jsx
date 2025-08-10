"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import RippleButton from "@/components/ripple-button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Send, Smile } from "lucide-react"

function Message({ message = {}, index = 0 }) {
  const {
    me = false,
    text = "",
    time = "now",
    user = { name: "me", avatar: "/placeholder.svg?height=64&width=64" },
  } = message

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`flex items-end gap-3 ${me ? "justify-end" : "justify-start"}`}
    >
      {!me && (
        <Avatar className="h-8 w-8 ring-1 ring-white/10">
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={`${user.name} avatar`} />
          <AvatarFallback className="bg-[#1F6FEB]/20 text-[#1F6FEB] text-xs">
            {(user.name || "U").substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-lg ${
          me ? "bg-[#1F6FEB] text-white rounded-br-md" : "bg-white/10 text-[#C9D1D9] rounded-bl-md"
        }`}
      >
        {!me && <p className="text-xs font-medium text-[#8B949E] mb-1">{user.name}</p>}
        <p className="text-sm leading-relaxed">{text}</p>
        <p className={`mt-2 text-xs ${me ? "text-white/80" : "text-[#8B949E]"}`}>{time}</p>
      </div>

      {me && (
        <Avatar className="h-8 w-8 ring-1 ring-white/10">
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt="Your avatar" />
          <AvatarFallback className="bg-[#1F6FEB]/20 text-[#1F6FEB] text-xs">ME</AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  )
}

export default function DiscussionPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      me: false,
      text: "Hey everyone! I've been looking into this performance issue and I think I have a good approach. Has anyone started working on this yet?",
      time: "10:12 AM",
      user: { name: "alice_dev", avatar: "/placeholder.svg?height=64&width=64" },
    },
    {
      id: 2,
      me: true,
      text: "Hi Alice! I was just about to start. Would love to collaborate or at least coordinate our efforts.",
      time: "10:15 AM",
      user: { name: "me", avatar: "/placeholder.svg?height=64&width=64" },
    },
    {
      id: 3,
      me: false,
      text: "Perfect! I was thinking we could implement a caching layer with Redis. What do you think about that approach?",
      time: "10:16 AM",
      user: { name: "alice_dev", avatar: "/placeholder.svg?height=64&width=64" },
    },
    {
      id: 4,
      me: false,
      text: "That sounds like a solid approach. Make sure to benchmark before and after to show the performance improvements.",
      time: "10:18 AM",
      user: { name: "bob_maintainer", avatar: "/placeholder.svg?height=64&width=64" },
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

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
      me: true,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      user: { name: "me", avatar: "/placeholder.svg?height=64&width=64" },
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate typing indicator
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      // Simulate response
      if (Math.random() > 0.5) {
        const responses = [
          "Great point! Let me look into that.",
          "I agree with that approach.",
          "Thanks for the clarification!",
          "That makes sense. I'll update my implementation.",
        ]
        const response = {
          id: messages.length + 2,
          me: false,
          text: responses[Math.floor(Math.random() * responses.length)],
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          user: { name: "alice_dev", avatar: "/placeholder.svg?height=64&width=64" },
        }
        setMessages((prev) => [...prev, response])
      }
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] w-full max-w-4xl flex-col px-6 py-6">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center justify-between border-b border-white/10 pb-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Discussion Room</h1>
          <p className="text-[#8B949E]">Collaborate with other contributors</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#8B949E]">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span>4 active participants</span>
        </div>
      </motion.header>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto rounded-xl border border-white/10 bg-[#161B22]/90 p-6 backdrop-blur-sm shadow-inner">
        <AnimatePresence>
          {messages.map((message, index) => (
            <Message key={message.id} message={message} index={index} />
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3"
            >
              <Avatar className="h-8 w-8 ring-1 ring-white/10">
                <AvatarImage src="/placeholder.svg?height=64&width=64" />
                <AvatarFallback className="bg-[#1F6FEB]/20 text-[#1F6FEB] text-xs">AD</AvatarFallback>
              </Avatar>
              <div className="rounded-2xl rounded-bl-md bg-white/10 px-4 py-3">
                <div className="flex space-x-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                    className="h-2 w-2 rounded-full bg-[#8B949E]"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                    className="h-2 w-2 rounded-full bg-[#8B949E]"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                    className="h-2 w-2 rounded-full bg-[#8B949E]"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 flex gap-3"
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage()
        }}
      >
        <div className="flex-1 relative">
          <Input
            ref={inputRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
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
      </motion.form>
    </div>
  )
}
