import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function GroupNav() {
    const members = useSelector((state) => state.members)
    const user = useSelector((state) => state.login.user);

    return (
        <div className='flex justify-between px-10 bg-slate-100 border-b border-gray-900 text-lg font-bold'>
            <div className='flex space-x-4 text-green-800'>
                <Link to='courses'>Courses</Link>
                <Link to="members">Members</Link>
                <Link to="classes">Classes</Link>
            </div>
            {user.role == 10 ? <div className='flex space-x-4 ml-1 text-red-500'> <Link to="statistics">Statistics</Link> <Link to="requests">Join requests</Link></div>: ''}
            <div className='flex space-x-4'>
                <span>{members.list.length} members</span>
                <a href='/'>Invite</a>
            </div>
        </div>
    )
}
