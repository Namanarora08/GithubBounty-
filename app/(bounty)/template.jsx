"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

export default function Template({ children }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0.0, 0.2, 1],
          type: "tween",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
