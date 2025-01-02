import type { DrawerContentComponentProps } from '@react-navigation/drawer'
import { View, Text, ScrollView } from 'react-native'
import { GraduationCap } from 'lucide-react-native'

import { colors } from '@/styles/colors'
import { DrawerButton } from '@/components/drawer-button'
import type { CustomOptions } from '@/types/navigation'

export function DrawerContent(drawerProps: DrawerContentComponentProps) {
  return (
    <View className="flex-1 overflow-hidden">
      <View className="flex-row gap-2 items-center justify-center mt-5 w-full border-b pb-6 border-primary">
        <GraduationCap color={colors.blue.app} size={30} />
        <Text className="font-bold text-primary text-xl ml-3 tracking-wide">
          Send
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 42 }}
      >
        <View className="mt-2">
          {drawerProps.state.routes.map((rounte, index) => {
            const isFocused = drawerProps.state.index === index

            const options = drawerProps.descriptors[rounte.key]
              .options as CustomOptions

            if (options.title === undefined) {
              return
            }

            const onPress = () => {
              const event = drawerProps.navigation.emit({
                type: 'drawerItemPress',
                canPreventDefault: true,
                target: rounte.key,
              })

              if (!isFocused && !event.defaultPrevented) {
                drawerProps.navigation.navigate(rounte.name, rounte.params)
              }
            }

            return (
              <View key={rounte.key}>
                {options.sectionTitle && (
                  <Text className="text-primary text-sm font-semibold uppercase ml-4 mt-6">
                    {options.sectionTitle}
                  </Text>
                )}
                <DrawerButton
                  onPress={onPress}
                  title={options.title}
                  iconName={options.iconName}
                  isFocused={isFocused}
                  isDivider={options.isDivider}
                />
              </View>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}
