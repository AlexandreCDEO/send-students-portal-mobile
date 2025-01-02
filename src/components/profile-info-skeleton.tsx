import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Text, View } from 'react-native'
import { Skeleton } from './ui/skeleton'
import { Label } from './ui/label'

export function ProfileInfoSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Informações Gerais</CardTitle>
      </CardHeader>
      <CardContent className="gap-4 native:gap-2">
        <View className="gap-1">
          <Label nativeID="name">Name</Label>
          <Skeleton className="h-10 w-full" />
        </View>

        <View className="gap-1">
          <Label nativeID="socialName">Nome Social</Label>
          <Skeleton className="h-10 w-full" />
        </View>

        <View className="gap-1">
          <Label nativeID="sex">Sexo</Label>
          <Skeleton className="h-10 w-full" />
        </View>

        <View className="gap-1">
          <Label nativeID="gender">Gênero/Orientação</Label>
          <Skeleton className="h-10 w-full" />
        </View>

        <View className="gap-1">
          <Label nativeID="birth">Nascimento</Label>
          <Skeleton className="h-10 w-full" />
        </View>

        <View className="gap-1">
          <Label nativeID="document">CPF</Label>
          <Skeleton className="h-10 w-full" />
        </View>

        <View className="gap-1">
          <Label nativeID="mail">Email</Label>
          <Skeleton className="h-10 w-full" />
        </View>

        <View className="gap-1">
          <Label nativeID="phone">Telefone</Label>
          <View className="flex-row items-center rounded-md gap-1">
            <Skeleton className="h-10 w-12" />
            <Skeleton className="h-10 w-12" />
            <Skeleton className="h-10 flex-1" />
          </View>
        </View>

        <View className="gap-1">
          <Label nativeID="race">Raça</Label>
          <Skeleton className="h-10 w-full" />
        </View>

        <View className="gap-1">
          <Label nativeID="status">Status</Label>
          <Skeleton className="h-10 w-full" />
        </View>

        <CardTitle className="text-primary my-5">Naturalidade</CardTitle>

        <View className="gap-1">
          <Label nativeID="city">Município</Label>
          <Skeleton className="h-10 w-full" />
        </View>

        <View className="gap-1">
          <Label nativeID="UF">UF</Label>
          <Skeleton className="h-10 w-full" />
        </View>

        <View className="gap-1">
          <Label nativeID="country">País</Label>
          <Skeleton className="h-10 w-full" />
        </View>

        <CardTitle className="text-primary my-5">Documentos</CardTitle>

        <View className="gap-1">
          <Label nativeID="RG">RG</Label>
          <Skeleton className="h-10 w-full" />
        </View>

        <View className="gap-1">
          <Label nativeID="UF-RG">
            <Text className="text-sm text-zinc-500 native:text-base font-semibold leading-none web:peer-disabled:cursor-not-allowed web:peer-disabled:opacity-70">
              UF-RG
            </Text>
          </Label>
          <Skeleton className="h-10 w-full" />
        </View>

        <View className="gap-1">
          <Label nativeID="issuingAgency">Orgão Expedidor - RG</Label>
          <Skeleton className="h-10 w-full" />
        </View>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Text>CONFIRMAR</Text>
        </Button>
      </CardFooter>
    </Card>
  )
}
