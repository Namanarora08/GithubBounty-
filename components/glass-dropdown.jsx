"use client"

import { DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef } from "react"

export default function GlassDropdown({
  open,
  onOpenChange,
  children,
  side = "bottom",
  align = "end",
  className = "",
  ...props
}) {
  const contentRef = useRef(null)

  // Mobile swipe to close
  useEffect(() => {
    if (!open) return

    let startY = 0
    let currentY = 0

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY
    }

    const handleTouchMove = (e) => {
      currentY = e.touches[0].clientY
      const diff = currentY - startY

      if (diff > 0) {
        e.preventDefault()
        const element = contentRef.current
        if (element) {
          element.style.transform = `translateY(${Math.min(diff * 0.5, 50)}px)`
          element.style.opacity = Math.max(1 - diff / 200, 0.7)
        }
      }
    }

    const handleTouchEnd = () => {
      const diff = currentY - startY
      const element = contentRef.current

      if (element) {
        element.style.transform = ""
        element.style.opacity = ""
      }

      if (diff > 80) {
        onOpenChange?.(false)
      }
    }

    document.addEventListener("touchstart", handleTouchStart, { passive: false })
    document.addEventListener("touchmove", handleTouchMove, { passive: false })
    document.addEventListener("touchend", handleTouchEnd)

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [open, onOpenChange])

  return (
    <AnimatePresence>
      {open && (
        <DropdownMenuContent
          ref={contentRef}
          align={align}
          side={side}
          className={`border-white/10 bg-[#0D1117]/80 backdrop-blur-xl shadow-2xl ring-1 ring-white/5 ${className}`}
          forceMount
          sideOffset={8}
          onEscapeKeyDown={() => onOpenChange?.(false)}
          {...props}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{
              duration: 0.2,
              ease: [0.4, 0.0, 0.2, 1],
            }}
          >
            {children}
          </motion.div>
        </DropdownMenuContent>
      )}
    </AnimatePresence>
  )
}
