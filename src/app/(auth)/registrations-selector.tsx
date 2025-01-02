import RegistrationCard from '@/components/registration-card'
import { StudentPortalLogo } from '@/components/student-portal-logo'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FlatList, View } from 'react-native'
import React, { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const registrations = [
  { code: '1', course: 'ADS' },
  { code: '2', course: 'SI' },
]

export default function RegistrationsSelector() {
  const [message, setMessage] = useState<string | null>(null)

  function handleSetMessage(message: string | null) {
    setMessage(message)
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-50">
      <Card className="w-[80%]">
        <CardHeader className="gap-5">
          <StudentPortalLogo />
        </CardHeader>
        {message && (
          <Alert>
            <AlertTitle>Ocorreu um Erro</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        <CardContent>
          <FlatList
            data={registrations}
            renderItem={({ item }) => (
              <RegistrationCard
                registration={item}
                handleSetMessage={handleSetMessage}
              />
            )}
            keyExtractor={item => item.code}
          />
        </CardContent>
      </Card>
    </View>
  )
}
