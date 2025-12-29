import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Ghost } from "lucide-react"
import { TestimonialCarousel } from "@/components/testimonialCarousel"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white selection:bg-white/20">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-900/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex h-20 items-center justify-between px-6 md:px-12 lg:px-20">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-lg border border-white/10">
            <Ghost className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Whisper</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
            How it works
          </Link>
          <Link href="/sign-in">
            <Button
              variant="outline"
              className="cursor-pointer hidden border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:flex"
            >
              Log in
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="cursor-pointer bg-white text-black hover:bg-zinc-200">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-20 pb-32 text-center md:pt-32 lg:px-20">
        {/* <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300 backdrop-blur-md mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          v2.0 is now live
        </div> */}

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
          The Truth, Unfiltered.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl leading-relaxed">
          Dive into the world of anonymous feedback. Share your thoughts without sharing your identity, and hear what
          people really think.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button size="lg" className="cursor-pointer h-12 bg-white px-8 text-base text-black hover:bg-zinc-200">
            Start receiving messages
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="cursor-pointer h-12 border-white/10 bg-white/5 px-8 text-base text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
          >
            Learn more
          </Button>
        </div>

        {/* Floating Cards Visualization */}
        <div className="relative mt-20 w-full max-w-8xl">
          <TestimonialCarousel />
        </div>
      </main>

      {/* Footer Preview */}
      <footer className="relative z-10 border-t border-white/10 bg-black/50 py-12 text-center backdrop-blur-md">
        <p className="text-zinc-500">© 2025 Whisper. All rights reserved.</p>
      </footer>
    </div>
  )
}