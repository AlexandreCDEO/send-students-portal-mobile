import { FileText } from 'lucide-react-native'
import { RequirementItem } from './requirement-item'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Text, View } from 'react-native'
import { colors } from '@/styles/colors'
import { useQuery } from '@tanstack/react-query'
import {
  getStudentRequirements,
  type GetStudentRequirementsResponse,
} from '@/server/student/get-student-requirements'
import React from 'react'
import { Button } from './ui/button'

export function RequirementsView() {
  const { data } = useQuery<GetStudentRequirementsResponse>({
    queryFn: getStudentRequirements,
    queryKey: ['student-requiriments'],
  })

  return (
    <>
      {data && data?.requirements.length > 0 ? (
        <Card>
          <CardHeader>
            <View className="flex-row items-center">
              <FileText
                size={20}
                color={colors.blue.app}
                style={{ marginRight: 8 }}
              />
              <Text className="text-lg font-semibold">Meus Requerimentos</Text>
            </View>
          </CardHeader>
          <CardContent className="p-4">
            <View className="gap-2">
              {data?.requirements?.slice(0, 5).map(requirement => (
                <RequirementItem
                  key={requirement.id}
                  requirement={requirement.id}
                  date={requirement.date ?? null}
                  status={requirement.status ? requirement.status : null}
                />
              ))}
            </View>
          </CardContent>
          <CardFooter>
            <Button
              onPress={() => {
                console.log('Press')
              }}
              variant="link"
              size="sm"
            >
              <Text className="text-xs text-muted-foreground">
                Pressione para visualizar todos os requerimentos
              </Text>
            </Button>
          </CardFooter>
        </Card>
      ) : null}
    </>
  )
}
