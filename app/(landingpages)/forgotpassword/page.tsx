'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Mail, Check } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type FormValues = z.infer<typeof formSchema>;

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    setIsSubmitted(true);
    
    // In a real app, you would send a password reset email here
    toast({
      title: "Reset link sent!",
      description: "Check your email for instructions",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left column - Reset form */}
        <div className="flex flex-col items-center md:items-start">
          <div className="w-full max-w-md">
            <Link href="/login" className="flex items-center text-gray-600 mb-8 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to login
            </Link>
            
            {!isSubmitted ? (
              <>
                <h1 className="text-3xl font-bold mb-2">Forgot password?</h1>
                <p className="text-gray-600 mb-8">
                  No worries! Enter your email and we'll send you a reset link.
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
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                              <Input 
                                placeholder="Enter your email" 
                                className="h-12 rounded-full border-gray-200 pl-10" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full h-12 rounded-full bg-black hover:bg-gray-800 text-white"
                    >
                      Reset Password
                    </Button>
                  </form>
                </Form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Check your email</h2>
                <p className="text-gray-600 mb-6">
                  We've sent a password reset Link href your email address.
                </p>
                <Button 
                  type="button"
                  variant="outline" 
                  className="rounded-full border-gray-200 text-gray-700"
                  onClick={() => router.push('/login')}
                >
                  Back to login
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Right column - Slideshow */}
        <div className="hidden md:flex flex-col items-center justify-center bg-blue-50 rounded-3xl p-10 h-full overflow-hidden">
          <div className="relative w-full max-w-md aspect-square">
            <div className="slideshow">
              <img 
                src="/assets/reports.jpeg" 
                alt="Illustration 1" 
                className="w-full h-auto rounded-lg slideshow-image"
              />
              <img 
                src="/assets/standing.jpeg" 
                alt="Illustration 2" 
                className="w-full h-auto rounded-lg slideshow-image"
              />
            </div>
          </div>
          <div className="text-center mt-8">
            <h2 className="text-2xl font-bold">Make your work easier and organized</h2>
            <p className="text-gray-600 mt-2">with <span className="font-bold">TaviFlow</span></p>
          </div>
          
          {/* Pagination dots - will be controlled via JS */}
          <div className="slideshow-dots flex mt-8 space-x-2 justify-center">
            <div className="w-2 h-2 rounded-full bg-gray-800 slideshow-dot active"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300 slideshow-dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
