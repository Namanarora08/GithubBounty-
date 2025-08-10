"use client"

import Link from "next/link"
import { useMemo } from "react"
import { motion } from "framer-motion"
import { sampleBounties } from "@/lib/data"
import RippleButton from "@/components/ripple-button"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import BountyCard from "@/components/bounty-card"
import { CalendarClock, Coins, GitBranch, User2, Star } from "lucide-react"
import { Stagger, StaggerItem } from "@/components/section"

export default function BountyDetailsPage({ params }) {
  const id = params?.id || "1"
  const bounty = useMemo(() => sampleBounties.find((b) => b.id === id) || sampleBounties[0], [id])
  const related = sampleBounties.filter((b) => b.id !== id).slice(0, 4)

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Main Content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="rounded-xl border border-white/10 bg-[#161B22]/90 backdrop-blur-sm p-8 shadow-lg shadow-black/10">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white leading-tight mb-4 lg:text-3xl">{bounty.title}</h1>
                <div className="flex flex-wrap gap-2">
                  {bounty.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-white/10 text-[#C9D1D9] hover:bg-[#1F6FEB]/20 hover:text-[#89B5FF] transition-colors duration-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <RippleButton className="bg-[#1F6FEB] text-white hover:bg-[#2270ff]">Apply for Bounty</RippleButton>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/20 bg-transparent text-[#C9D1D9] hover:bg-white/10 hover:text-white"
                >
                  <Link href={`/bounty/${id}/discussion`}>Join Discussion</Link>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                <Coins className="h-5 w-5 text-[#1F6FEB]" />
                <div>
                  <p className="text-2xl font-bold text-white">{bounty.reward}</p>
                  <p className="text-sm text-[#8B949E]">Points</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                <CalendarClock className="h-5 w-5 text-[#1F6FEB]" />
                <div>
                  <p className="text-sm font-semibold text-white">{bounty.deadline}</p>
                  <p className="text-sm text-[#8B949E]">Deadline</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                <User2 className="h-5 w-5 text-[#1F6FEB]" />
                <div>
                  <p className="text-sm font-semibold text-white">{bounty.author?.name}</p>
                  <p className="text-sm text-[#8B949E]">Author</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                <Star className="h-5 w-5 text-[#1F6FEB]" />
                <div>
                  <p className="text-sm font-semibold text-white">4.8/5</p>
                  <p className="text-sm text-[#8B949E]">Rating</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-invert max-w-none mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Description</h2>
              <p className="text-[#C9D1D9] leading-relaxed mb-4">
                {bounty.description} This bounty requires a comprehensive understanding of the codebase and modern
                development practices. Please ensure your solution includes proper testing, documentation, and follows
                the project's coding standards.
              </p>

              <h3 className="text-lg font-semibold text-white mb-3">Acceptance Criteria</h3>
              <ul className="space-y-2 text-[#C9D1D9]">
                <li>• All existing tests must pass</li>
                <li>• New functionality must include comprehensive test coverage</li>
                <li>• Code must follow the project's style guide and linting rules</li>
                <li>• Documentation must be updated to reflect changes</li>
                <li>• Performance benchmarks should show improvement where applicable</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mb-3 mt-6">Technical Requirements</h3>
              <ul className="space-y-2 text-[#C9D1D9]">
                <li>• Node.js 18+ compatibility required</li>
                <li>• Modern browser support (Chrome 90+, Firefox 88+, Safari 14+)</li>
                <li>• TypeScript definitions if applicable</li>
                <li>• Backward compatibility with existing API</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-6 border-t border-white/10">
              <RippleButton className="bg-[#1F6FEB] text-white hover:bg-[#2270ff]">Submit Solution</RippleButton>
              <Button
                variant="outline"
                className="border-white/20 bg-transparent text-[#C9D1D9] hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="https://github.com" target="_blank" rel="noreferrer">
                  <GitBranch className="mr-2 h-4 w-4" />
                  View Repository
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-white/20 bg-transparent text-[#C9D1D9] hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href={`/bounty/${id}/discussion`}>Join Discussion</Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:sticky lg:top-24"
        >
          <div className="rounded-xl border border-white/10 bg-[#161B22]/90 backdrop-blur-sm p-6 shadow-lg shadow-black/10">
            <h3 className="text-lg font-semibold text-white mb-4">Related Bounties</h3>
            <Stagger className="space-y-4">
              {related.map((bounty) => (
                <StaggerItem key={bounty.id}>
                  <BountyCard bounty={bounty} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </motion.aside>
      </div>
    </div>
  )
}
