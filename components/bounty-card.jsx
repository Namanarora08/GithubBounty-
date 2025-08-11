"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarClock, Coins, TrendingUp, Clock, Star } from "lucide-react"

export default function BountyCard({ bounty = {}, className = "" }) {
  const {
    id = "1",
    title = "Improve repository performance on large file trees",
    description = "Optimize traversal and caching to reduce cold-start times and speed up directory queries.",
    tags = ["performance", "nodejs", "cache"],
    reward = 300,
    deadline = "Sep 30, 2025",
    difficulty = "Intermediate",
    status = "Open"
  } = bounty

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case "Beginner": return <Star className="h-4 w-4 text-green-400" />
      case "Intermediate": return <TrendingUp className="h-4 w-4 text-yellow-400" />
      case "Advanced": return <TrendingUp className="h-4 w-4 text-orange-400" />
      case "Expert": return <TrendingUp className="h-4 w-4 text-red-400" />
      default: return <Star className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Open": return "text-green-400"
      case "In Progress": return "text-yellow-400"
      case "Completed": return "text-blue-400"
      default: return "text-gray-400"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{
        y: -8,
        scale: 1.01,
        transition: { type: "spring", stiffness: 400, damping: 30 },
      }}
      className={`h-[320px] w-full ${className}`}
    >
      <Card className="group h-full flex flex-col border border-white/10 bg-gradient-to-br from-[#1a1f2e]/95 to-[#161B22]/95 backdrop-blur-sm shadow-lg shadow-black/20 transition-all duration-300 hover:border-[#2563eb]/40 hover:shadow-2xl hover:shadow-[#2563eb]/10 relative overflow-hidden">
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 h-full flex flex-col">
          <CardHeader className="pb-4 flex-shrink-0">
            {/* Status and Difficulty Row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {getDifficultyIcon(difficulty)}
                <span className="text-xs font-medium text-gray-300">{difficulty}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${status === 'Open' ? 'bg-green-400' : status === 'In Progress' ? 'bg-yellow-400' : 'bg-blue-400'}`} />
                <span className={`text-xs font-medium ${getStatusColor(status)}`}>{status}</span>
              </div>
            </div>
            
            <CardTitle className="text-white leading-tight text-lg">
              <Link
                href={`/bounty/${id}`}
                className="line-clamp-2 transition-colors duration-200 hover:text-[#2563eb] group-hover:text-[#3b82f6]"
              >
                {title}
              </Link>
            </CardTitle>
            
            <div className="mt-4 flex flex-wrap gap-2 min-h-[32px]">
              {tags.slice(0, 3).map((tag, index) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-white/10 text-[#C9D1D9] text-xs px-2.5 py-1 hover:bg-[#2563eb]/20 hover:text-[#93c5fd] transition-all duration-200 hover:scale-105"
                >
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="secondary" className="bg-white/10 text-[#C9D1D9] text-xs px-2.5 py-1">
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="flex-1 pb-4">
            <p className="text-sm text-[#8B949E] line-clamp-3 leading-relaxed group-hover:text-[#C9D1D9] transition-colors duration-300 font-medium">
              {description}
            </p>
          </CardContent>

          <CardFooter className="pt-4 flex-shrink-0 flex items-center justify-between text-sm border-t border-white/10 group-hover:border-[#2563eb]/30 transition-colors duration-300">
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Coins className="h-4 w-4 text-[#2563eb]" />
              </motion.div>
              <span className="font-bold text-white text-base">{reward}</span>
              <span className="group-hover:text-[#C9D1D9] transition-colors duration-300">pts</span>
            </div>
            <div className="flex items-center gap-2 text-[#8B949E] group-hover:text-[#C9D1D9] transition-colors duration-300">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Clock className="h-4 w-4 text-[#2563eb]" />
              </motion.div>
              <span className="text-xs font-medium">{deadline}</span>
            </div>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  )
}
