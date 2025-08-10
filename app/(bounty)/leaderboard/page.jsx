"use client"

import { motion } from "framer-motion"
import { leaderboard } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award } from "lucide-react"
import { Stagger, StaggerItem } from "@/components/section"

function getRankIcon(rank) {
  if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />
  if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />
  return <span className="text-lg font-bold text-[#8B949E]">#{rank}</span>
}

export default function LeaderboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Leaderboard</h1>
          <p className="mt-2 text-lg text-[#8B949E]">Top contributors making an impact</p>
        </div>

        {/* Top 3 Podium */}
        <Stagger className="mb-12 grid gap-6 md:grid-cols-3">
          {leaderboard.slice(0, 3).map((user, index) => (
            <StaggerItem key={user.rank}>
              <motion.div
                whileHover={{ y: -4 }}
                className={`relative rounded-xl border border-white/10 bg-[#161B22]/90 backdrop-blur-sm p-6 text-center shadow-lg shadow-black/10 ${
                  index === 0 ? "md:order-2 ring-2 ring-[#1F6FEB]/30" : index === 1 ? "md:order-1" : "md:order-3"
                }`}
              >
                {index === 0 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#1F6FEB] text-white font-semibold">Champion</Badge>
                  </div>
                )}

                <div className="mb-4 flex justify-center">{getRankIcon(user.rank)}</div>

                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={`${user.username} avatar`}
                  className="mx-auto mb-4 h-16 w-16 rounded-full ring-2 ring-white/10"
                />

                <h3 className="text-lg font-semibold text-white mb-2">{user.username}</h3>

                <p className="text-2xl font-bold text-[#1F6FEB] mb-3">{user.points.toLocaleString()} pts</p>

                <div className="flex flex-wrap justify-center gap-1">
                  {user.badges.slice(0, 2).map((badge, i) => (
                    <Badge key={i} variant="secondary" className="bg-white/10 text-[#C9D1D9] text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Full Leaderboard Table */}
        <Card className="border-white/10 bg-[#161B22]/90 backdrop-blur-sm shadow-lg shadow-black/10">
          <CardHeader>
            <CardTitle className="text-white text-xl">All Contributors</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-[#C9D1D9] font-semibold">Rank</TableHead>
                  <TableHead className="text-[#C9D1D9] font-semibold">Contributor</TableHead>
                  <TableHead className="text-[#C9D1D9] font-semibold">Points</TableHead>
                  <TableHead className="text-[#C9D1D9] font-semibold">Badges</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((user, index) => (
                  <motion.tr
                    key={user.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-white/10 hover:bg-white/5 transition-colors duration-200"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">{getRankIcon(user.rank)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt={`${user.username} avatar`}
                          className="h-10 w-10 rounded-full ring-1 ring-white/10"
                        />
                        <span className="font-medium text-white">{user.username}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-white">{user.points.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.badges.map((badge, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="bg-white/10 text-[#C9D1D9] hover:bg-[#1F6FEB]/20 hover:text-[#89B5FF] transition-colors duration-200"
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
