"use client"
import { DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"

export default function AnimatedDropdownContent({
  open,
  onOpenChange,
  children,
  side = "bottom",
  align = "end",
  className = "",
  ...props
}) {
  return (
    <AnimatePresence>
      {open ? (
        <DropdownMenuContent
          align={align}
          side={side}
          className={`w-80 border-white/10 bg-white/5 backdrop-blur-md shadow-xl ring-1 ring-white/10 [--radix-dropdown-menu-content-transform-origin:var(--origin)] ${className}`}
          forceMount
          sideOffset={10}
          onEscapeKeyDown={() => onOpenChange?.(false)}
          {...props}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.985, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            // Mobile swipe to close
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 80) onOpenChange?.(false)
            }}
          >
            {children}
          </motion.div>
        </DropdownMenuContent>
      ) : null}
    </AnimatePresence>
  )
}
