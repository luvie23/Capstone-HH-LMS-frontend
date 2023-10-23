import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Join() {
    const navigate = useNavigate();

    const user = useSelector((state) => state.login.user);
    const group = useSelector((state) => state.group.data);

    let handleJoinRequest = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(`http://localhost:8080/groups/${group.id}/grant_access/${user.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({

                }),
            });
            let resJson = await res.json();
            if (res.status === 200){
                if(resJson.preapproved){
                    alert('Access granted')
                    navigate(`/groups/${group.id}`)
                } else {
                    alert('Access requested')
                }
            } else {
            }
        } catch (err) {
        console.log(err);
        }
    };

    return (
        <div className="flex  h-screen w-full justify-center">
            <div className="max-w-xs">
                <div className="bg-white shadow-xl rounded-lg py-3">
                    <div className="flex flex-col items-center p-5 space-y-4">
                        <h3 className="text-center text-xl text-gray-900 font-medium leading-8">You are not in this group.</h3>
                        
                        <button onClick={e => handleJoinRequest(e)} className='text-slate-800 bg-green-500 hover:bg-green-300 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>Request access</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
