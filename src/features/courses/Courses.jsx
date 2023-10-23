import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from './coursesSlice';
import { getTopics } from '../topics/topicsSlice';
import { getCourseworks } from '../coursework/courseworksSlice';
import { getCoursework } from '../coursework/courseworkSlice';

import Coursework from '../coursework/Coursework';
import Upload from './Upload';

export default function Courses() {
    const dispatch = useDispatch();

    let {id} = useParams();
    useEffect(() => {
        dispatch(getCourses(id))
    }, [dispatch])

    const courses =  useSelector((state) => state.courses.list);
    const topics = useSelector((state) => state.topics.list);
    const assignments = useSelector((state) => state.courseworks.list);
    const coursework = useSelector((state) => state.coursework);
    const user = useSelector((state) => state.login.user);

    const handleCourseChange = (id) => {
        dispatch(getTopics(id));
    }

    const handleChapterChange = (id) => {
        dispatch(getCourseworks(id));
    }

    const handleAssignmentChange = (id) => {
        dispatch(getCoursework(id))
    }

    let handleWorkSubmission = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("http://localhost:8080/users/mark_coursework", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: user.id,
                    coursework_id: coursework.data.id
                }),
            });
            let resJson = await res.json();
            if (res.status === 200){
                alert('Assigment marked complete');

            } else {
                alert('Error')
            }
        } catch (err) {
          console.log(err);
        }
        try {
            let res = await fetch(`http://localhost:8080/users/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    last_assignment: coursework.data.title,
                }),
            });
            let resJson = await res.json();
            if (res.status === 200){
                console.log(resJson)
            } else {
                console.log(resJson)
            }
        } catch (err) {
          console.log(err);
        }
        
      };
    

    return (
        <div className='flex p-5 h-5/6 w-full bg-slate-200 overflow-auto'>
            <div className='flex flex-col p-2 h-full rounded-xl bg-slate-300 w-1/6 space-y-4 mx-3'>
                <div className='flex flex-col'>
                    <span>Courses: </span>
                    <select name="courses" onChange={e => handleCourseChange(e.target.value)}>
                        <option value="" disabled selected>Choose Course</option>
                {courses.map(course => {
                    return <option key={course.id} value={course.id} >{course.title}</option> 
                })}
                    </select>
                </div>

                <div className='flex flex-col'>
                    <span>Chapters: </span>
                    <select name="chapters" onChange={e => handleChapterChange(e.target.value)}>
                        <option  disabled selected>Choose Chapter</option>
                {topics.map(topic => {
                    return <option key={topic.id} value={topic.id} >{topic.title}</option> 
                    
                })}
                    </select>
                </div>

                <div className='flex flex-col'>
                    <span>Assignment: </span>
                    <select name="courses" onChange={e => handleAssignmentChange(e.target.value)}>
                        <option value="" disabled selected>Choose Assignment</option>
                {assignments.map(assignment => {
                    return <option key={assignment.id} value={assignment.id} >{assignment.title}</option> 
                    
                })}
                    </select>
                </div>

                <div className='flex flex-col space-y-5'>
                    {coursework.data.coursework_type ? <Upload/> : ''}
                    <button onClick={e => handleWorkSubmission(e)} className='text-slate-800 bg-green-500 hover:bg-green-300 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Mark as done</button>
                </div>

            </div>

            <div className='bg-slate-800 w-5/6 rounded-xl p-6 overflow-auto'>
                <Coursework/>
            </div>
            {}
        </div>
    )
}
