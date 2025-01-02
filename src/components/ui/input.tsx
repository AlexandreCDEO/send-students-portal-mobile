import * as React from 'react'
import {
  TextInput,
  type TextInputProps,
  View,
  TouchableOpacity,
} from 'react-native'
import { cn } from '@/lib/utils'
import { Ionicons } from '@expo/vector-icons'
const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TextInputProps
>(({ className, placeholderClassName, secureTextEntry, ...props }, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <View style={{ position: 'relative', width: '100%' }}>
      <TextInput
        ref={ref}
        className={cn(
          'web:flex h-10 native:h-10 py-2 web:w-full rounded-md border border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-base native:leading-[1.25] text-zinc-600 placeholder:text-zinc-400 web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
          props.editable === false && 'opacity-80 web:cursor-not-allowed',
          className
        )}
        placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        {...props}
      />
      {secureTextEntry && (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={{
            position: 'absolute',
            right: 10,
            top: '50%',
            transform: [{ translateY: -12 }],
          }}
        >
          <Ionicons
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color="#4978B0"
          />
        </TouchableOpacity>
      )}
    </View>
  )
})

Input.displayName = 'Input'

export { Input }
