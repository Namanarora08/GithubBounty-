"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { motion } from "framer-motion"
import { Search, X } from "lucide-react"

const TAGS = [
  "performance",
  "nodejs",
  "caching",
  "pwa",
  "service-worker",
  "offline",
  "backend",
  "websocket",
  "memory",
  "react",
  "ssr",
  "theming",
  "oauth",
  "cli",
  "security",
  "bundling",
  "optimization",
  "webpack",
]

const DIFFICULTY_OPTIONS = ["Any", "Beginner", "Intermediate", "Advanced", "Expert"]

export default function ExploreFilters({ onChange }) {
  const [search, setSearch] = useState("")
  const [difficulty, setDifficulty] = useState("Any")
  const [reward, setReward] = useState([0, 1000])
  const [selectedTags, setSelectedTags] = useState([])

  const toggleTag = (tag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const removeTag = (tag) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag))
  }

  const clearAllFilters = () => {
    setSearch("")
    setDifficulty("Any")
    setReward([0, 1000])
    setSelectedTags([])
    onChange?.({
      search: "",
      difficulty: "Any",
      reward: [0, 1000],
      tags: [],
    })
  }

  const filterState = useMemo(
    () => ({ search, difficulty, reward, tags: selectedTags }),
    [search, difficulty, reward, selectedTags],
  )

  const applyFilters = () => {
    onChange?.(filterState)
  }

  const hasActiveFilters =
    search || difficulty !== "Any" || reward[0] > 0 || reward[1] < 1000 || selectedTags.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-white/10 bg-[#161B22]/90 backdrop-blur-sm p-6 shadow-lg shadow-black/10"
    >
      {/* Search and Basic Filters */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B949E]" />
            <Input
              placeholder="Search bounties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-[#C9D1D9] placeholder:text-[#8B949E] focus:border-[#1F6FEB]/50 focus:ring-[#1F6FEB]/20"
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            />
          </div>
        </div>

        <div>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="bg-white/5 border-white/10 text-[#C9D1D9] focus:border-[#1F6FEB]/50 focus:ring-[#1F6FEB]/20">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent className="bg-[#161B22] border-white/10">
              {DIFFICULTY_OPTIONS.map((option) => (
                <SelectItem key={option} value={option} className="text-[#C9D1D9] focus:bg-[#1F6FEB]/20">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-[#C9D1D9]">Reward Range</label>
          <Slider
            value={reward}
            onValueChange={setReward}
            min={0}
            max={1000}
            step={25}
            className="[&_[role=slider]]:bg-[#1F6FEB] [&_[role=slider]]:border-[#1F6FEB]"
          />
          <div className="flex items-center justify-between text-xs text-[#8B949E]">
            <span>{reward[0]} pts</span>
            <span>{reward[1]} pts</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-[#C9D1D9]">Tags</label>
          {selectedTags.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedTags([])}
              className="text-[#8B949E] hover:text-white h-auto p-1"
            >
              Clear tags
            </Button>
          )}
        </div>

        {/* Selected Tags */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <motion.button
                key={tag}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={() => removeTag(tag)}
                className="inline-flex items-center gap-1 rounded-md bg-[#1F6FEB]/20 border border-[#1F6FEB]/40 px-2 py-1 text-xs text-[#89B5FF] hover:bg-[#1F6FEB]/30 transition-colors duration-200"
              >
                {tag}
                <X className="h-3 w-3" />
              </motion.button>
            ))}
          </div>
        )}

        {/* Available Tags */}
        <div className="flex flex-wrap gap-2">
          {TAGS.filter((tag) => !selectedTags.includes(tag)).map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#C9D1D9] transition-all duration-200 hover:bg-white/10 hover:border-white/20 hover:text-white"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              onClick={clearAllFilters}
              variant="ghost"
              size="sm"
              className="text-[#8B949E] hover:text-white hover:bg-white/10"
            >
              Clear all
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={applyFilters}
            className="bg-[#1F6FEB] text-white hover:bg-[#2270ff] transition-colors duration-200"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
