import { Text, View, Image } from 'react-native'
import { DialogClose, DialogContent } from '@/components/ui/dialog'
import { GraduationCap, X } from 'lucide-react-native'
import { colors } from '@/styles/colors'
import { useQuery } from '@tanstack/react-query'
import { getStudentCard } from '@/server/student/get-student-card'
import { format } from 'date-fns'
import { QRCodeGenerator } from './qr-code'

type StudentCardProps = {
  setShowDialog: (value: boolean) => void
}

export function StudentCard({ setShowDialog }: StudentCardProps) {
  const { data: studentCardData } = useQuery({
    queryKey: ['student-card'],
    queryFn: getStudentCard,
  })

  return (
    <DialogContent className="max-w-[90%] bg-primary border-primary rounded-[1.8rem] p-0 overflow-hidden">
      <View className="relative">
        <View className="gap-4 mt-10 mx-10 items-center">
          <View className=" h-25 w-25 overflow-hidden rounded-full border-2 border-white">
            <Image
              source={{
                uri: studentCardData?.avatar ?? '',
              }}
              style={{ width: 100, height: 100 }}
            />
          </View>
          <View className="max-w-[95%]">
            <Text className="text-white text-lg font-bold">
              {studentCardData?.name}
            </Text>
            <Text className="text-white mt-1 text-sm opacity-80">
              {studentCardData?.course}
            </Text>
          </View>
        </View>
        <View className="mt-8 gap-4 rounded-t-[1.8rem] bg-white px-4 pb-4 pt-10 shadow-[0_-0.5rem_1.5rem_rgba(0,0,0,0.1)]">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <View className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4978B0] p-2">
                <GraduationCap size={24} color={colors.white} />
              </View>
              <Text className="text-lg font-bold text-[#4978B0]">
                Send Educacional
              </Text>
            </View>
            <View className="rounded-full bg-[#4978B0]/10 px-2 py-1 text-xs font-semibold text-[#4978B0]">
              <Text>ATIVO</Text>
            </View>
          </View>

          <View className="gap-2 rounded-xl bg-gray-50 p-3 text-sm">
            <View className="flex-row justify-between">
              <Text className="font-medium text-gray-500">Registro</Text>
              <Text className="font-semibold text-gray-700">
                {studentCardData?.registration.trim()}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-medium text-gray-500">Validade</Text>
              <Text className="font-semibold text-gray-700">
                {studentCardData?.FinalDatePeriod
                  ? format(
                      new Date(studentCardData.FinalDatePeriod),
                      'dd/MM/yyyy'
                    )
                  : ''}
              </Text>
            </View>
          </View>

          {studentCardData?.registration && (
            <View className="mb-8 flex items-center justify-center">
              <View className="rounded-xl bg-[#4978B0]/10 p-2">
                <QRCodeGenerator
                  value={studentCardData?.registration}
                  size={80}
                />
              </View>
            </View>
          )}
        </View>
        <DialogClose
          onPress={() => {
            setShowDialog(false)
          }}
          className="absolute top-0 right-0 mt-4 mr-4"
        >
          <X size={18} color={colors.white} />
        </DialogClose>
      </View>
    </DialogContent>
  )
}
