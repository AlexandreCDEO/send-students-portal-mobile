import { ParentList } from './parent-list'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import type { Parent } from './parent-card'

interface ProfileParentsProps {
  parents: Parent[]
}

export function ProfileParents({ parents }: ProfileParentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Genitores</CardTitle>
      </CardHeader>
      <CardContent className="gap-4 native:gap-2">
        {/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
        <ParentList parents={parents!} />
      </CardContent>
    </Card>
  )
}
