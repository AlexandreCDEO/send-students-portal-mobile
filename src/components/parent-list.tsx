import type React from 'react'
import { ParentCard, type Parent } from './parent-card'

interface ParentListsProps {
  parents: Parent[]
}

export function ParentList({ parents }: ParentListsProps) {
  return (
    <>
      {parents.map((parent, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <ParentCard key={index} parent={parent} />
      ))}
    </>
  )
}
