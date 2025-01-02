import { DrawerContent } from '@/components/drawer-content'
import { Header } from '@/components/header'
import type { CustomOptions } from '@/types/navigation'
import Drawer from 'expo-router/drawer'

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        header: () => <Header />,
        headerShown: true,
        drawerStyle: {
          width: '65%',
        },
      }}
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="home"
        options={{ title: 'Início', iconName: 'home' } as CustomOptions}
      />

      <Drawer.Screen
        name="academic-calendar"
        options={
          { title: 'Calendário Acadêmico', iconName: 'event' } as CustomOptions
        }
      />
    </Drawer>
  )
}
