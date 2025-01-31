import { colors } from '@/styles/colors'
import { useRouter } from 'expo-router'
import { CircleUser, Lock, LogOut, CreditCard } from 'lucide-react-native'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'
import { StyleSheet, Text, View } from 'react-native'
import { useAuth } from '@/contexts/auth-context'
import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Button } from './ui/button'
import { StudentCard } from './student-card'

export function HeaderDropdown() {
  const router = useRouter()
  const { signOut } = useAuth()
  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      <Menu>
        <MenuTrigger>
          <CircleUser size={28} color={colors.white} />
        </MenuTrigger>
        <MenuOptions customStyles={menuOptionsStyles}>
          <MenuOption
            customStyles={{
              optionWrapper: menuOptionsStyles.optionWrapper,
            }}
            onSelect={() => router.navigate('/(drawer)/(stack)/profile')}
          >
            <View className="flex-row items-center gap-2">
              <CircleUser size={20} color={colors.blue.app} />
              <Text className="p-2 text-zinc-600">Meus Dados</Text>
            </View>
          </MenuOption>
          <MenuOption
            customStyles={{
              optionWrapper: menuOptionsStyles.optionWrapper,
            }}
            onSelect={() => setShowDialog(true)}
          >
            <View className="flex-row items-center gap-2">
              <CreditCard size={20} color={colors.blue.app} />
              <Text className="p-2 text-zinc-600">
                Carteirinha de Estudante
              </Text>
            </View>
          </MenuOption>
          <MenuOption
            customStyles={{
              optionWrapper: menuOptionsStyles.optionWrapper,
            }}
            onSelect={() =>
              router.navigate('/(drawer)/(stack)/change-password')
            }
          >
            <View className="flex-row items-center gap-2">
              <Lock size={20} color={colors.blue.app} />
              <Text className="p-2 text-zinc-600">Alterar Senha</Text>
            </View>
          </MenuOption>
          <MenuOption
            customStyles={{
              optionWrapper: menuOptionsStyles.lastOptionWrapper,
            }}
            onSelect={() => {
              signOut()
            }}
          >
            <View className="flex-row items-center gap-2">
              <LogOut size={20} color={colors.blue.app} />
              <Text className="p-2 text-zinc-600">Sair</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
      {showDialog && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <StudentCard setShowDialog={setShowDialog} />
        </Dialog>
      )}
    </>
  )
}

const menuOptionsStyles = StyleSheet.create({
  optionsContainer: {
    marginTop: 38,
    marginLeft: 13,
    width: 150,
    backgroundColor: 'white',
    borderRadius: 8,
    borderTopRightRadius: 0,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  lastOptionWrapper: {
    borderBottomWidth: 0,
  },
  optionText: {
    color: '#2d3748',
    fontSize: 16,
  },
})
