import { createContext, useContext, useState, type ReactNode } from 'react'

export interface StudentProfile {
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
      ddi: number | null
      ddd: number | null
      number: number | null
    } | null
    country: string | null
    UF: string | null
    city: string | null
    RG: string | null
    UFRG: string | null
    issuingAgency: string | null
    addresses:
      | {
          type: string | null
          CEP: string | null
          street: string | null
          number: string | null
          complement: string | null
          neighborhood: string | null
          city: string | null
          UF: string | null
          country: string | null
          phone: {
            ddi: number | null
            ddd: number | null
            number: number | null
          } | null
        }[]
      | null
    parents:
      | {
          name: string | null
          CPF: string | null
          relation: string | null
          status: string | null
        }[]
      | null
  }
}

interface StudentProfileContextProps {
  studentProfile: StudentProfile
  handleSetStudentProfile: (studentProfile: StudentProfile) => void
  handleClearStudentProfile: () => void
}

interface StudentProfileProviderProps {
  children: ReactNode
}

const StudentProfileContext = createContext<StudentProfileContextProps>(
  {} as StudentProfileContextProps
)

export function StudentProfileProvider({
  children,
}: StudentProfileProviderProps) {
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(
    {} as StudentProfile
  )

  function handleSetStudentProfile(studentProfile: StudentProfile) {
    console.log('handleSetStudentProfile')
    setStudentProfile(studentProfile)
  }

  function handleClearStudentProfile() {
    setStudentProfile({} as StudentProfile)
  }

  return (
    <StudentProfileContext.Provider
      value={{
        studentProfile,
        handleSetStudentProfile,
        handleClearStudentProfile,
      }}
    >
      {children}
    </StudentProfileContext.Provider>
  )
}

export function useStudentProfile() {
  const context = useContext(StudentProfileContext)
  return context
}
