import Image from 'next/image'

type Props = {}
export const Stories = ({}: Props) => {
  return (
    <section className='p-4 bg-white rounded-lg shadow-md overflow-auto text-xs scrollbar-hide'>
      <div className='flex gap-8 w-max'>
        <div className='flex flex-col items-center gap-2 cursor-pointer'>
          <Image
            src='https://images.pexels.com/photos/27221171/pexels-photo-27221171/free-photo-of-a-woman-is-preparing-food-on-a-table.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
            alt=''
            width={80}
            height={80}
            className='w-20 h-20 rounded-full ring-2'
          />

          <span className='font-medium'>Mario-aj</span>
        </div>

        <div className='flex flex-col items-center gap-2 cursor-pointer'>
          <Image
            src='https://images.pexels.com/photos/27221171/pexels-photo-27221171/free-photo-of-a-woman-is-preparing-food-on-a-table.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
            alt=''
            width={80}
            height={80}
            className='w-20 h-20 rounded-full ring-2'
          />

          <span className='font-medium'>Mario-aj</span>
        </div>

        <div className='flex flex-col items-center gap-2 cursor-pointer'>
          <Image
            src='https://images.pexels.com/photos/27221171/pexels-photo-27221171/free-photo-of-a-woman-is-preparing-food-on-a-table.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
            alt=''
            width={80}
            height={80}
            className='w-20 h-20 rounded-full ring-2'
          />

          <span className='font-medium'>Mario-aj</span>
        </div>

        <div className='flex flex-col items-center gap-2 cursor-pointer'>
          <Image
            src='https://images.pexels.com/photos/27221171/pexels-photo-27221171/free-photo-of-a-woman-is-preparing-food-on-a-table.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
            alt=''
            width={80}
            height={80}
            className='w-20 h-20 rounded-full ring-2'
          />

          <span className='font-medium'>Mario-aj</span>
        </div>

        <div className='flex flex-col items-center gap-2 cursor-pointer'>
          <Image
            src='https://images.pexels.com/photos/27221171/pexels-photo-27221171/free-photo-of-a-woman-is-preparing-food-on-a-table.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
            alt=''
            width={80}
            height={80}
            className='w-20 h-20 rounded-full ring-2'
          />

          <span className='font-medium'>Mario-aj</span>
        </div>

        <div className='flex flex-col items-center gap-2 cursor-pointer'>
          <Image
            src='https://images.pexels.com/photos/27221171/pexels-photo-27221171/free-photo-of-a-woman-is-preparing-food-on-a-table.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
            alt=''
            width={80}
            height={80}
            className='w-20 h-20 rounded-full ring-2'
          />

          <span className='font-medium'>Mario-aj</span>
        </div>

        <div className='flex flex-col items-center gap-2 cursor-pointer'>
          <Image
            src='https://images.pexels.com/photos/27221171/pexels-photo-27221171/free-photo-of-a-woman-is-preparing-food-on-a-table.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
            alt=''
            width={80}
            height={80}
            className='w-20 h-20 rounded-full ring-2'
          />

          <span className='font-medium'>Mario-aj</span>
        </div>
      </div>
    </section>
  )
}
