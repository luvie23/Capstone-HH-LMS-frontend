import React, {  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AdminDiv from './AdminDiv';
import { getMeetings } from './meetingsSlice';

import moment from 'moment';
import Attendance from './Attendance';

export default function Classes() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.login.user);
    const meetings = useSelector((state) => state.meetings.list);

    let {id} = useParams();
    useEffect(() => {
        dispatch(getMeetings(id))
    }, [dispatch])


  return (
    <div className='flex p-5 h-5/6 w-full bg-slate-200 overflow-auto space-x-10'>
        {user.role == 10 ? <AdminDiv/>: ""}

        <div className='flex flex-col space-y-4 w-full items-center '>
            <h1 className='flex items-center text-5xl font-extrabold text-green-700'>Classes</h1>
        {meetings.map(meeting => {
            let date = new Date(meeting.schedule)
            return <div key={meeting.id} className='flex flex-col w-full p-6 bg-slate-100 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
                <h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{meeting.title}</h2>
                <p className='font-normal text-gray-700 dark:text-gray-400'>{meeting.description}</p>
                <p>{date.toString()}</p>
                <a href={meeting.zoom_link} className='mb-6 text-lg font-normal text-green-500 lg:text-xl  dark:text-green-400'>Click here to join.</a>
                <p>Created: {moment(meeting.created_at).fromNow()}</p>
                {user.role == 10 ? <Attendance meetingId={meeting.id}/>: ""}
            </div>
        })}
        </div>
    </div>
  )
}
