import React, { useEffect} from 'react';
import GroupNav from './GroupNav'
import GroupTitleCard from './GroupTitleCard'
import { useDispatch, useSelector } from 'react-redux';
import { getGroup } from './groupSlice';
import { getMembers } from '../members/membersSlice';
import { useParams, Outlet } from 'react-router-dom';
import { courseworksReset } from '../coursework/courseworksSlice';
import { courseworkReset } from '../coursework/courseworkSlice';
import { topicsReset } from '../topics/topicsSlice';
import { completedworksReset } from '../courses/completedworksSlice';
import { isRegistered } from './isregisteredSlice';
import Join from '../join/Join';

export default function Group() {
    const dispatch = useDispatch();

    const userId = useSelector((state) => state.login.user.id);
    let {id} = useParams()
    let ids = {group_id: id, user_id: userId}
    useEffect(() => {
        dispatch(getGroup(id));
        dispatch(getMembers(id));
        dispatch(courseworksReset());
        dispatch(courseworkReset());
        dispatch(topicsReset());
        dispatch(completedworksReset());
        dispatch(isRegistered(ids))
    }, [dispatch])

    const registered = useSelector((state) => state.registered.registration.registered);

    return (
    <>
        <GroupTitleCard/>
        <GroupNav/>
        {registered ? <Outlet /> : <Join/>}
    </>
  )
}
