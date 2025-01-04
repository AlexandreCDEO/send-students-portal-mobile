import React from 'react'
import { View } from 'react-native'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Text } from './ui/text'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getRaceLabel, raceList } from '@/constants/races'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getGenres, type Genre } from '@/server/general/get-genres'
import { ProfileInfoSkeleton } from './profile-info-skeleton'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateStudentProfile } from '@/server/student/update-profile'
import { useRouter } from 'expo-router'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { getErrorMessage } from '@/utils/get-error-message'
import {
  updateProfileSchema,
  type UpdateProfileSchema,
} from '@/types/profile/update-profile-schema'
import { PhoneInput } from './profile-info/phone-input'
import type { ProfileInfoProps } from '@/types/profile/profile-info-props'
import { RaceSelect } from './profile-info/race-select'
import { ProfileInfoDocuments } from './profile-info/documents'
import { ProfileInfoBirthplace } from './profile-info/birthplace'

export function ProfileInfo({ profile }: ProfileInfoProps) {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
  })

  const [raceSelected, setRaceSelected] = useState<string>(
    profile?.race?.toString() ?? '99'
  )

  const [genres, setGenres] = useState<Genre[]>([])

  const [studentGenre, setStudentGenre] = useState<number | null>(
    profile?.genderId
  )

  const [message, setMessage] = useState<string | null>(null)

  const updateMessage = useCallback((newMessage: string | null) => {
    setMessage(prev => {
      if (prev === newMessage) return prev
      return newMessage
    })
  }, [])

  const formattedDocument = useMemo(() => {
    return profile?.document?.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4'
    )
  }, [profile?.document])

  const currentRaceLabel = useMemo(
    () => getRaceLabel(raceSelected),
    [raceSelected]
  )

  const currentGenreLabel = useMemo(
    () =>
      genres.find(genre => genre.id === studentGenre)?.name ??
      'SELECIONE UM GÊNERO',
    [genres, studentGenre]
  )

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
      updateMessage(null)
      router.back()
    },
    onError: error => {
      const errorMessage = getErrorMessage(error)
      updateMessage(errorMessage)
    },
  })

  const handleUpdateProfile = useCallback(
    (data: UpdateProfileSchema) => {
      updateProfileMutation.mutate({
        gender: data.gender,
        mail: data.mail,
        race: data.race,
        phone: {
          ddd: data.phone.ddd,
          number: data.phone.number,
        },
      })
    },
    [updateProfileMutation]
  )

  useEffect(() => {
    if (genresData) {
      setGenres(genresData)
    }
  }, [genresData])

  useEffect(() => {
    if (profile) {
      reset({
        gender: profile.genderId ?? 0,
        mail: profile.mail ?? '',
        race: profile.race ?? 99,
        phone: {
          ddd: profile.phone?.ddd ?? 0,
          number: profile.phone?.number ?? 0,
        },
      })
    }
  }, [profile, reset])

  useEffect(() => {
    if (profile?.race) {
      setRaceSelected(profile.race.toString())
    }
  }, [profile?.race])

  useEffect(() => {
    if (profile?.genderId) {
      setStudentGenre(profile.genderId)
    }
  }, [profile?.genderId])

  if (!profile) {
    return <ProfileInfoSkeleton />
  }

  return (
    <Card key={profile?.document ?? 'profile-info'}>
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

        {profile?.name ? (
          <View className="gap-1">
            <Label nativeID="name">Name</Label>
            <Input
              aria-aria-labelledby="name"
              editable={false}
              value={profile?.name ?? ''}
            />
          </View>
        ) : null}

        {profile?.socialName ? (
          <View className="gap-1">
            <Label nativeID="socialName">Nome Social</Label>
            <Input
              aria-aria-labelledby="socialName"
              editable={false}
              value={profile?.socialName}
            />
          </View>
        ) : null}

        {profile?.sex ? (
          <View className="gap-1">
            <Label nativeID="sex">Sexo</Label>
            <Input
              aria-aria-labelledby="sex"
              editable={false}
              value={
                profile.sex
                  ? profile.sex === 'F'
                    ? 'FEMININO'
                    : profile.sex === 'M'
                      ? 'MASCULINO'
                      : profile.sex
                  : ''
              }
            />
          </View>
        ) : null}

        {genres.length > 0 ? (
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
        ) : null}

        {profile?.birth ? (
          <View className="gap-1">
            <Label nativeID="birth">Nascimento</Label>
            <Input
              aria-aria-labelledby="birth"
              editable={false}
              value={new Date(profile?.birth).toLocaleDateString('pt-BR')}
            />
          </View>
        ) : null}

        {profile?.document ? (
          <View className="gap-1">
            <Label nativeID="document">CPF</Label>
            <Input
              aria-aria-labelledby="document"
              editable={false}
              value={formattedDocument}
            />
          </View>
        ) : null}

        <View className="gap-1">
          <Label nativeID="mail">Email</Label>
          <Controller
            name="mail"
            control={control}
            defaultValue={profile?.mail ?? ''}
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

        <PhoneInput
          control={control}
          errors={errors}
          ddi={profile.phone?.ddi}
          ddd={profile.phone?.ddd}
          number={profile.phone?.number}
        />

        <RaceSelect
          contentInsets={contentInsets}
          control={control}
          currentRaceLabel={currentRaceLabel}
          errors={errors}
          raceList={raceList}
          raceSelected={raceSelected}
          setRaceSelected={setRaceSelected}
        />

        {profile?.status ? (
          <View className="gap-1">
            <Label nativeID="status">Status</Label>
            <Input
              aria-aria-labelledby="status"
              editable={false}
              value={profile?.status}
            />
          </View>
        ) : null}

        <CardTitle className="text-primary my-5 ">Naturalidade</CardTitle>

        <ProfileInfoBirthplace
          city={profile.city}
          UF={profile.UF}
          country={profile.country}
        />

        <CardTitle className="text-primary my-5 ">Documentos</CardTitle>

        <ProfileInfoDocuments
          RG={profile.RG}
          UFRG={profile.UFRG}
          issuingAgency={profile.issuingAgency}
        />
      </CardContent>
      <CardFooter>
        <Button className="w-full" onPress={handleSubmit(handleUpdateProfile)}>
          <Text>CONFIRMAR</Text>
        </Button>
      </CardFooter>
    </Card>
  )
}
