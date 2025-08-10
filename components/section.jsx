"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import * as React from "react"

export function Section({ children, className = "", containerClass = "" }) {
  return (
    <section className={className}>
      <div className={`mx-auto w-full max-w-7xl px-6 ${containerClass}`}>{children}</div>
    </section>
  )
}

export function FadeIn({ children, delay = 0, y = 24 }) {
  return (
    <motion.div
      initial={{ y, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        ease: [0.4, 0.0, 0.2, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({ children, delay = 0.1, className = "" }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 },
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
      }}
    >
      {children}
    </motion.div>
  )
}

export function ParallaxSection({ children, className = "" }) {
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.8, 0.2])

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          y,
          opacity,
          background: `
            radial-gradient(1400px 600px at 50% -20%, rgba(31, 111, 235, 0.15), transparent 70%),
            linear-gradient(180deg, rgba(13, 17, 23, 0.8), rgba(13, 17, 23, 0))
          `,
        }}
      />
      <div className="mx-auto w-full max-w-7xl px-6">{children}</div>
    </section>
  )
}
