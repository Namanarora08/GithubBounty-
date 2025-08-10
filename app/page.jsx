"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import RippleButton from "@/components/ripple-button"
import { Button } from "@/components/ui/button"
import { ParallaxSection, Section, FadeIn, Stagger, StaggerItem } from "@/components/section"
import BountyCard from "@/components/bounty-card"
import { sampleBounties, testimonials } from "@/lib/data"
import { ArrowRight, GitPullRequest, ShieldCheck, Zap, Sparkles } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MotionRoot from "@/components/motion-config"

export default function LandingPage() {
  const featured = sampleBounties.slice(0, 6)

  return (
    <MotionRoot>
      <div
        className="flex min-h-svh flex-col bg-[#0D1117] text-[#C9D1D9] antialiased"
        style={{
          fontFamily:
            'Inter, ui-sans-serif, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
        }}
      >
        <Navbar />
        <main className="flex-1">
          <div className="flex flex-col relative overflow-hidden">
            {/* Animated background elements - Adjusted for subtle blue tones */}
            <div className="fixed inset-0 -z-10">
              <div className="absolute top-20 left-10 w-72 h-72 bg-[#1F6FEB]/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute top-40 right-20 w-96 h-96 bg-[#1F6FEB]/5 rounded-full blur-3xl animate-pulse delay-1000" />
              <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#1F6FEB]/8 rounded-full blur-3xl animate-pulse delay-2000" />
            </div>

            {/* Hero Section */}
            <ParallaxSection className="py-20 md:py-32 relative">
              {/* Enhanced background gradient */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1F6FEB]/8 via-[#161B22]/20 to-transparent blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1F6FEB]/15 via-transparent to-transparent" />
              </div>

              <FadeIn y={32}>
                <div className="mx-auto max-w-4xl text-center relative">
                  <motion.h1
                    className="text-balance bg-gradient-to-b from-white via-[#E6EDF3] to-[#C9D1D9] bg-clip-text text-5xl font-bold leading-tight text-transparent md:text-7xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Solve issues. Earn points.{" "}
                    <span className="bg-gradient-to-r from-[#1F6FEB] to-[#4A90E2] bg-clip-text text-transparent">
                      Level up
                    </span>{" "}
                    your GitHub impact.
                  </motion.h1>

                  <motion.p
                    className="mt-6 text-xl text-[#C9D1D9] leading-relaxed md:text-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    Discover curated bounties from open-source projects. Contribute solutions, gain recognition, and climb the
                    leaderboard.
                  </motion.p>

                  {/* Adjusted button layout for better visual balance */}
                  <motion.div
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <RippleButton
                      asChild
                      className="bg-[#1F6FEB] text-white hover:bg-[#2270ff] px-8 py-4 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                      size="lg"
                    >
                      <Link href="/explore" className="flex items-center">
                        <span>
                          Explore Bounties
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </span>
                      </Link>
                    </RippleButton>

                    <Button
                      asChild
                      size="lg"
                      className="border border-white/20 bg-white/5 text-[#C9D1D9] hover:bg-white/10 hover:text-white hover:border-white/30 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
                    >
                      <Link href="/dashboard">View Dashboard</Link>
                    </Button>
                  </motion.div>

                  {/* Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
                  >
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#1F6FEB]">2.4k+</p>
                      <p className="text-sm text-[#8B949E] mt-1">Active Bounties</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#4A90E2]">15k+</p>
                      <p className="text-sm text-[#8B949E] mt-1">Contributors</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-[#6CB6FF]">$2M+</p>
                      <p className="text-sm text-[#8B949E] mt-1">Rewards Paid</p>
                    </div>
                  </motion.div>
                </div>
              </FadeIn>
            </ParallaxSection>

            {/* Features */}
            <Section className="py-20 md:py-24 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1F6FEB]/5 to-transparent" />
              <Stagger className="grid gap-8 md:grid-cols-3 relative">
                <StaggerItem>
                  <FeatureCard
                    icon={<GitPullRequest className="h-6 w-6" />}
                    title="Real GitHub Issues"
                    description="Work on actual open-source problems with clear specifications, detailed requirements, and meaningful rewards."
                    gradient="from-[#1F6FEB] to-[#1F6FEB]/80"
                  />
                </StaggerItem>
                <StaggerItem>
                  <FeatureCard
                    icon={<Zap className="h-6 w-6" />}
                    title="Fast Review Loop"
                    description="Submit solutions and receive rapid, constructive feedback from experienced maintainers and community peers."
                    gradient="from-[#1F6FEB]/80 to-[#1F6FEB]"
                  />
                </StaggerItem>
                <StaggerItem>
                  <FeatureCard
                    icon={<ShieldCheck className="h-6 w-6" />}
                    title="Credible Rewards"
                    description="Earn points and badges that reflect genuine contributions and demonstrate your skills to the community."
                    gradient="from-[#1F6FEB]/60 to-[#1F6FEB]/90"
                  />
                </StaggerItem>
              </Stagger>
            </Section>

            {/* Featured Bounties */}
            <Section className="py-20 md:py-24 relative">
              {/* Adjusted background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1F6FEB]/5 via-transparent to-transparent" />
              <FadeIn>
                <div className="mb-12 text-center">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F6FEB]/20 border border-[#1F6FEB]/30 mb-4"
                  >
                    <Sparkles className="h-4 w-4 text-[#1F6FEB]" />
                    <span className="text-sm font-medium text-[#89B5FF]">Featured Opportunities</span>
                  </motion.div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-[#C9D1D9] bg-clip-text text-transparent md:text-4xl mb-4">
                    Featured Bounties
                  </h2>
                  <p className="text-lg text-[#8B949E]">Hand-picked opportunities from top projects</p>
                </div>
              </FadeIn>
              <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((bounty) => (
                  <StaggerItem key={bounty.id}>
                    <BountyCard bounty={bounty} />
                  </StaggerItem>
                ))}
              </Stagger>
            </Section>

            {/* Testimonials */}
            <Section className="py-20 md:py-24 relative">
              {/* Adjusted background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1F6FEB]/5 via-transparent to-transparent" />
              <FadeIn>
                <div className="mb-12 text-center">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-[#C9D1D9] bg-clip-text text-transparent md:text-4xl mb-4">
                    Trusted by Contributors
                  </h2>
                  <p className="text-lg text-[#8B949E]">Join thousands of developers making an impact</p>
                </div>
              </FadeIn>
              <Stagger className="grid gap-8 md:grid-cols-3">
                {testimonials.map((testimonial, i) => (
                  <TestimonialCard key={i} {...testimonial} />
                ))}
              </Stagger>
            </Section>

            {/* CTA */}
            <Section className="py-20 md:py-24">
              <FadeIn>
                <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-[#161B22]/95 via-[#1F6FEB]/5 to-[#0D1117]/95 p-12 text-center backdrop-blur-xl shadow-2xl">
                  {/* Animated background - Adjusted for blue tones */}
                  <motion.div
                    className="pointer-events-none absolute -inset-20 -z-10"
                    animate={{
                      background: [
                        "radial-gradient(circle at 20% 50%, rgba(31, 111, 235, 0.3) 0%, transparent 50%)",
                        "radial-gradient(circle at 80% 50%, rgba(31, 111, 235, 0.2) 0%, transparent 50%)",
                        "radial-gradient(circle at 40% 50%, rgba(31, 111, 235, 0.25) 0%, transparent 50%)",
                        "radial-gradient(circle at 20% 50%, rgba(31, 111, 235, 0.3) 0%, transparent 50%)",
                      ],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />

                  <motion.h3
                    className="text-3xl font-bold bg-gradient-to-r from-white via-[#89B5FF] to-white bg-clip-text text-transparent md:text-4xl mb-4"
                    whileInView={{ scale: [0.9, 1.05, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    Ready to make an impact?
                  </motion.h3>
                  <p className="mx-auto mt-4 max-w-2xl text-xl text-[#C9D1D9] mb-8">
                    Join the community of builders shipping meaningful fixes and features every day.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <RippleButton
                      asChild
                      className="bg-[#1F6FEB] text-white hover:bg-[#2270ff] px-8 py-4 text-lg font-semibold shadow-xl shadow-[#1F6FEB]/30 hover:shadow-2xl hover:shadow-[#1F6FEB]/40 transition-all duration-500"
                      size="lg"
                    >
                      <Link href="/explore" className="flex items-center">
                        <span>
                          <Sparkles className="mr-2 h-5 w-5" />
                          Start Contributing
                        </span>
                      </Link>
                    </RippleButton>
                  </div>
                </div>
              </FadeIn>
            </Section>
          </div>
        </main>
        <Footer />
      </div>
    </MotionRoot>
  )
}

function FeatureCard({ icon, title, description, gradient }) {
  return (
    <motion.div
      whileHover={{
        y: -12,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 25 },
      }}
      className="group relative rounded-xl border border-white/10 bg-[#161B22]/90 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20 overflow-hidden"
    >
      {/* Animated background gradient - Adjusted for subtle blue tones */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${gradient.replace("from-", "").replace("to-", ", ")})`,
          filter: "blur(100px)",
        }}
      />

      <div className="relative z-10">
        <motion.div
          className={`mb-4 inline-flex items-center justify-center rounded-lg bg-gradient-to-r ${gradient} p-3 shadow-lg`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className="text-white">{icon}</div>
        </motion.div>
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
        <p className="text-[#8B949E] leading-relaxed group-hover:text-[#C9D1D9] transition-colors duration-300">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

function TestimonialCard({ name, role, quote, avatar }) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 25 },
      }}
      className="group relative rounded-xl border border-white/10 bg-[#161B22]/90 p-8 backdrop-blur-sm shadow-lg shadow-black/20 transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-[#1F6FEB]/10 overflow-hidden"
    >
      {/* Subtle gradient overlay - Adjusted for blue tones */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1F6FEB]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <motion.div className="mb-6" initial={{ scale: 0.9 }} whileInView={{ scale: 1 }} viewport={{ once: true }}>
          <p className="text-[#C9D1D9] leading-relaxed text-lg">"{quote}"</p>
        </motion.div>
        <div className="flex items-center gap-4">
          <motion.img
            src={avatar || "/placeholder.svg"}
            alt={`${name} avatar`}
            className="h-12 w-12 rounded-full ring-2 ring-white/10 group-hover:ring-[#1F6FEB]/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
          />
          <div>
            <p className="font-semibold text-white group-hover:text-[#89B5FF] transition-colors duration-300">{name}</p>
            <p className="text-sm text-[#8B949E]">{role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}