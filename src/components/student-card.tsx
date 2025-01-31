import { Text, View, Image } from 'react-native'
import { DialogClose, DialogContent } from '@/components/ui/dialog'
import { GraduationCap, QrCode, X } from 'lucide-react-native'
import { colors } from '@/styles/colors'

type StudentCardProps = {
  setShowDialog: (value: boolean) => void
}

export function StudentCard({ setShowDialog }: StudentCardProps) {
  return (
    <DialogContent className="bg-primary border-primary rounded-[1.8rem] p-0 overflow-hidden">
      <View className="relative">
        <View className="flex-row gap-4 mt-10 mx-10 items-center">
          <View className=" h-25 w-25 overflow-hidden rounded-full border-2 border-white">
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=160&h=160&auto=format&fit=crop',
              }}
              style={{ width: 100, height: 100 }}
            />
          </View>
          <View>
            <Text className="text-white text-lg font-bold">
              Estudante Silva
            </Text>
            <Text className="text-white text-base font-medium opacity-90">
              Send Educacional
            </Text>
            <Text className="text-white mt-1 text-sm opacity-80">Direito</Text>
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
              <Text className="font-semibold text-gray-700">7777-9999-10</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-medium text-gray-500">Validade</Text>
              <Text className="font-semibold text-gray-700">11/12/2026</Text>
            </View>
          </View>

          <View className="mb-6 flex items-center justify-center">
            <View className="rounded-xl bg-[#4978B0]/10 p-2">
              <QrCode size={64} color={colors.blue.app} strokeWidth={1.5} />
            </View>
          </View>
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
