"use client"

import * as React from "react"
import { Button as ShadcnButton } from "@/components/ui/button" // Renamed to avoid conflict
import { motion } from "framer-motion"

export default function RippleButton({
  children,
  className = "",
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const [ripples, setRipples] = React.useState([])
  const buttonRef = React.useRef(null)

  const createRipple = (e) => {
    const targetElement = buttonRef.current
    if (!targetElement) return

    const rect = targetElement.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 1.5
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2
    const id = Date.now()

    setRipples((prev) => [...prev, { id, x, y, size }])

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id))
    }, 600)
  }

  const handleClick = (e) => {
    createRipple(e)
    props.onClick?.(e)
  }

  // All content that will be passed as a single child to ShadcnButton
  const buttonContent = (
    <>
      {/* Original children passed to RippleButton */}
      {children}

      {/* Enhanced glow effect - make it more subtle */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-md opacity-0"
        whileHover={{
          opacity: 1,
          boxShadow:
            variant === "default"
              ? "0 4px 20px rgba(31, 111, 235, 0.3), 0 8px 40px rgba(31, 111, 235, 0.15)"
              : "0 4px 12px rgba(255, 255, 255, 0.1)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Enhanced ripple effects */}
      <div className="absolute inset-0 overflow-hidden rounded-md">
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              background:
                "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </div>
    </>
  )

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="inline-block"
    >
      <ShadcnButton
        ref={buttonRef}
        {...props} // Pass asChild, href, etc.
        onClick={handleClick}
        className={`relative overflow-hidden transition-all duration-300 ${className}`}
        variant={variant}
        size={size}
      >
        {buttonContent} {/* This is now the single child */}
      </ShadcnButton>
    </motion.div>
  )
}
