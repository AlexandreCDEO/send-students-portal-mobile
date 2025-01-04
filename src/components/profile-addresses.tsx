import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import AddressList, { type Address } from './address-list'

interface ProfileAddressesProps {
  addresses: Address[]
}

export function ProfileAddresses({ addresses }: ProfileAddressesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Endereços</CardTitle>
      </CardHeader>
      <CardContent className="gap-4 native:gap-2">
        <AddressList addresses={addresses} />
      </CardContent>
    </Card>
  )
}
