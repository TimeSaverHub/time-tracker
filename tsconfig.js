import * as React from 'react'
import Image from 'next/image'

export function Logo({ className = "", size = 48 }: { className?: string; size?: number }) {
  return (
    <div className={className} style={{ width: size, height: size, position: 'relative' }}>
      <Image
        src="/logo.png"
        alt="Time Tracker Logo"
        fill
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  )
}

