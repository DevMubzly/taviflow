
'use client'

import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function NotFound() {
  const pathname = usePathname()

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    )
  }, [pathname])

  return (
    <div className="min-h-screen flex items-center justify-center bg-taviflow-background">
      <div className="text-center max-w-md glass-card p-8 animate-fade-in">
        <h1 className="text-6xl font-bold text-taviflow-primary mb-4">404</h1>
        <p className="text-xl text-taviflow-text mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-taviflow-muted mb-8">
          The page at <code className="bg-taviflow-secondary px-2 py-1 rounded text-sm">{pathname}</code> could not be found.
        </p>
        <Button className="primary-button inline-flex items-center gap-2">
          <Home className="w-4 h-4" />
          <Link href="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}
