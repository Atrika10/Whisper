"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {zodResolver} from '@hookform/resolvers/zod'
import { Ghost, User, Mail, Lock, ArrowRight,Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import z from "zod"
import axios, { AxiosError } from 'axios';
import { signUpSchema } from "@/src/Schemas/signUpSchema"
import { ApiResponse } from "@/src/types/ApiResponse"

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

function page() {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debouncedUsername = useDebounce(username, 500);

  const router = useRouter();
  
  // Initialize the form with react-hook-form and zod resolver
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver : zodResolver(signUpSchema), 
    defaultValues : {
      username: '',
      email: '',
      password: ''
    }
  });

  useEffect(()=>{
    const checkUsernameUnique = async ()=>{
     if(debouncedUsername){
      setIsCheckingUsername(true);
      setUsernameMessage('');

      try {
        const response = await axios.get<ApiResponse>(`/api/check-unique-username?username=${debouncedUsername}`);
        console.log(response, "Username check response");

        if(response.data.success){
          setUsernameMessage('Username is available');
        }
        
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        if(axiosError.response){
          setUsernameMessage(axiosError.response?.data.message ?? 'Error checking username');
        }else{
          setUsernameMessage('Error checking username');
        }
      }finally{
        setIsCheckingUsername(false);
      }
     }
    };
    checkUsernameUnique();
  }, [debouncedUsername]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>)=>{
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>('/api/sign-up', data);
      console.log(response, "Error in on submit ")
      if(response.data.success){
        // use a toast notification to inform user
        router.replace(`/verify/${username}`)
        
      }
    } catch (error) {
      console.log("Error in signup of user", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message ?? 'Error signing up';
      // use a toast notification here to inform user about the error

    } finally {
      setIsSubmitting(false);
    }
  }

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
            Whisper
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
                  Join Whisper
                </h1>
                <p className="text-zinc-400">Sign up to start your anonymous adventure</p>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="space-y-4"
              >

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Username Field */}
                    <FormField
                      name="username"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-300">Username</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                              <Input
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  setUsername(e.target.value);
                                }}
                                placeholder="anonymous_hero"
                                className="h-12 pl-10 border-white/10 bg-white/5 text-white placeholder:text-zinc-500 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-300"
                              />
                              {isCheckingUsername && (
                                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-zinc-500" />
                              )}
                            </div>
                          </FormControl>
                          {!isCheckingUsername && usernameMessage && (
                            <p
                              className={`text-xs ${
                                usernameMessage === "Username is available"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {usernameMessage}
                            </p>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email Field */}
                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-300">Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                              <Input
                                {...field}
                                type="email"
                                placeholder="you@example.com"
                                className="h-12 pl-10 border-white/10 bg-white/5 text-white placeholder:text-zinc-500 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-300"
                              />
                            </div>
                          </FormControl>
                          <p className="text-xs text-zinc-500 pl-1">
                            We will send you a verification code
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Password Field */}
                    <FormField
                      name="password"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-300">Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                              <Input
                                {...field}
                                type="password"
                                placeholder="••••••••"
                                className="h-12 pl-10 border-white/10 bg-white/5 text-white placeholder:text-zinc-500 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-300"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />


                {/* Submit Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-purple-500/25 group"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                          </>
                        ) : (
                          <>
                            Create Account
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                     </form>
                </Form>
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="relative"
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-black/50 backdrop-blur-xl px-4 text-zinc-500">or continue with</span>
                </div>
              </motion.div>

              {/* Social Login */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="grid grid-cols-2 gap-3"
              >
                <Button
                  variant="outline"
                  className="h-11 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="h-11 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </Button>
              </motion.div>

              {/* Sign In Link */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-center text-sm text-zinc-400"
              >
                Already a member?{" "}
                <Link href="/sign-in" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                  Sign in
                </Link>
              </motion.p>
            </div>
          </div>

          {/* Bottom text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-center text-xs text-zinc-600 mt-6"
          >
            By signing up, you agree to our{" "}
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </motion.p>
        </motion.div>
      </main>
    </div>
  )
}

export default page