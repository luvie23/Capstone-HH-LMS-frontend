import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJoinrequests } from './joinrequestsSlice';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function JoinRequests() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let {id} = useParams()
    useEffect(() => {
        dispatch(getJoinrequests(id))
    }, [dispatch])

    const requests = useSelector((state) => state.joinrequests.list);

    let handleApprove = async (e) => {
        e.preventDefault();

        let res =  fetch(`http://localhost:8080/groups/${id}/approve_request/${e.target.value}`, {
            method: "DELETE"
        }).then(res=> {
            console.log(res)
            if (res.status === 204){
                alert('User approved!');
                window.location.reload(); 
            } else {
                navigate(`/groups/${id}/requests`)
            }
        })};

    let handleReject = async (e) => {
        e.preventDefault();
            let res =  fetch(`http://localhost:8080/groups/${id}/reject_request/${e.target.value}`, {
                method: "DELETE"
            }).then(res=> {
                if (res.status === 204){
                    alert('User rejected!');
                    window.location.reload(); 
                } else {
                    navigate(`/groups/${id}/requests`)
                }
            })};



    return (
        <div>
        {requests.map(request => {
            return <div key={request.id}>
                {request.user.first_name} <button onClick={e => handleApprove(e)} value={request.user.id} className='text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 rounded-full text-sm p-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Approve</button> <button onClick={e => handleReject(e)} value={request.user.id} className='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 rounded-full text-sm p-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>Reject</button>
            </div>  
        })}
        </div>
    )
}
