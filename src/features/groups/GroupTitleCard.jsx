import React from 'react'
import { useSelector } from 'react-redux'

export default function GroupTitleCard() {
  const group = useSelector((state) => state.group)

  return (
    <div className='flex h-40 bg-slate-200 space-x-20 px-10 items-center m-0 w=full'>
        <div className='flex flex-col w-1/2'>
            <p className='mb-4 text-4xl font-extrabold  text-slate-900'>{group.data.title}</p>
            <p className='text-lg font-normal text-slate-800'>{group.data.description}</p>
        </div>

    </div>
  )
}
