import type { Address } from '@/components/address-list'
import type { Parent } from '@/components/parent-card'
import {
  getStudentProfile,
  type StudentProfileResponse,
} from '@/server/student/get-student-profile'
import { useQuery } from '@tanstack/react-query'
export function useStudentProfileData() {
  const { data, error, isError } = useQuery<StudentProfileResponse>({
    queryFn: getStudentProfile,
    queryKey: ['student-profile-data'],
  })

  const profile = data
    ? {
        document: data.profile.document,
        name: data.profile.name,
        sex: data.profile.sex,
        socialName: data.profile.socialName,
        genderId: data.profile.genderId,
        status: data.profile.status,
        birth: data.profile.birth,
        mail: data.profile.mail,
        race: data.profile.race,
        phone: {
          ddi: data.profile.phone?.ddi,
          ddd: data.profile.phone?.ddd,
          number: data.profile.phone?.number,
        },
        country: data.profile.country,
        UF: data.profile.UF,
        city: data.profile.city,
        RG: data.profile.RG,
        UFRG: data.profile.UFRG,
        issuingAgency: data.profile.issuingAgency,
      }
    : null

  const parents: Parent[] = data?.profile.parents ?? []

  const addresses: Address[] = data?.profile.addresses ?? []

  return { profile, parents, addresses, isError, error }
}
