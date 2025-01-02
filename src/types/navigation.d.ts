import type { DrawerNavigationOptions } from '@react-navigation/drawer'
import type { IconNameProps } from '@/components/drawer-button'

interface CustomOptions extends DrawerNavigationOptions {
  iconName: IconNameProps
  isDivider?: boolean
  sectionTitle?: string
}
