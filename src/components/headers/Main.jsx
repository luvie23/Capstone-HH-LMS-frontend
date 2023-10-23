import React from 'react'
import GroupTitleCard from '../../features/groups/GroupTitleCard';
import GroupNav from '../../features/groups/GroupNav';

export default function Main() {
  return (
    <>  
        <div className='flex'>
            <div className='w-full'>
                <GroupTitleCard/>
                <GroupNav/>
            </div>
        </div>
    </>
  )
}
