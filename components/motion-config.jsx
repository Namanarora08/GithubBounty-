"use client"

import { MotionConfig } from "framer-motion"

export default function MotionRoot({ children }) {
  return (
    <MotionConfig
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
        mass: 0.8,
      }}
      reducedMotion="user"
    >
      {children}
    </MotionConfig>
  )
}
