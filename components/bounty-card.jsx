"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarClock, Coins } from "lucide-react"

export default function BountyCard({ bounty = {}, className = "" }) {
  const {
    id = "1",
    title = "Improve repository performance on large file trees",
    description = "Optimize traversal and caching to reduce cold-start times and speed up directory queries.",
    tags = ["performance", "nodejs", "cache"],
    reward = 300,
    deadline = "Sep 30, 2025",
  } = bounty

  return (
    <motion.div
      whileHover={{
        y: -12,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 25 },
      }}
      className={`h-80 ${className}`}
    >
      <Card className="group h-full flex flex-col border border-white/10 bg-[#161B22]/95 backdrop-blur-sm shadow-lg shadow-black/10 transition-all duration-300 hover:border-[#1F6FEB]/30 hover:shadow-xl hover:shadow-black/20 relative overflow-hidden">
        <div className="relative z-10 h-full flex flex-col">
          <CardHeader className="pb-3 flex-shrink-0">
            <CardTitle className="text-white leading-tight">
              <Link
                href={`/bounty/${id}`}
                className="line-clamp-2 transition-colors duration-200 hover:text-[#1F6FEB] group-hover:text-[#4A90E2]"
              >
                {title}
              </Link>
            </CardTitle>
            <div className="mt-3 flex flex-wrap gap-1.5 min-h-[28px]">
              {tags.slice(0, 3).map((tag, index) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-white/10 text-[#C9D1D9] text-xs px-2 py-0.5 hover:bg-[#1F6FEB]/20 hover:text-[#89B5FF] transition-colors duration-200"
                >
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="secondary" className="bg-white/10 text-[#C9D1D9] text-xs px-2 py-0.5">
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent className="flex-1 pb-3">
            <p className="text-sm text-[#8B949E] line-clamp-3 leading-relaxed group-hover:text-[#C9D1D9] transition-colors duration-300">
              {description}
            </p>
          </CardContent>

          <CardFooter className="pt-3 flex-shrink-0 flex items-center justify-between text-sm border-t border-white/10 group-hover:border-[#1F6FEB]/20 transition-colors duration-300">
            <div className="flex items-center gap-2 text-[#8B949E]">
              <Coins className="h-4 w-4 text-[#1F6FEB]" />
              <span className="font-semibold text-white">{reward}</span>
              <span className="group-hover:text-[#C9D1D9] transition-colors duration-300">pts</span>
            </div>
            <div className="flex items-center gap-2 text-[#8B949E] group-hover:text-[#C9D1D9] transition-colors duration-300">
              <CalendarClock className="h-4 w-4 text-[#1F6FEB]" />
              <span className="text-xs">{deadline}</span>
            </div>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  )
}
