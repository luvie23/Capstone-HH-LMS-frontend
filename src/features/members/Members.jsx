import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { getMembers } from './membersSlice';

export default function Members() {

    const profile = require('../../assets/default_profile.png')

    const dispatch = useDispatch();
    let {id} = useParams()
    useEffect(() => {
        dispatch(getMembers(id))
    }, [dispatch])

    const members = useSelector((state) => state.members)

    return (

    <div className='flex justify-center items-center h-5/6 w-full bg-slate-200 '>
        <div className='grid grid-cols-4 gap-x-1 gap-y-3 w-4/6 rounded-xl bg-slate-900 h-5/6 p-12  overflow-auto scrollbar-hide'>
    {members.list.map(member => {
        return <Link to={`/users/${member.id}`} key={member.id} className='rounded-xl p-4 shadow-sm shadow-green-200 md:w-12/12 lg:w-6/12 h-40 bg-slate-700 bg-opacity-100'>
            <img src={profile} className='mx-auto h-[90px] w-[90px] items-center justify-center rounded-xl'/>
            <p className={member.role == 10 ? "text-red-600": "text-green-600"}>{member.first_name} {member.last_name}</p>
        </Link>
    })}
        </div>
    </div>
    )
}
