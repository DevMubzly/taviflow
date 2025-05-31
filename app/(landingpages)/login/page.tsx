'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Slideshow functionality
  useEffect(() => {
    const slides = document.querySelectorAll('.slideshow-image');
    const dots = document.querySelectorAll('.slideshow-dot');
    
    if (!slides.length) return;
    
    const interval = setInterval(() => {
      // Hide current slide
      slides.forEach(slide => (slide as HTMLElement).style.opacity = '0');
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Show next slide
      const nextSlide = (currentSlide + 1) % slides.length;
      (slides[nextSlide] as HTMLElement).style.opacity = '1';
      dots[nextSlide].classList.add('active');
      
      setCurrentSlide(nextSlide);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);

  const onSubmit = (data: FormValues) => {
    console.log(data);
    toast({
      title: "Login successful!",
      description: "Welcome back to TaviFlow",
    });
    
    // In a real app, you would authenticate the user here
    // For demo purposes, we'll redirect to the home page after a short delay
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left column - Login form */}
        <div className="flex flex-col items-center md:items-start">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
            <p className="text-gray-600 mb-8">
              Simplify your workflow and boost your productivity with TaviFlow. Get started for free.
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your email" 
                          className="h-12 rounded-full border-gray-200" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Enter your password" 
                            className="h-12 rounded-full border-gray-200 pr-10" 
                            {...field} 
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                          </Button>
                        </div>
                      </FormControl>
                      <div className="flex justify-end">
                        <Link href="/forgotpassword" className="text-sm text-taviflow-blue hover:underline mt-1">
                          Forgot Password?
                        </Link>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-full bg-black hover:bg-gray-800 text-white"
                >
                  Login
                </Button>

                <div className="relative flex items-center justify-center mt-6 mb-6">
                  <div className="absolute border-t border-gray-200 w-full"></div>
                  <span className="relative px-4 bg-gray-50 text-sm text-gray-500">or continue with</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 rounded-full flex justify-center items-center border-gray-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      <path d="M1 1h22v22H1z" fill="none"/>
                    </svg>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 rounded-full flex justify-center items-center border-gray-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fill="#1877F2"/>
                    </svg>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 rounded-full flex justify-center items-center border-gray-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#000000"/>
                    </svg>
                  </Button>
                </div>
              </form>
            </Form>

            <p className="text-center mt-8 text-gray-600">
              Not a member? <Link href="/signup" className="text-taviflow-blue font-medium hover:underline">Register now</Link>
            </p>
          </div>
        </div>

        {/* Right column - Slideshow */}
        <div className="hidden md:flex flex-col items-center justify-center bg-blue-50 rounded-3xl p-10 h-full overflow-hidden">
          <div className="relative w-full max-w-md h-80 flex items-center justify-center">
            <div className="slideshow flex items-center justify-center">
              <img 
                src="/assets/reports.jpeg" 
                alt="Illustration 1" 
                className="max-w-full max-h-80 object-contain slideshow-image"
                style={{ opacity: 1 }}
              />
              <img 
                src="/assets/standing.jpeg" 
                alt="Illustration 2" 
                className="max-w-full max-h-80 object-contain slideshow-image"
                style={{ opacity: 0 }}
              />
            </div>
          </div>
          <div className="text-center mt-8">
            <h2 className="text-2xl font-bold">Make your work easier and organized</h2>
            <p className="text-gray-600 mt-2">with <span className="font-bold">TaviFlow</span></p>
          </div>
          
          {/* Pagination dots */}
          <div className="flex mt-8 space-x-2 slideshow-dots">
            <div className="w-6 h-2 rounded-full bg-gray-800 slideshow-dot active"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300 slideshow-dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
