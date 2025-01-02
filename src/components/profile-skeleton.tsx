import { Skeleton } from '@/components/ui/skeleton'
import { ScrollView, View } from 'react-native'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

export function ProfileSkeleton() {
  return (
    <View className="flex-1 px-6 py-10">
      <Tabs
        className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
        value="tab1"
        onValueChange={() => {}}
      >
        <TabsList className="flex-row w-full">
          <TabsTrigger
            value="tab1"
            className="flex-1 flex-row items-center gap-1.5"
          >
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-24 h-5" />
          </TabsTrigger>
          <TabsTrigger
            value="tab2"
            className="flex-1 flex-row items-center gap-1.5"
          >
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-24 h-5" />
          </TabsTrigger>
          <TabsTrigger
            value="tab3"
            className="flex-1 flex-row items-center gap-1.5"
          >
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-24 h-5" />
          </TabsTrigger>
        </TabsList>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TabsContent value="tab1">
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
          </TabsContent>
          <TabsContent value="tab2">
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
          </TabsContent>
          <TabsContent value="tab3">
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
          </TabsContent>
        </ScrollView>
      </Tabs>
    </View>
  )
}
