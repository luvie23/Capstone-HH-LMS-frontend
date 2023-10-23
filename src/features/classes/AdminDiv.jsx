import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAbsences } from '../statistics/absencesSlice';
import { useParams } from 'react-router-dom';

export default function AdminDiv() {
    const group = useSelector((state) => state.group.data);
    const meetings = useSelector((state) => state.meetings.list);
    const absences = useSelector((state) => state.absences.list);

    const dispatch = useDispatch();

    let {id} = useParams();
    useEffect(() => {
        dispatch(getAbsences(id))
    }, [dispatch])

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [schedule, setSchedule] = useState("");

    let handleMeetingCreation = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("http://localhost:8080/meetings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                title: title,
                description: description,
                schedule: schedule,
                group_id: group.id,
                }),
            });
            let resJson = await res.json();
            if (res.status === 200){
                setTitle("");
                setDescription("");
                setSchedule("");
                alert("Meeting created")
            } else {
                alert('error')
            }
        } catch (err) {
          console.log(err);
        }
      };


    return (
       
        <div className='flex flex-col space-y-4'>
            <p className='flex items-center text-xl font-extrabold text-red-500'>Generate a Zoom Meeting</p>
            <form onSubmit={e => handleMeetingCreation(e)} className='flex flex-col space-y-4'>
                <input
                type="text"
                value={title}
                placeholder="Topic"
                onChange={(e) => setTitle(e.target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
                <textarea
                type="text"
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                ></textarea>
                <input
                type="datetime-local"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value + ":00")}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
                <button type="submit" className='text-slate-800 bg-green-500 hover:bg-green-300 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' >Create Meeting</button>
            </form>
            <p>Absences:</p>
            <div className='space-y-2 h-2/6 w-full overflow-auto'>
                
                {absences.map(user => {
                    return <div key={user.first_name} className='flex flex-col w-3/6 bg-slate-100'>
                        <p>{user.first_name} {user.last_name}</p>
                        <span className='bg-slate-400'>{meetings.length - user.meetings.length} &nbsp;</span>
                    </div>
                })}
                </div>
            </div>


    )
}
