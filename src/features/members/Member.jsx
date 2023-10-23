import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMember } from './memberSlice';
import { useParams } from 'react-router-dom';

export default function Member() {
    const dispatch = useDispatch();
    const profile = require('../../assets/default_profile.png')

    let {id} = useParams()
    useEffect(() => {
        dispatch(getMember(id))
    }, [dispatch])

    let member = useSelector((state) => state.member)

    return (
        
    <div class="flex items-center h-screen w-full justify-center">
        <div class="max-w-xs">
            <div class="bg-white shadow-xl rounded-lg py-3">
                <div class="p-2">
                    <img src={profile} className='mx-auto h-[90px] w-[90px] items-center justify-center rounded-xl'/>
                    <h3 class="text-center text-xl text-gray-900 font-medium leading-8">{member.data.first_name} {member.data.last_name}</h3>
                    <span class="px-2 py-2 text-gray-500 font-semibold">Email</span>
                    <span class="px-2 py-2">{member.data.email}</span>
                    <p class="px-2 py-2 text-gray-500 font-semibold">Certifications</p>
                </div>
            </div>
        </div>
    </div>
    )
}
