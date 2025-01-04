export interface ProfileInfoProps {
  profile: {
    document: string | null
    name: string | null
    sex: string | null
    socialName: string | null
    genderId: number | null
    status: string | null
    birth: Date | null
    mail: string | null
    race: number | null
    phone: {
      ddi: number | null | undefined
      ddd: number | null | undefined
      number: number | null | undefined
    } | null
    country: string | null
    UF: string | null
    city: string | null
    RG: string | null
    UFRG: string | null
    issuingAgency: string | null
  }
}
