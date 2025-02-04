import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollView, View } from 'react-native'
import { Text } from '@/components/ui/text'
import { ProfileInfo } from '@/components/profile-info'
import { ProfileAddresses } from '@/components/profile-addresses'
import { ProfileParents } from '@/components/profile-parents'
import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { User, MapPin, Users } from 'lucide-react-native'
import { colors } from '@/styles/colors'
import { ProfileSkeleton } from '@/components/profile-skeleton'
import { useStudentProfileData } from '@/hooks/student-profile-data'

export default function Profile() {
  const [value, setValue] = useState('info')
  const { profile, parents, addresses, isError, error } =
    useStudentProfileData()

  if (!profile) {
    return <ProfileSkeleton />
  }

  return (
    <View className="flex-1 px-6 py-10 mb-8">
      <Tabs
        value={value}
        onValueChange={setValue}
        className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
      >
        <TabsList className="flex-row w-full">
          <TabsTrigger
            value="info"
            className="flex-1 flex-row items-center gap-1.5"
          >
            <User
              size={16}
              color={value === 'info' ? colors.blue.app : '#52525b'}
            />
            <Text>Informações</Text>
          </TabsTrigger>

          {addresses.length > 0 && (
            <TabsTrigger
              value="addresses"
              className="flex-1 flex-row items-center gap-1.5"
            >
              <MapPin
                size={16}
                color={value === 'addresses' ? colors.blue.app : '#52525b'}
              />
              <Text>Endereços</Text>
            </TabsTrigger>
          )}

          {parents.length > 0 && (
            <TabsTrigger
              value="parent"
              className="flex-1 flex-row items-center gap-1.5"
            >
              <Users
                size={16}
                color={value === 'parent' ? colors.blue.app : '#52525b'}
              />
              <Text>Genitores</Text>
            </TabsTrigger>
          )}
        </TabsList>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TabsContent value="info">
            {isError && (
              <Alert>
                <AlertTitle>Ocorreu um erro</AlertTitle>
                <AlertDescription>{error?.message}</AlertDescription>
              </Alert>
            )}
            <ProfileInfo profile={profile} />
          </TabsContent>

          <TabsContent value="addresses">
            <ProfileAddresses addresses={addresses} />
          </TabsContent>

          <TabsContent value="parent">
            <ProfileParents parents={parents} />
          </TabsContent>
        </ScrollView>
      </Tabs>
    </View>
  )
}
