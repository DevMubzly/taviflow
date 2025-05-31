'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type FormValues = z.infer<typeof formSchema>;

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
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

  const watchPassword = form.watch('password');
  const hasMinChars = watchPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(watchPassword);
  const hasLowercase = /[a-z]/.test(watchPassword);
  const hasNumber = /[0-9]/.test(watchPassword);

  const onSubmit = (data: FormValues) => {
    console.log(data);
    toast({
      title: "Account created successfully!",
      description: "Welcome to TaviFlow",
    });
    
    // In a real app, you would register the user here
    // For demo purposes, we'll redirect to the login page after a short delay
    setTimeout(() => {
      router.push('/create-business');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left column - Signup form */}
        <div className="flex flex-col items-center md:items-start">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-2">Create an account</h1>
            <p className="text-gray-600 mb-8">
              Join TaviFlow to streamline your workflow and boost productivity.
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your full name" 
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
                            placeholder="Create a password" 
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
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className={`text-xs flex items-center ${hasMinChars ? 'text-green-600' : 'text-gray-500'}`}>
                          {hasMinChars ? <Check className="h-3 w-3 mr-1" /> : <span className="h-3 w-3 mr-1">·</span>}
                          At least 8 characters
                        </div>
                        <div className={`text-xs flex items-center ${hasUppercase ? 'text-green-600' : 'text-gray-500'}`}>
                          {hasUppercase ? <Check className="h-3 w-3 mr-1" /> : <span className="h-3 w-3 mr-1">·</span>}
                          One uppercase letter
                        </div>
                        <div className={`text-xs flex items-center ${hasLowercase ? 'text-green-600' : 'text-gray-500'}`}>
                          {hasLowercase ? <Check className="h-3 w-3 mr-1" /> : <span className="h-3 w-3 mr-1">·</span>}
                          One lowercase letter
                        </div>
                        <div className={`text-xs flex items-center ${hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                          {hasNumber ? <Check className="h-3 w-3 mr-1" /> : <span className="h-3 w-3 mr-1">·</span>}
                          One number
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showConfirmPassword ? "text" : "password"} 
                            placeholder="Confirm your password" 
                            className="h-12 rounded-full border-gray-200 pr-10" 
                            {...field} 
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-full bg-black hover:bg-gray-800 text-white mt-4"
                >
                  Create Account
                </Button>
              </form>
            </Form>

            <p className="text-center mt-8 text-gray-600">
              Already have an account? <Link href="/login" className="text-taviflow-blue font-medium hover:underline">Log in</Link>
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
            <div className="w-2 h-2 rounded-full bg-gray-300 slideshow-dot"></div>
            <div className="w-6 h-2 rounded-full bg-gray-800 slideshow-dot active"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
