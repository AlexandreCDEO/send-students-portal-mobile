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

const generateRandomGrade = () => Math.round(Math.random() * 10 * 10) / 10

const generateSubject = (name: string, workload: number): Subject => {
  const partialAverage = generateRandomGrade()
  const finalAverage = generateRandomGrade()
  return {
    name,
    workload,
    partialAverage,
    finalAverage,
    absences: Math.floor(Math.random() * 15),
    status: finalAverage > 6 ? 'Aprovado' : 'Reprovado',
  }
}

const semesters: Semester[] = [
  {
    name: '1º Semestre',
    subjects: [
      generateSubject('Matemática', 60),
      generateSubject('Português', 60),
      generateSubject('Introdução à Computação', 45),
      generateSubject('Química', 50),
      generateSubject('Biologia', 50),
      generateSubject('Física', 60),
    ],
  },
  {
    name: '2º Semestre',
    subjects: [
      generateSubject('História', 45),
      generateSubject('Geografia', 45),
      generateSubject('Álgebra Linear', 60),
      generateSubject('Programação I', 60),
      generateSubject('Desenho Técnico', 50),
      generateSubject('Sociologia', 40),
    ],
  },
  {
    name: '3º Semestre',
    subjects: [
      generateSubject('Cálculo I', 60),
      generateSubject('Banco de Dados I', 60),
      generateSubject('Redes de Computadores', 50),
      generateSubject('Sistemas Operacionais', 60),
      generateSubject('Física II', 50),
      generateSubject('Lógica de Programação', 60),
    ],
  },
  {
    name: '4º Semestre',
    subjects: [
      generateSubject('Cálculo II', 60),
      generateSubject('Banco de Dados II', 60),
      generateSubject('Engenharia de Software', 60),
      generateSubject('Inteligência Artificial', 60),
      generateSubject('Administração de Sistemas', 50),
      generateSubject('Segurança da Informação', 50),
    ],
  },
  {
    name: '5º Semestre',
    subjects: [
      generateSubject('Computação Gráfica', 50),
      generateSubject('Programação II', 60),
      generateSubject('Machine Learning', 60),
      generateSubject('Estruturas de Dados', 60),
      generateSubject('Desenvolvimento Web', 60),
      generateSubject('Análise de Algoritmos', 50),
    ],
  },
  {
    name: '6º Semestre',
    subjects: [
      generateSubject('Projeto Integrador', 60),
      generateSubject('Internet das Coisas', 60),
      generateSubject('Sistemas Distribuídos', 60),
      generateSubject('Computação em Nuvem', 60),
      generateSubject('Empreendedorismo', 40),
      generateSubject('Governança de TI', 50),
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
