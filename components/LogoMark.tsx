'use client'

import Image from 'next/image'
import { useState } from 'react'

interface LogoMarkProps {
  height?: number
}

export function LogoMark({ height = 56 }: LogoMarkProps) {
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return (
      <span
        className="font-display text-text tracking-wider"
        style={{ fontSize: `${height * 0.48}px`, letterSpacing: '0.2em' }}
        aria-label="Studio III Tattoo Studio"
      >
        Studio <span style={{ color: '#C9A074' }}>III</span>
      </span>
    )
  }

  // Intrinsic: 1024×464, display at fixed height with auto width
  return (
    <Image
      src="/studio3-logo.png"
      alt="Studio III"
      width={1024}
      height={464}
      className="object-contain"
      style={{ height: `${height}px`, width: 'auto' }}
      onError={() => setImgError(true)}
      priority
    />
  )
}
