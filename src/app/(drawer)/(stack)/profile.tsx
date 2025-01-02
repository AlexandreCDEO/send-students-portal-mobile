import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollView, View } from 'react-native'
import { Text } from '@/components/ui/text'
import { ProfileInfo } from '@/components/profile-info'
import { ProfileAddresses } from '@/components/profile-addresses'
import { ProfileParents } from '@/components/profile-parents'
import { getStudentProfile } from '@/server/student/get-student-profile'
import { useState, useEffect } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useQuery } from '@tanstack/react-query'
import { useStudentProfile } from '@/contexts/student-profile-context'
import { User, MapPin, Users } from 'lucide-react-native'
import { colors } from '@/styles/colors'
import { ProfileSkeleton } from '@/components/profile-skeleton'

export default function Profile() {
  const [value, setValue] = useState('info')
  const [message, setMessage] = useState<string | null>(null)

  const { handleSetStudentProfile } = useStudentProfile()

  const {
    data: studentProfileData,
    isError,
    error,
  } = useQuery({
    queryKey: ['student-profile'],
    queryFn: getStudentProfile,
  })

  if (isError) setMessage(error.message)

  useEffect(() => {
    if (studentProfileData) {
      handleSetStudentProfile(studentProfileData)
    }
  })

  if (!studentProfileData) {
    return <ProfileSkeleton />
  }

  return (
    <View className="flex-1 px-6 py-10">
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

          {studentProfileData?.profile.parents &&
          studentProfileData?.profile.parents.length > 0 ? (
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
          ) : null}
        </TabsList>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TabsContent value="info">
            {message && (
              <Alert>
                <AlertTitle>Ocorreu um erro</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
            <ProfileInfo />
          </TabsContent>

          <TabsContent value="addresses">
            <ProfileAddresses />
          </TabsContent>

          <TabsContent value="parent">
            <ProfileParents />
          </TabsContent>
        </ScrollView>
      </Tabs>
    </View>
  )
}
