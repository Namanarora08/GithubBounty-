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
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-[#C9D1D9] bg-clip-text text-transparent md:text-4xl mb-2">
            Explore Bounties
          </h1>
          <p className="text-lg text-[#8B949E] font-medium">
            Discover {sampleBounties.length} open bounties from top projects
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ExploreFilters onChange={setFilters} />
        </motion.div>

        {/* Results */}
        <motion.div 
          className="mb-6 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-[#8B949E] font-medium">
            Showing {Math.min(visible, filtered.length)} of {filtered.length} bounties
          </p>
        </motion.div>

        {/* Bounty Grid */}
        {filtered.length > 0 ? (
          <>
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" delay={0.1}>
              {filtered.slice(0, visible).map((bounty) => (
                <StaggerItem key={bounty.id}>
                  <BountyCard bounty={bounty} />
                </StaggerItem>
              ))}
            </Stagger>

            {/* Loading indicator */}
            {isLoading && (
              <motion.div 
                className="flex justify-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="h-8 w-8 rounded-full border-2 border-[#2563eb] border-t-transparent"
                />
              </motion.div>
            )}

            {/* Sentinel for infinite scroll */}
            <div ref={sentinelRef} className="h-10" />

            {/* End message */}
            {visible >= filtered.length && !isLoading && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="mt-8 text-center text-[#8B949E] font-medium"
              >
                You've reached the end of the results
              </motion.p>
            )}
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-center py-16 px-8 rounded-xl border border-white/10 bg-gradient-to-br from-[#1e293b]/50 to-[#161B22]/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#2563eb]/20 to-[#3b82f6]/20 flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </div>
            </motion.div>
            <p className="text-xl text-white mb-2 font-semibold">No bounties found</p>
            <p className="text-[#8B949E] font-medium">Try adjusting your filters or search terms</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
