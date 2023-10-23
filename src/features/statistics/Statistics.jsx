import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAssignments } from './assignmentsSlice';
import { useParams } from 'react-router-dom';
import moment from 'moment';

export default function Statistics() {
    const dispatch = useDispatch();
    const members = useSelector((state) => state.members.list);

    let {id} = useParams();
    useEffect(() => {
        dispatch(getAssignments(id))
    }, [dispatch])

    

    const users = useSelector((state) => state.assignments.list);



  return (
    <div className='flex p-5 h-full w-full bg-slate-200 '>
        <p className='block'>Last assignment:</p>
        <div className='space-y-2 h-4/6 w-2/6 overflow-auto'>
        
        {members.map(member => {
            return <div className='flex flex-col  w-3/6 bg-slate-100'>
                <p>{member.first_name} {member.last_name}</p>
                <span className='bg-slate-400'>{member.last_assignment} &nbsp;</span>
            </div>
        })}
        </div>
        
        <p>Last day of progress:</p>
        <div className='space-y-2 h-4/6 w-2/6 overflow-auto'>
        
        {users.map(user => {
            {if(user.courseworks.length == undefined){
                console.log('test')
            }else{
                return <div className='flex flex-col w-3/6 bg-slate-100'>
                <p>{user.first_name} {user.last_name}</p>

                
                <span className='bg-slate-400'>{user.courseworks.length > 0 ? moment(user.courseworks[0].created_at).format('YYYY-MM-DD'): ''} &nbsp;</span>
            </div>
            }}

        })}
        </div>

    </div>
  )
}
