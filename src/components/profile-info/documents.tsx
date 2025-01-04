import React, { useMemo } from 'react'
import { memo } from 'react'
import { View, Text } from 'react-native'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

interface ProfileInfoDocumentsProps {
  RG: string | null
  UFRG: string | null
  issuingAgency: string | null
}

export const ProfileInfoDocuments = memo(
  ({ RG, UFRG, issuingAgency }: ProfileInfoDocumentsProps) => {
    const formattedRG = useMemo(() => {
      return RG?.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4')
    }, [RG])

    return (
      <>
        {RG ? (
          <View className="gap-1">
            <Label nativeID="RG">RG</Label>
            <Input
              aria-aria-labelledby="RG"
              editable={false}
              value={formattedRG}
            />
          </View>
        ) : null}

        {UFRG ? (
          <View className="gap-1">
            <Label nativeID="UF-RG">
              <Text className="text-sm text-zinc-500 native:text-base font-semibold leading-none web:peer-disabled:cursor-not-allowed web:peer-disabled:opacity-70">
                UF-RG
              </Text>
            </Label>
            <Input
              aria-labelledby="UF-RG"
              editable={false}
              value={UFRG ?? ''}
            />
          </View>
        ) : null}

        {issuingAgency ? (
          <View className="gap-1">
            <Label nativeID="issuingAgency">Orgão Expedidor - RG</Label>
            <Input
              aria-aria-labelledby="issuingAgency"
              editable={false}
              value={issuingAgency.toUpperCase()}
            />
          </View>
        ) : null}
      </>
    )
  }
)
