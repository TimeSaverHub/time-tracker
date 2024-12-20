import { ReactNode } from 'react'
import Link from 'next/link'
import { Clock, LayoutDashboard, LogOut } from 'lucide-react'

import { Button } from '../../components/ui/button'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="flex h-16 items-center px-4 gap-4">
          <Clock className="h-6 w-6" />
          <h1 className="text-xl font-semibold">Time Tracker</h1>
          <nav className="flex items-center gap-4 ml-auto">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto py-6 px-4">
        {children}
      </main>
    </div>
  )
}

