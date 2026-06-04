export function ThinCircle({
  size,
  className,
}: {
  size: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 1}
        fill="none"
        stroke="#C9A074"
        strokeWidth="0.5"
        opacity="0.25"
      />
    </svg>
  )
}

export function LongRect({ className }: { className?: string }) {
  return (
    <svg
      width="1"
      height="160"
      viewBox="0 0 1 160"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <line
        x1="0.5"
        y1="0"
        x2="0.5"
        y2="160"
        stroke="#C9A074"
        strokeWidth="0.5"
        opacity="0.3"
      />
    </svg>
  )
}

export function DiagonalLine({ className }: { className?: string }) {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <line
        x1="0"
        y1="80"
        x2="80"
        y2="0"
        stroke="#C9A074"
        strokeWidth="0.5"
        opacity="0.2"
      />
    </svg>
  )
}

export function CrossHair({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <line x1="12" y1="0" x2="12" y2="24" stroke="#C9A074" strokeWidth="0.5" opacity="0.4" />
      <line x1="0" y1="12" x2="24" y2="12" stroke="#C9A074" strokeWidth="0.5" opacity="0.4" />
    </svg>
  )
}

export function SmallDot({ className }: { className?: string }) {
  return (
    <svg
      width="4"
      height="4"
      viewBox="0 0 4 4"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="2" cy="2" r="1.5" fill="#C9A074" opacity="0.4" />
    </svg>
  )
}
