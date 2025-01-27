import { BookOpen } from 'lucide-react-native'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { colors } from '@/styles/colors'
import { EvaluationItem } from './evaluation-item'
import { View, Text } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import {
  getStudentAssessments,
  type GetStudentAssessmentsResponse,
} from '@/server/student/get-student-assessments'
import React from 'react'
import { Button } from './ui/button'

export function EvaluationsView() {
  const { data } = useQuery<GetStudentAssessmentsResponse>({
    queryFn: getStudentAssessments,
    queryKey: ['student-assessments'],
  })

  return (
    <>
      {data && data?.assessments?.length > 0 ? (
        <Card>
          <CardHeader>
            <View className="flex-row items-center">
              <BookOpen
                style={{ marginRight: 8 }}
                color={colors.blue.app}
                size={20}
              />
              <Text className="text-lg font-semibold">Últimas Avaliações</Text>
            </View>
          </CardHeader>
          <CardContent className="p-4 gap-4">
            <View className="gap-2">
              {data?.assessments?.slice(0, 5).map((assessment, index) => (
                <EvaluationItem
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index}
                  discipline={assessment.discipline ?? 'Sem disciplina'}
                  evaluation={assessment.assessment ?? 'Sem avaliação'}
                  grade={assessment.note ?? 0}
                  weight={assessment.weight ?? 0}
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
                Pressione para visualizar todas avaliações
              </Text>
            </Button>
          </CardFooter>
        </Card>
      ) : null}
    </>
  )
}
