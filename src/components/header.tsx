import { useAuth } from '@/contexts/auth-context'
import { colors } from '@/styles/colors'
import { DrawerActions } from '@react-navigation/native'
import { useNavigation, useRouter } from 'expo-router'
import { GraduationCap, Menu as MenuIcon } from 'lucide-react-native'
import { View, Text, Pressable } from 'react-native'
import { HeaderDropdown } from './header-dropdown'

export function Header() {
  const navigation = useNavigation()

  const toggleMenu = () => navigation.dispatch(DrawerActions.toggleDrawer())

  return (
    <View className="bg-primary px-4 py-3 flex-row justify-between items-center relative z-10">
      <Pressable onPress={toggleMenu}>
        <MenuIcon color={colors.white} size={28} />
      </Pressable>

      <View className="flex-row items-center">
        <GraduationCap color="white" size={28} />
        <Text className="text-white font-bold text-xl ml-3 tracking-wide">
          Send
        </Text>
      </View>

      <HeaderDropdown />
    </View>
  )
}
