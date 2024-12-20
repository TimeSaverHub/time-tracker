import * as React from 'react'
import Image from 'next/image'

export function Logo({ 
  className = "", 
  width = 48,
  height = 48 
}: { 
  className?: string; 
  width?: number;
  height?: number;
}) {
  return (
    <div 
      className={className} 
      style={{ 
        width, 
        height, 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '100%'
      }}
    >
      <Image
        src="/logo.png"
        alt="Time Tracker Logo"
        width={width}
        height={height}
        style={{ 
          objectFit: 'contain',
          width: 'auto',
          height: 'auto'
        }}
        priority
      />
    </div>
  )
}

