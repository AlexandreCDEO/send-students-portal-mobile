import type React from 'react'
import { Text, View } from 'react-native'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        secondary: 'bg-secondary',
        destructive: 'bg-destructive',
        outline: 'border border-input',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  className?: string
  textClassName?: string
  children?: React.ReactNode
}

function Badge({
  className,
  textClassName,
  variant,
  children,
  ...props
}: BadgeProps) {
  return (
    <View className={cn(badgeVariants({ variant }), className)} {...props}>
      <Text
        className={cn(
          'text-xs font-semibold',
          variant === 'default' && 'text-primary-foreground',
          variant === 'secondary' && 'text-secondary-foreground',
          variant === 'destructive' && 'text-destructive-foreground',
          variant === 'outline' && 'text-foreground',
          textClassName
        )}
      >
        {children}
      </Text>
    </View>
  )
}

export { Badge, badgeVariants }
