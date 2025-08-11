export const sampleBounties = Array.from({ length: 24 }).map((_, i) => ({
  id: String(i + 1),
  title: [
    "Improve repository performance on large file trees",
    "Add offline support to documentation site",
    "Fix memory leak in WebSocket server implementation",
    "Implement dark mode toggling with SSR support",
    "Create GitHub OAuth flow for CLI tool",
    "Reduce bundle size through code splitting optimization",
  ][i % 6],
  description: [
    "Optimize the file tree traversal algorithm and implement intelligent caching to reduce cold-start times and speed up directory queries in large repositories.",
    "Implement service worker functionality and offline caching strategies to ensure documentation remains accessible without internet connectivity.",
    "Identify and resolve memory leaks in the WebSocket server that cause performance degradation over time with high connection volumes.",
    "Build a comprehensive dark mode system that works seamlessly with server-side rendering and maintains user preferences across sessions.",
    "Design and implement a secure OAuth authentication flow that integrates with GitHub's API for command-line tool authorization.",
    "Analyze bundle composition and implement strategic code splitting to reduce initial load times and improve application performance.",
  ][i % 6],
  tags: [
    ["performance", "nodejs", "caching"],
    ["pwa", "service-worker", "offline"],
    ["backend", "websocket", "memory"],
    ["react", "ssr", "theming"],
    ["oauth", "cli", "security"],
    ["bundling", "optimization", "webpack"],
  ][i % 6],
  reward: [250, 400, 350, 300, 500, 275][i % 6],
  deadline: ["Oct 15", "Oct 22", "Nov 5", "Nov 12", "Nov 28", "Dec 10"][i % 6] + ", 2024",
  difficulty: ["Intermediate", "Advanced", "Expert", "Beginner", "Advanced", "Intermediate"][i % 6],
  status: ["Open", "Open", "In Progress", "Open", "Open", "Completed"][i % 6],
  author: {
    name: ["alice_dev", "bob_maintainer", "carol_oss", "dave_core", "erin_lead", "frank_arch"][i % 6],
    avatar: "/placeholder.svg?height=64&width=64",
  },
}))

export const testimonials = [
  {
    name: "Alex Johnson",
    role: "Open Source Maintainer",
    quote:
      "This platform has transformed how we handle contributions. The quality of submissions and the engagement from developers has been outstanding.",
    avatar: "/placeholder.svg?height=64&width=64",
  },
  {
    name: "Priya Singh",
    role: "Full Stack Developer",
    quote:
      "I love being rewarded for solving real-world problems. The bounty system motivates me to contribute more meaningfully to open source.",
    avatar: "/placeholder.svg?height=64&width=64",
  },
  {
    name: "Diego Martinez",
    role: "Developer Advocate",
    quote:
      "The platform provides a polished experience that makes contributing to open source more accessible and rewarding for developers at all levels.",
    avatar: "/placeholder.svg?height=64&width=64",
  },
]

export const leaderboard = Array.from({ length: 10 }).map((_, i) => ({
  rank: i + 1,
  username: [
    "octocat_dev",
    "code_ninja",
    "dev_wizard",
    "bug_hunter",
    "perf_master",
    "ui_architect",
    "cli_hero",
    "docs_guru",
    "net_ops",
    "type_master",
  ][i],
  points: 1250 - i * 85,
  badges: [
    ["Top 1%", "100+ PRs", "Performance Expert"],
    ["Rising Star", "50+ PRs"],
    ["Bug Squasher", "Security Focus"],
    ["Documentation Hero"],
    ["Performance Guru", "Optimization Master"],
    ["UI/UX Expert"],
    ["CLI Specialist"],
    ["Documentation Master", "Tutorial Creator"],
    ["DevOps Pro"],
    ["TypeScript Expert"],
  ][i].slice(0, Math.max(1, 3 - Math.floor(i / 3))),
  avatar: "/placeholder.svg?height=64&width=64",
}))
