export const RACE_OPTIONS = {
  WHITE: '1',
  BLACK: '2',
  BROWN: '3',
  YELLOW: '4',
  INDIGENOUS: '5',
  NO_INFO: '99',
} as const

export const raceList = [
  { value: RACE_OPTIONS.WHITE, label: 'BRANCO' },
  { value: RACE_OPTIONS.BLACK, label: 'PRETA' },
  { value: RACE_OPTIONS.BROWN, label: 'PARDA' },
  { value: RACE_OPTIONS.YELLOW, label: 'AMARELO' },
  { value: RACE_OPTIONS.INDIGENOUS, label: 'INDÍGENA' },
  { value: RACE_OPTIONS.NO_INFO, label: 'SEM INFORMAÇÃO' },
]

export function getRaceLabel(value: string | null) {
  return raceList.find(race => race.value === value)?.label ?? 'SEM INFORMAÇÃO'
}
