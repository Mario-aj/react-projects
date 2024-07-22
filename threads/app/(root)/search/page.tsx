import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'

import { fetchUser } from '@/lib/actions/user.actions'

export default async function Page () {
  const user = await currentUser()

  if (!user) return null

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) return redirect('/onboarding')

  return <section className='head-text mb-10'>Search</section>
}
