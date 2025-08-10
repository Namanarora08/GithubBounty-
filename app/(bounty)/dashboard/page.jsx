"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import RippleButton from "@/components/ripple-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import BountyCard from "@/components/bounty-card"
import { sampleBounties } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Stagger, StaggerItem } from "@/components/section"

export default function DashboardPage() {
  const active = sampleBounties.slice(0, 4)
  const completed = sampleBounties.slice(4, 8)

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Dashboard</h1>
          <p className="mt-2 text-lg text-[#8B949E]">Track your progress and manage your bounties</p>
        </div>

        {/* Profile and Stats */}
        <div className="grid gap-6 mb-12 md:grid-cols-3">
          <Card className="border-white/10 bg-[#161B22]/90 backdrop-blur-sm md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white text-xl">Welcome back, Octocat</CardTitle>
              <Badge className="bg-[#1F6FEB] hover:bg-[#2270ff] text-white font-semibold">Level 7</Badge>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <img
                src="/placeholder.svg?height=96&width=96"
                alt="Profile"
                className="h-20 w-20 rounded-full ring-2 ring-white/10"
              />
              <div className="space-y-2">
                <p className="text-[#C9D1D9] font-medium">@octocat</p>
                <p className="text-[#8B949E]">Top 5% contributor this month</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-[#8B949E]">
                    <span className="font-semibold text-white">23</span> bounties completed
                  </span>
                  <span className="text-[#8B949E]">
                    <span className="font-semibold text-white">4.9</span> avg rating
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3">
              <RippleButton asChild className="bg-[#1F6FEB] text-white hover:bg-[#2270ff]">
                <Link href="/explore">Browse Bounties</Link>
              </RippleButton>
              <Button
                variant="outline"
                className="border-white/20 bg-transparent text-[#C9D1D9] hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/explore">Create Bounty</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-white/10 bg-[#161B22]/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Points Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-white mb-2">2,345</p>
              <p className="text-[#8B949E] mb-4">+180 this week</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B949E]">This month</span>
                  <span className="text-white font-medium">+420</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B949E]">All time</span>
                  <span className="text-white font-medium">12,890</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Bounties */}
        <div className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Active Bounties</h2>
              <p className="text-[#8B949E]">Bounties you're currently working on</p>
            </div>
            <Button asChild variant="ghost" className="text-[#1F6FEB] hover:text-white hover:bg-[#1F6FEB]/10">
              <Link href="/explore">View All</Link>
            </Button>
          </div>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {active.map((bounty) => (
              <StaggerItem key={bounty.id}>
                <BountyCard bounty={bounty} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Completed Bounties */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white">Recently Completed</h2>
            <p className="text-[#8B949E]">Your latest successful contributions</p>
          </div>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {completed.map((bounty) => (
              <StaggerItem key={bounty.id}>
                <BountyCard bounty={bounty} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </motion.div>
    </div>
  )
}
