"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import BountyCard from "@/components/bounty-card"
import ExploreFilters from "@/components/explore-filters"
import { sampleBounties } from "@/lib/data"
import { Stagger, StaggerItem } from "@/components/section"

export default function ExplorePage() {
  const [filters, setFilters] = useState({
    search: "",
    difficulty: "Any",
    reward: [0, 1000],
    tags: [],
  })
  const [visible, setVisible] = useState(12)
  const [isLoading, setIsLoading] = useState(false)
  const sentinelRef = useRef(null)

  const filtered = useMemo(() => {
    return sampleBounties.filter((bounty) => {
      const searchTerm = filters.search?.toLowerCase?.() || ""
      const matchesSearch =
        bounty.title.toLowerCase().includes(searchTerm) ||
        bounty.description.toLowerCase().includes(searchTerm) ||
        bounty.tags.some((tag) => tag.toLowerCase().includes(searchTerm))

      const matchesReward = bounty.reward >= filters.reward[0] && bounty.reward <= filters.reward[1]
      const matchesTags = filters.tags.length === 0 || filters.tags.some((tag) => bounty.tags.includes(tag))

      return matchesSearch && matchesReward && matchesTags
    })
  }, [filters])

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visible < filtered.length && !isLoading) {
          setIsLoading(true)
          setTimeout(() => {
            setVisible((prev) => Math.min(prev + 6, filtered.length))
            setIsLoading(false)
          }, 500)
        }
      },
      { rootMargin: "200px" },
    )

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }

    return () => observer.disconnect()
  }, [visible, filtered.length, isLoading])

  useEffect(() => {
    setVisible(12)
  }, [filters])

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Explore Bounties</h1>
          <p className="mt-2 text-lg text-[#8B949E]">
            Discover {sampleBounties.length} open bounties from top projects
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <ExploreFilters onChange={setFilters} />
        </div>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-[#8B949E]">
            Showing {Math.min(visible, filtered.length)} of {filtered.length} bounties
          </p>
        </div>

        {/* Bounty Grid */}
        {filtered.length > 0 ? (
          <>
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.slice(0, visible).map((bounty) => (
                <StaggerItem key={bounty.id}>
                  <BountyCard bounty={bounty} />
                </StaggerItem>
              ))}
            </Stagger>

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-center mt-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="h-8 w-8 rounded-full border-2 border-[#1F6FEB] border-t-transparent"
                />
              </div>
            )}

            {/* Sentinel for infinite scroll */}
            <div ref={sentinelRef} className="h-10" />

            {/* End message */}
            {visible >= filtered.length && !isLoading && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-center text-[#8B949E]">
                You've reached the end of the results
              </motion.p>
            )}
          </>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
            <p className="text-xl text-[#8B949E] mb-4">No bounties found</p>
            <p className="text-[#8B949E]">Try adjusting your filters or search terms</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
