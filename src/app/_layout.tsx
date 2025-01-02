import { SafeAreaView, StatusBar } from 'react-native'
import { Slot } from 'expo-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MenuProvider } from 'react-native-popup-menu'
import { AuthContextProvider } from '@/contexts/auth-context'
import { PortalHost } from '@rn-primitives/portal'

import '../../global.css'
import { StudentProfileProvider } from '@/contexts/student-profile-context'

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <MenuProvider>
          <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
              <StudentProfileProvider>
                <Slot />
                <PortalHost />
              </StudentProfileProvider>
            </AuthContextProvider>
          </QueryClientProvider>
        </MenuProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}
