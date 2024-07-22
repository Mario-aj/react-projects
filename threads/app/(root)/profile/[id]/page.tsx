import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'

import { fetchUser } from '@/lib/actions/user.actions'
import { ProfileHeader } from '@/components/shared/profile-header'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { profileTabs } from '@/constants'
import Image from 'next/image'
import { TabsContent } from '@radix-ui/react-tabs'
import { ThreadsTab } from '@/components/shared/threads-tab'

export default async function Page ({ params }: { params: { id: string } }) {
  const user = await currentUser()

  if (!user) return null

  const userInfo = await fetchUser(params.id)

  if (!userInfo?.onboarded) return redirect('/onboarding')

  return (
    <section>
      <ProfileHeader
        authUser={user.id}
        name={userInfo.name}
        accountId={userInfo.id}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

      <div className='mt-9'>
        <Tabs defaultValue='threads' className='w-full'>
          <TabsList className='tab'>
            {profileTabs.map(tab => (
              <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                <Image
                  width={24}
                  height={24}
                  src={tab.icon}
                  alt={tab.label}
                  className='object-contain'
                />

                <p className='max-sm:hidden'>{tab.label}</p>

                {tab.label === 'Threads' && (
                  <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                    {userInfo?.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {profileTabs.map(tab => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className='w-full tex-tlight-1'
            >
              <ThreadsTab
                currentUserId={user.id}
                accountId={userInfo?.id}
                accountType='User'
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
