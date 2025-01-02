// components/Alert.tsx

import React from 'react'
import { View, Text, type ViewProps, type TextProps } from 'react-native'
import { Info, AlertCircle } from 'lucide-react-native'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

const alertVariants = cva(
  'w-full rounded-lg border px-4 py-3 text-sm flex flex-row items-start',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 border-gray-300 text-gray-700',
        destructive: 'bg-red-50 border-red-300 text-red-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

// Tipagem das propriedades do Alert
type AlertProps = ViewProps & {
  variant?: 'default' | 'destructive' // Excluir 'null' explicitamente
}

// Mapeamento das variantes para ícones e cores
const iconMap: Record<
  'default' | 'destructive',
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  { icon: React.ComponentType<any>; color: string }
> = {
  default: {
    icon: Info,
    color: '#1F2937', // Tailwind 'text-gray-700'
  },
  destructive: {
    icon: AlertCircle,
    color: '#f87171', // Tailwind 'text-red-500'
  },
}

// Componente Alert
export const Alert = React.forwardRef<View, AlertProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const { icon: IconComponent, color } = iconMap[variant]

    return (
      <View
        ref={ref}
        accessibilityRole="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <IconComponent
          size={20}
          color={color}
          style={{ marginRight: 5, marginTop: 2 }}
        />
        <View style={{ flex: 1 }}>{children}</View>
      </View>
    )
  }
)

Alert.displayName = 'Alert'

// Componente AlertTitle
type AlertTitleProps = TextProps

export const AlertTitle = React.forwardRef<Text, AlertTitleProps>(
  ({ className, children, ...props }, ref) => (
    <Text
      ref={ref}
      className={cn('text-red-400 mb-1 font-medium text-base', className)}
      {...props}
    >
      {children}
    </Text>
  )
)

AlertTitle.displayName = 'AlertTitle'

// Componente AlertDescription
type AlertDescriptionProps = TextProps

export const AlertDescription = React.forwardRef<Text, AlertDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <Text
      ref={ref}
      className={cn('text-red-400 text-sm leading-relaxe', className)}
      {...props}
    >
      {children}
    </Text>
  )
)

AlertDescription.displayName = 'AlertDescription'
