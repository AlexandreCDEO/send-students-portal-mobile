import React from 'react'
import { View, Text } from 'react-native'
import type { UpdateProfileSchema } from '@/types/profile/update-profile-schema'
import { memo } from 'react'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface RaceSelectProps {
  control: Control<UpdateProfileSchema>
  errors: FieldErrors<UpdateProfileSchema>
  raceSelected: string
  setRaceSelected: (value: string) => void
  currentRaceLabel: string
  raceList: { value: string; label: string }[]
  contentInsets: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export const RaceSelect = memo(
  ({
    contentInsets,
    control,
    currentRaceLabel,
    errors,
    raceSelected,
    setRaceSelected,
    raceList,
  }: RaceSelectProps) => {
    return (
      <View className="gap-1">
        <Label nativeID="race">Raça</Label>
        <Controller
          name="race"
          control={control}
          defaultValue={Number(raceSelected)}
          render={({ field: { onChange, value } }) => (
            <>
              <Select
                defaultValue={{
                  value: value.toString(),
                  label: currentRaceLabel,
                }}
                onValueChange={value => {
                  onChange(value?.value ?? '99')
                  setRaceSelected(value?.value ?? '99')
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    className="text-zinc-600 text-sm native:text-lg"
                    placeholder="Selecione uma raça"
                  >
                    <Text>{currentRaceLabel}</Text>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent insets={contentInsets} className="w-[250px]">
                  <SelectGroup>
                    {raceList.map(race => (
                      <SelectItem
                        key={race.value}
                        value={race.value}
                        label={race.label}
                      >
                        <Text>{race.label}</Text>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.race && (
                <Text className="text-red-400">{errors.race.message}</Text>
              )}
            </>
          )}
        />
      </View>
    )
  }
)
