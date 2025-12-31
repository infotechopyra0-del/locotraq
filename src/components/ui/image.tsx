import * as React from "react"
import NextImage from "next/image"
import { cn } from "@/lib/utils"

interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, src, alt, width, height, fill, ...props }, ref) => {
    if (fill) {
      return (
        <NextImage
          ref={ref}
          src={src}
          alt={alt}
          fill
          className={cn("object-cover", className)}
          {...props}
        />
      )
    }

    return (
      <NextImage
        ref={ref}
        src={src}
        alt={alt}
        width={width || 400}
        height={height || 300}
        className={cn("", className)}
        {...props}
      />
    )
  }
)

Image.displayName = "Image"