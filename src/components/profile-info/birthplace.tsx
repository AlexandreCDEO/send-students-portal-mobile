import React, { memo } from 'react'
import { View } from 'react-native'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

interface ProfileInfoBirthplaceProps {
  city: string | null
  UF: string | null
  country: string | null
}

export const ProfileInfoBirthplace = memo(
  ({ city, UF, country }: ProfileInfoBirthplaceProps) => {
    return (
      <>
        {city ? (
          <View className="gap-1">
            <Label nativeID="city">Município</Label>
            <Input aria-aria-labelledby="city" editable={false} value={city} />
          </View>
        ) : null}

        {UF ? (
          <View className="gap-1">
            <Label nativeID="UF">UF</Label>
            <Input aria-aria-labelledby="UF" editable={false} value={UF} />
          </View>
        ) : null}

        {country ? (
          <View className="gap-1">
            <Label nativeID="country">País</Label>
            <Input
              aria-aria-labelledby="country"
              editable={false}
              value={country}
            />
          </View>
        ) : null}
      </>
    )
  }
)
