import { View, Pressable, type PressableProps, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import clsx from 'clsx'
import { colors } from '@/styles/colors'

export type IconNameProps = keyof typeof MaterialIcons.glyphMap

type DrawerButtonProps = PressableProps & {
  title: string
  isFocused?: boolean
  isDivider?: boolean
  iconName: IconNameProps
}

export function DrawerButton({
  title,
  iconName,
  isFocused,
  isDivider,
  ...rest
}: DrawerButtonProps) {
  return (
    <Pressable
      className={clsx('w-full', {
        'border-b ml-10 border-gray-500': isDivider,
      })}
      {...rest}
    >
      <View
        className={clsx('flex-row items-center gap-4 h-14 px-6 -ml-2', {
          '-ml-14': isDivider,
          'bg-gray-100 rounded-r-full': isFocused,
        })}
      >
        <MaterialIcons
          name={iconName}
          size={20}
          color={isFocused ? colors.blue.app : '#6b7280'}
        />
        <Text
          style={{ color: isFocused ? colors.blue.app : '#6b7280' }}
          className={clsx('font-subtitle text-base flex-1')}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  )
}
