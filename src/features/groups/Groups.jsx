import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGroups } from './groupsSlice';
import { getCourses } from '../../features/courses/coursesSlice';
import { getTopics } from '../topics/topicsSlice';
import { getCourseworks } from '../coursework/courseworksSlice';
import { getCoursework } from '../coursework/courseworkSlice';

export default function Groups() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGroups());
    }, [dispatch])


    const groups = useSelector((state) => state.groups)

    return (
    
    <div className='flex space-x-10 p-10'>
        {groups.list.map(group => {
            return <Link to={`/groups/${group.id}`} key={group.id} className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
                        <p className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{group.title}</p>
                        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{group.description}</p>
                    </Link>
        })}
    </div>
  )
}
