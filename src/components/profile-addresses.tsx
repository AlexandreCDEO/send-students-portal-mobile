import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import AddressList from './address-list'
import { useStudentProfile } from '@/contexts/student-profile-context'
import { Text } from 'react-native'

export function ProfileAddresses() {
  const { studentProfile } = useStudentProfile()
  console.log('ProfileAddresses')
  if (!studentProfile) return <Text>Carregando...</Text>

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Endereços</CardTitle>
      </CardHeader>
      <CardContent className="gap-4 native:gap-2">
        {/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
        <AddressList addresses={studentProfile.profile.addresses!} />
      </CardContent>
    </Card>
  )
}
