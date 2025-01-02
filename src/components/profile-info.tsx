import { View } from 'react-native'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Text } from './ui/text'
import { useStudentProfile } from '@/contexts/student-profile-context'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import { getRaceLabel, raceList } from '@/constants/races'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getGenres, type Genre } from '@/server/general/get-genres'
import { ProfileInfoSkeleton } from './profile-info-skeleton'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { updateStudentProfile } from '@/server/student/update-profile'
import { useRouter } from 'expo-router'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { getErrorMessage } from '@/utils/get-error-message'

const updateProfileSchema = z.object({
  gender: z.number().int().min(1, 'Gênero é obrigatório'),
  mail: z.string().email('Email inválido').nonempty('Email é obrigatório'),
  phone: z.object({
    ddd: z
      .number()
      .int()
      .min(10, 'DDD deve ter 2 caracteres')
      .max(99, 'DDD deve ter 2 caracteres'),
    number: z
      .number()
      .int()
      .min(10000000, 'Número de telefone deve ter entre 8 e 9 caracteres')
      .max(999999999, 'Número de telefone deve ter entre 8 e 9 caracteres'),
  }),
  race: z.coerce.number().int().min(1, 'Raça é obrigatória'),
})

type UpdateProfileSchema = z.infer<typeof updateProfileSchema>

export function ProfileInfo() {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
  })

  const { studentProfile } = useStudentProfile()

  const [raceSelected, setRaceSelected] = useState<string>(
    studentProfile.profile?.race?.toString() ?? '99'
  )

  const [genres, setGenres] = useState<Genre[]>([])

  const [studentGenre, setStudentGenre] = useState<number | null>(
    studentProfile.profile?.genderId
  )

  const [message, setMessage] = useState<string | null>(null)

  const currentRaceLabel = getRaceLabel(raceSelected)
  const currentGenreLabel =
    genres.find(genre => genre.id === studentGenre)?.name ??
    'SELECIONE UM GÊNERO'

  const insets = useSafeAreaInsets()

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  }

  const { data: genresData } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
    staleTime: 1000 * 60 * 60, // 60 minutes
  })

  const updateProfileMutation = useMutation({
    mutationFn: updateStudentProfile,
    onSuccess: () => {
      setMessage(null)
      router.back()
    },
    onError: error => {
      const errorMessage = getErrorMessage(error)
      setMessage(errorMessage)
    },
  })

  function handleUpdateProfile(data: UpdateProfileSchema) {
    updateProfileMutation.mutate({
      gender: data.gender,
      mail: data.mail,
      race: data.race,
      phone: {
        ddd: data.phone.ddd,
        number: data.phone.number,
      },
    })
  }

  useEffect(() => {
    if (genresData) {
      setGenres(genresData)
    }
  }, [genresData])

  if (!studentProfile.profile) {
    return <ProfileInfoSkeleton />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Informações Gerais</CardTitle>
      </CardHeader>
      <CardContent className="gap-4 native:gap-2">
        {message && (
          <Alert variant="destructive">
            <AlertTitle>Ocorreu um Erro</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        {studentProfile.profile?.name && (
          <View className="gap-1">
            <Label nativeID="name">Name</Label>
            <Input
              aria-aria-labelledby="name"
              editable={false}
              value={studentProfile.profile?.name ?? ''}
            />
          </View>
        )}

        {studentProfile.profile?.socialName && (
          <View className="gap-1">
            <Label nativeID="socialName">Nome Social</Label>
            <Input
              aria-aria-labelledby="socialName"
              editable={false}
              value={studentProfile.profile?.socialName}
            />
          </View>
        )}

        {studentProfile.profile?.sex && (
          <View className="gap-1">
            <Label nativeID="sex">Sexo</Label>
            <Input
              aria-aria-labelledby="sex"
              editable={false}
              value={
                studentProfile.profile.sex
                  ? studentProfile.profile.sex === 'F'
                    ? 'FEMININO'
                    : studentProfile.profile.sex === 'M'
                      ? 'MASCULINO'
                      : studentProfile.profile.sex
                  : ''
              }
            />
          </View>
        )}

        {genres.length > 0 && (
          <View className="gap-1">
            <Label nativeID="gender">Gênero/Orientação</Label>

            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange, value } }) => (
                <>
                  <Select
                    defaultValue={{
                      value: studentGenre?.toString() ?? '',
                      label: currentGenreLabel,
                    }}
                    onValueChange={option => {
                      if (option) {
                        setStudentGenre(Number(option.value) ?? null)
                        onChange(Number(option.value) ?? null)
                      }
                    }}
                    value={{
                      value: value?.toString() ?? '',
                      label: currentGenreLabel,
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        className="text-zinc-600 text-sm native:text-lg"
                        placeholder="SELECIONE UM GÊNERO"
                      >
                        <Text>{currentGenreLabel}</Text>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent insets={contentInsets} className="w-[250px]">
                      <SelectGroup>
                        {genres.map(genre => (
                          <SelectItem
                            key={genre.id}
                            value={genre.id.toString()}
                            label={genre.name}
                          >
                            <Text>{genre.name}</Text>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <Text className="text-red-400">
                      {errors.gender.message}
                    </Text>
                  )}
                </>
              )}
            />
          </View>
        )}

        {studentProfile.profile?.birth && (
          <View className="gap-1">
            <Label nativeID="birth">Nascimento</Label>
            <Input
              aria-aria-labelledby="birth"
              editable={false}
              value={new Date(studentProfile.profile?.birth).toLocaleDateString(
                'pt-BR'
              )}
            />
          </View>
        )}

        {studentProfile.profile?.document && (
          <View className="gap-1">
            <Label nativeID="document">CPF</Label>
            <Input
              aria-aria-labelledby="document"
              editable={false}
              value={studentProfile.profile?.document.replace(
                /(\d{3})(\d{3})(\d{3})(\d{2})/,
                '$1.$2.$3-$4'
              )}
            />
          </View>
        )}

        <View className="gap-1">
          <Label nativeID="mail">Email</Label>
          <Controller
            name="mail"
            control={control}
            defaultValue={studentProfile.profile?.mail ?? ''}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  aria-labelledby="mail"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
                {errors.mail && (
                  <Text className="text-red-400">{errors.mail.message}</Text>
                )}
              </>
            )}
          />
        </View>

        <View className="gap-1">
          <Label nativeID="phone">Telefone</Label>
          <View className="flex-row items-center rounded-md gap-1">
            <View className="bg-gray-100 px-2 py-2 rounded-l-md justify-center items-center">
              <Text className="text-sm text-zinc-600">
                {studentProfile.profile.phone?.ddi}
              </Text>
            </View>
            <View>
              <Controller
                name="phone.ddd"
                control={control}
                defaultValue={studentProfile.profile.phone?.ddd ?? 0}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Input
                      className="w-12"
                      aria-labelledby="ddd"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value.toString()}
                      keyboardType="numeric"
                      maxLength={2}
                    />
                    {errors.phone?.ddd && (
                      <Text className="text-red-400">
                        {errors.phone?.ddd?.message}
                      </Text>
                    )}
                  </>
                )}
              />
            </View>

            <View className="flex-1">
              <Controller
                name="phone.number"
                control={control}
                defaultValue={studentProfile.profile.phone?.number ?? 0}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Input
                      aria-labelledby="phone"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value.toString()}
                      keyboardType="numeric"
                      maxLength={9}
                    />
                    {errors.phone?.number && (
                      <Text className="text-red-400">
                        {errors.phone?.number?.message}
                      </Text>
                    )}
                  </>
                )}
              />
            </View>
          </View>
        </View>

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

        {studentProfile.profile?.status && (
          <View className="gap-1">
            <Label nativeID="status">Status</Label>
            <Input
              aria-aria-labelledby="status"
              editable={false}
              value={studentProfile.profile?.status}
            />
          </View>
        )}

        <CardTitle className="text-primary my-5 ">Naturalidade</CardTitle>

        {studentProfile.profile?.city && (
          <View className="gap-1">
            <Label nativeID="city">Município</Label>
            <Input
              aria-aria-labelledby="city"
              editable={false}
              value={studentProfile.profile?.city}
            />
          </View>
        )}

        {studentProfile.profile?.UF && (
          <View className="gap-1">
            <Label nativeID="UF">UF</Label>
            <Input
              aria-aria-labelledby="UF"
              editable={false}
              value={studentProfile.profile?.UF}
            />
          </View>
        )}

        {studentProfile.profile?.country && (
          <View className="gap-1">
            <Label nativeID="country">País</Label>
            <Input
              aria-aria-labelledby="country"
              editable={false}
              value={studentProfile.profile?.country}
            />
          </View>
        )}

        <CardTitle className="text-primary my-5 ">Documentos</CardTitle>

        {studentProfile.profile?.RG && (
          <View className="gap-1">
            <Label nativeID="RG">RG</Label>
            <Input
              aria-aria-labelledby="RG"
              editable={false}
              value={studentProfile.profile?.RG.replace(
                /(\d{2})(\d{3})(\d{3})(\d{1})/,
                '$1.$2.$3-$4'
              )}
            />
          </View>
        )}

        {studentProfile.profile?.UFRG && (
          <View className="gap-1">
            <Label nativeID="UF-RG">
              <Text className="text-sm text-zinc-500 native:text-base font-semibold leading-none web:peer-disabled:cursor-not-allowed web:peer-disabled:opacity-70">
                UF-RG
              </Text>
            </Label>
            <Input
              aria-labelledby="UF-RG"
              editable={false}
              value={studentProfile.profile?.UFRG ?? ''}
            />
          </View>
        )}

        {studentProfile.profile?.issuingAgency && (
          <View className="gap-1">
            <Label nativeID="issuingAgency">Orgão Expedidor - RG</Label>
            <Input
              aria-aria-labelledby="issuingAgency"
              editable={false}
              value={studentProfile.profile?.issuingAgency.toUpperCase()}
            />
          </View>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onPress={handleSubmit(handleUpdateProfile)}>
          <Text>CONFIRMAR</Text>
        </Button>
      </CardFooter>
    </Card>
  )
}
