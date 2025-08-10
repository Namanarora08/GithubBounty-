"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Sparkles, Heart } from "lucide-react"

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="border-t border-white/10 bg-gradient-to-br from-[#0C1018]/90 via-[#0D1117]/95 to-[#161B22]/90 backdrop-blur-sm relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-[#1F6FEB]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#1F6FEB]/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 md:grid-cols-4">
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-3">
            <motion.div
              className="rounded-lg bg-gradient-to-br from-[#1F6FEB] to-[#4A90E2] p-2 shadow-lg shadow-[#1F6FEB]/25"
              whileHover={{
                scale: 1.1,
                rotate: 5,
                boxShadow: "0 0 20px rgba(31, 111, 235, 0.4)",
              }}
            >
              <Github className="h-5 w-5 text-white" />
            </motion.div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-white to-[#89B5FF] bg-clip-text text-transparent">
              Bounty Platform
            </h3>
            <Sparkles className="h-4 w-4 text-[#1F6FEB]" />
          </div>
          <p className="text-[#8B949E] leading-relaxed max-w-md">
            Connecting developers with meaningful open-source contributions. Build your reputation while making a real
            impact.
          </p>
          <div className="flex items-center gap-2 text-sm text-[#8B949E]">
            <span>Made with</span>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}>
              <Heart className="h-4 w-4 text-red-400" />
            </motion.div>
            <span>by the community</span>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold bg-gradient-to-r from-white to-[#C9D1D9] bg-clip-text text-transparent">
            Platform
          </h4>
          <div className="flex flex-col gap-3 text-sm text-[#8B949E]">
            <Link
              href="/explore"
              className="hover:text-[#1F6FEB] transition-all duration-300 hover:translate-x-1 flex items-center gap-2"
            >
              <Sparkles className="h-3 w-3" />
              Explore Bounties
            </Link>
            <Link
              href="/leaderboard"
              className="hover:text-[#4A90E2] transition-all duration-300 hover:translate-x-1 flex items-center gap-2"
            >
              <Sparkles className="h-3 w-3" />
              Leaderboard
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-[#6CB6FF] transition-all duration-300 hover:translate-x-1 flex items-center gap-2"
            >
              <Sparkles className="h-3 w-3" />
              Dashboard
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold bg-gradient-to-r from-white to-[#C9D1D9] bg-clip-text text-transparent">
            Built With
          </h4>
          <div className="space-y-2 text-xs text-[#8B949E] leading-relaxed">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1F6FEB]"></span>
              Next.js & React
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4A90E2]"></span>
              Tailwind CSS
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6CB6FF]"></span>
              Framer Motion
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#89B5FF]"></span>
              shadcn/ui
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
