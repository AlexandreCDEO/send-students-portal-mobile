import type { UpdateProfileSchema } from '@/types/profile/update-profile-schema'
import React, { memo } from 'react'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { View, Text } from 'react-native'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

interface PhoneInputProps {
  control: Control<UpdateProfileSchema>
  errors: FieldErrors<UpdateProfileSchema>
  ddi?: number | null
  ddd?: number | null
  number?: number | null
}

export const PhoneInput = memo(
  ({ control, errors, ddi, ddd, number }: PhoneInputProps) => {
    return (
      <View className="gap-1">
        <Label>Telefone</Label>
        <View className="flex-row items-center rounded-md gap-1">
          <View className="bg-gray-100 px-2 py-2 rounded-l-md justify-center items-center">
            <Text className="text-sm text-zinc-600">{ddi}</Text>
          </View>
          <View>
            <Controller
              name="phone.ddd"
              control={control}
              defaultValue={ddd ?? 0}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Input
                    className="w-12"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value.toString()}
                    keyboardType="numeric"
                    maxLength={2}
                  />
                </>
              )}
            />
          </View>

          <View className="flex-1">
            <Controller
              name="phone.number"
              control={control}
              defaultValue={number ?? 0}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Input
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value.toString()}
                    keyboardType="numeric"
                    maxLength={9}
                  />
                </>
              )}
            />
          </View>
        </View>
        {errors.phone?.ddd && (
          <Text className="text-red-400">{errors.phone?.ddd?.message}</Text>
        )}
        {errors.phone?.number && (
          <Text className="text-red-400">{errors.phone?.number?.message}</Text>
        )}
      </View>
    )
  }
)
