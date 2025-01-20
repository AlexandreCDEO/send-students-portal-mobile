import React from 'react'
import { Tabs } from 'expo-router'
import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'

export default function HomeTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 0,
          minHeight: 74,
        },
        tabBarItemStyle: {
          paddingBottom: 34,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '500',
        },
        tabBarActiveTintColor: colors.blue.app,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="auto-stories" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Recados',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="notifications" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
