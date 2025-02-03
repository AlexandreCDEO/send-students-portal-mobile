import { SubjectCard } from '@/components/subject-card'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native'

export type Subject = {
  name: string
  workload: number
  partialAverage: number
  finalAverage: number
  absences: number
  status: 'Aprovado' | 'Reprovado'
}

type Semester = {
  name: string
  subjects: Subject[]
}

const semesters: Semester[] = [
  {
    name: '1º Semestre',
    subjects: [
      {
        name: 'Matemática',
        workload: 60,
        partialAverage: 7.5,
        finalAverage: 8.0,
        absences: 4,
        status: 'Aprovado',
      },
      {
        name: 'Português',
        workload: 60,
        partialAverage: 6.5,
        finalAverage: 7.0,
        absences: 6,
        status: 'Aprovado',
      },
    ],
  },
  {
    name: '2º Semestre',
    subjects: [
      {
        name: 'História',
        workload: 45,
        partialAverage: 5.5,
        finalAverage: 6.0,
        absences: 8,
        status: 'Aprovado',
      },
      {
        name: 'Geografia',
        workload: 45,
        partialAverage: 4.5,
        finalAverage: 5.5,
        absences: 10,
        status: 'Reprovado',
      },
    ],
  },
]

export default function StudentBulletin() {
  return (
    <ScrollView className="bg-gray-100 flex-1 p-4">
      {semesters.map((semester, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <View key={index} className="mb-8">
          <Text className="text-xl font-semibold text-primary mb-4">
            {semester.name}
          </Text>
          {semester.subjects.map((subject, subIndex) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <SubjectCard key={subIndex} subject={subject} />
          ))}
        </View>
      ))}
    </ScrollView>
  )
}
