import { db } from '@/lib/db'
import { initialProfile } from '@/lib/initial-profile'
import { Profile } from '@prisma/client'
import { redirect } from 'next/navigation'

const SetupPage = async () => {
  const prifle = (await initialProfile()) as Profile

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: prifle.id
        }
      }
    }
  })

  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return <div>Create a server</div>
}

export default SetupPage
