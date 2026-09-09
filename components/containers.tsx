import React from 'react';
import { cn } from "@/lib/utils"
const Container = ({ children, className }: {
  children: React.ReactNode,
  className?: string,
}) => {
  // No background of its own — the carbon spotlight backdrop shows through.
  return (
    <div className={cn("relative max-w-4xl mx-auto w-full h-full px-8 sm:px-10 md:px-14", className)}>{children}</div>
  )
}

export default Container;