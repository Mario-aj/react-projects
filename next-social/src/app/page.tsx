import { AddPost } from '@/components/add-post'
import { Feed } from '@/components/feed'
import { LeftMenu } from '@/components/left-menu'
import { RightMenu } from '@/components/right-menu'
import { Stories } from '@/components/stories'

const Homepage = () => {
  return (
    <section className='flex gap-6 pt-6'>
      <aside className='hidden xl:block w-[20%]'>
        <LeftMenu />
      </aside>
      <main className='w-full lg:w-[70%] xl:w-[50%]'>
        <div className='flex flex-col gap-6'>
          <Stories />
          <AddPost />
          <Feed />
        </div>
      </main>
      <aside className='hidden lg:block w-[30%]'>
        <RightMenu />
      </aside>
    </section>
  )
}

export default Homepage
