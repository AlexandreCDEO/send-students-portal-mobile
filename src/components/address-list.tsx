import { View, Text } from 'react-native'
import {
  Building,
  Globe,
  Home,
  MapPin,
  MapIcon as City,
  Phone,
} from 'lucide-react-native'
import { colors } from '@/styles/colors'

export interface Address {
  type: string | null
  CEP: string | null
  street: string | null
  number: string | null
  complement: string | null
  neighborhood: string | null
  city: string | null
  UF: string | null
  country: string | null
  phone: {
    ddi: number | null
    ddd: number | null
    number: number | null
  } | null
}

const AddressCard: React.FC<{ address: Address }> = ({ address }) => (
  <View className="bg-white rounded-lg shadow-md p-6 px-8 mb-4 border-l-4 border-primary">
    <View className="flex-row items-center justify-between mb-4">
      <Text className="text-lg font-semibold text-primary">{address.type}</Text>
      <Text className="text-sm text-primary">
        {address.CEP
          ? `${address.CEP.slice(0, 5)}-${address.CEP.slice(5)}`
          : ''}
      </Text>
    </View>
    <View className="gap-3">
      <View className="flex-row items-center gap-2">
        <MapPin color={colors.blue.app} size={20} />
        <Text className="text-zinc-600">
          {address.street}, {address.number}
        </Text>
      </View>
      {address.complement && (
        <View className="flex-row items-center gap-2">
          <Home color={colors.blue.app} size={20} />
          <Text className="text-zinc-600">{address.complement}</Text>
        </View>
      )}
      <View className="flex-row items-center gap-2">
        <Building color={colors.blue.app} size={20} />
        <Text className="text-zinc-600">{address.neighborhood}</Text>
      </View>
      <View className="flex-row items-center gap-2">
        <City color={colors.blue.app} size={20} />
        <Text className="text-zinc-600">
          {address.city}, {address.UF}
        </Text>
      </View>
      <View className="flex-row items-center gap-2">
        <Globe color={colors.blue.app} size={20} />
        <Text className="text-zinc-600">{address.country}</Text>
      </View>
      <View className="flex-row items-center gap-2">
        <Phone color={colors.blue.app} size={20} />
        <Text className="text-zinc-600">{`+${address.phone?.ddi} (${address.phone?.ddd}) ${address.phone?.number}`}</Text>
      </View>
    </View>
  </View>
)

const AddressList: React.FC<{ addresses: Address[] }> = ({ addresses }) => {
  return addresses.map((address, index) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
    <AddressCard key={index} address={address} />
  ))
}

export default AddressList
