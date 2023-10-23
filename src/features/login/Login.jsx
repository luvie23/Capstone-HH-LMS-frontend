import { useDispatch, useSelector } from 'react-redux';
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logIn } from './loginSlice';


export default function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();


    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("http://localhost:8080/loginRequest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                password_digest: password,
                email: email,
                }),
            });
            let resJson = await res.json();
            if (res.status === 200){
                setPassword("");
                setEmail("");
                console.log(resJson[0])
                dispatch(logIn(resJson[0]))
                navigate("/")
            } else {
                setMessage("Incorrect login details");
            }
        } catch (err) {
          console.log(err);
        }
      };

    return (

        <div class="flex flex-col items-center h-screen w-full justify-center">
            <div className="flex flex-col bg-white shadow-xl rounded-lg p-10">
                <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                    <input
                    type="text"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                    type="password"
                    value={password}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Login</button>

                    <div className="message">{message ? <p>{message}</p> : null}</div>
                </form>
            </div>
        </div>

    )
}

{/* <div class="max-w-xs">
<div class="bg-white shadow-xl rounded-lg py-3">
    <div class="p-2">
        <img src={profile} className='mx-auto h-[90px] w-[90px] items-center justify-center rounded-xl'/>
        <h3 class="text-center text-xl text-gray-900 font-medium leading-8">{member.data.first_name} {member.data.last_name}</h3>
        <span class="px-2 py-2 text-gray-500 font-semibold">Email</span>
        <span class="px-2 py-2">{member.data.email}</span>
        <p class="px-2 py-2 text-gray-500 font-semibold">Certifications</p>
    </div>
</div>
</div> */}