"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { MessageSquare, Shield, Zap, User, Ghost } from "lucide-react"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: number
  icon: React.ReactNode
  iconBg: string
  iconColor: string
  time: string
  title: string
  content: string
  isVerified?: boolean
  progress?: number
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    icon: <MessageSquare size={20} />,
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-200",
    time: "2m ago",
    title: "Anonymous",
    content: '"I really liked your recent post! It totally changed my perspective on the topic."',
  },
  {
    id: 2,
    icon: <Shield size={24} />,
    iconBg: "bg-gradient-to-br from-blue-500 to-purple-600",
    iconColor: "text-white",
    time: "Verified", // Using time field for badge text if verified
    title: "Top Secret",
    content: '"Your leadership in the last project was inspiring. Keep pushing the boundaries!"',
    isVerified: true,
    progress: 66,
  },
  {
    id: 3,
    icon: <Zap size={20} />,
    iconBg: "bg-indigo-500/20",
    iconColor: "text-indigo-200",
    time: "1h ago",
    title: "Mystery User",
    content: '"Have you considered adding a dark mode? The current design is a bit too bright."',
  },
  {
    id: 4,
    icon: <User size={20} />,
    iconBg: "bg-pink-500/20",
    iconColor: "text-pink-200",
    time: "4h ago",
    title: "Secret Admirer",
    content: '"Just wanted to say that I love the new update. The interface is so smooth!"',
  },
  {
    id: 5,
    icon: <Ghost size={20} />,
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-200",
    time: "6h ago",
    title: "Hidden Gem",
    content: '"This platform helps me express myself freely. Thank you for building this."',
  },
]

export function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(1) // Start with "Top Secret" (index 1)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length)
  }, [])

  // Auto-advance
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(nextSlide, 3000)
    return () => clearInterval(interval)
  }, [isPaused, nextSlide])

  // Calculate position relative to active index
  const getPosition = (index: number) => {
    const total = TESTIMONIALS.length
    // Normalize index relative to activeIndex to be within -total/2 to total/2
    let diff = (index - activeIndex + total) % total
    if (diff > total / 2) diff -= total

    return diff
  }

  return (
    <div
      className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden py-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="rounded-4xl absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20 pointer-events-none" />

      <div className="relative h-[400px] w-full max-w-5xl perspective-[1000px]">
        {TESTIMONIALS.map((testimonial, index) => {
          const position = getPosition(index)
          const isActive = position === 0
          const isPrev = position === -1
          const isNext = position === 1

          // Hide items that are not active, prev, or next
          const isVisible = isActive || isPrev || isNext

          if (!isVisible) return null

          return (
            <div
              key={testimonial.id}
              className={cn(
                "absolute left-[85%] top-[75%] sm:left-[70%] md:top-[60%] w-[300px] md:w-[380px] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out cursor-pointer",
                isActive ? "z-30 scale-100 opacity-100" : "z-10 scale-90 opacity-40 blur-[1px] grayscale-[50%]",
                isPrev && "-translate-x-[110%] md:-translate-x-[100%]",
                isNext && "translate-x-[10%] md:translate-x-[0%]",
              )}
              onClick={() => setActiveIndex(index)}
              style={{
                transform: `translate(-50%, -50%) translateX(${
                  isActive ? "0%" : isPrev ? "-80%" : "80%"
                }) scale(${isActive ? 1 : 0.85})`,
              }}
            >
              {/* Glow Effect for Active Card */}
              {isActive && (
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-b from-white/20 to-transparent blur-sm opacity-50" />
              )}

              {/* Card Content */}
              <div
                className={cn(
                  "relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border p-6 backdrop-blur-xl transition-all",
                  isActive
                    ? "border-white/10 bg-zinc-900/80 shadow-2xl shadow-purple-900/20"
                    : "border-white/5 bg-black/40",
                )}
              >
                {/* Background Blobs */}
                {isActive && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-100" />
                    <div className="absolute bottom-0 left-0 -ml-10 -mb-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
                  </>
                )}

                {/* Header */}
                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-full shadow-lg transition-all",
                      isActive ? "h-12 w-12" : "h-10 w-10",
                      testimonial.iconBg,
                      testimonial.iconColor,
                    )}
                  >
                    {testimonial.icon}
                  </div>
                  {testimonial.isVerified ? (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white border border-white/10">
                      Verified
                    </span>
                  ) : (
                    <span className="text-xs text-zinc-500 font-medium">{testimonial.time}</span>
                  )}
                </div>

                {/* Body */}
                <div className="space-y-4 text-left relative z-10">
                  <h3 className={cn("font-bold text-white", isActive ? "text-xl" : "text-lg")}>{testimonial.title}</h3>
                  <p className={cn("leading-relaxed", isActive ? "text-base text-zinc-300" : "text-sm text-zinc-500")}>
                    {testimonial.content}
                  </p>

                  {/* Progress Bar (Only for active/verified or specific cards) */}
                  {isActive && testimonial.progress && (
                    <div className="mt-2 h-1 w-full rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                        style={{ width: `${testimonial.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Indicators */}
      <div className="flex gap-2 mt-4 z-20">
        {TESTIMONIALS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              idx === activeIndex ? "w-8 bg-white" : "w-2 bg-white/20 hover:bg-white/40",
            )}
          />
        ))}
      </div>
    </div>
  )
}