import { getUserData } from '@/actions/get-user-data'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'

export default async function Home () {
  const user = await getUserData()

  if (!user) return redirect('/auth')

  const userWorkspaceId = user.workplaces?.[0]

  if (!userWorkspaceId) return redirect('/create-workspace')

  if (userWorkspaceId) return redirect(`/workspace/${userWorkspaceId}`)
}
