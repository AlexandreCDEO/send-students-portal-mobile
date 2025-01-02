import { useStudentProfile } from '@/contexts/student-profile-context'
import { ParentList } from './parent-list'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Text } from 'react-native'

export function ProfileParents() {
  const { studentProfile } = useStudentProfile()

  if (!studentProfile) return <Text>Carregando...</Text>

  console.log('ProfileParents')

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Genitores</CardTitle>
      </CardHeader>
      <CardContent className="gap-4 native:gap-2">
        {/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
        <ParentList parents={studentProfile.profile.parents!} />
      </CardContent>
    </Card>
  )
}
