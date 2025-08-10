import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MotionRoot from "@/components/motion-config"

export const metadata = {
  title: "GitHub Bounty Platform",
  description: "Discover, contribute, and earn points for solving GitHub issues.",
}

export default function BountyLayout({ children }) {
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
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </MotionRoot>
  )
}
