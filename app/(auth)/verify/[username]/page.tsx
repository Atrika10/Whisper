"use client"

import Link from "next/link"
import { Ghost, Mail, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function VerifyCodePage() {
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
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-lg border border-white/10"
          >
            <Ghost className="h-6 w-6 text-white" />
          </motion.div>
          <motion.span
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl font-bold tracking-tight"
          >
            Veil
          </motion.span>
        </Link>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-6 py-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl shadow-purple-500/5">
            {/* Glow effect behind card */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-50 pointer-events-none" />

            <div className="relative space-y-6">
              {/* Header */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center space-y-2"
              >
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                  Verify Your Account
                </h1>
                <p className="text-zinc-400">Enter the verification code sent to your email</p>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="space-y-4"
              >
                {/* Verification Code Field */}
                <div className="space-y-2">
                  <Label htmlFor="code" className="text-sm text-zinc-300">
                    Verification Code
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <Input
                      id="code"
                      type="number"
                      placeholder="000000"
                      maxLength={6}
                      className="h-12 pl-12 border-white/10 bg-white/5 text-white placeholder:text-zinc-500 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-300 text-lg tracking-widest"
                    />
                  </div>
                  <p className="text-xs text-zinc-500 pl-1">Check your email for the 6-digit code</p>
                </div>

                {/* Submit Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="cursor-pointer w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-purple-500/25 group">
                    Verify Code
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </motion.div>

              {/* Resend Code */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-center"
              >
                <p className="text-sm text-zinc-400">
                  Didn't receive the code?{" "}
                  <button className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                    Resend Code
                  </button>
                </p>
              </motion.div>

              {/* Back to Sign In */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-center text-sm text-zinc-400"
              >
                <Link href="/sign-in" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                  Back to Sign In
                </Link>
              </motion.p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
