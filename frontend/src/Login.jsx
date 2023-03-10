import { Cancel, Room } from '@material-ui/icons'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import './login.css'

export default function Login({setShowLogin,myStorage,setCurrentUser}){
    const [error,setError]=useState(false);
    const nameRef= useRef();
    const passwordRef= useRef();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const User={
            username:nameRef.current.value,
            password:passwordRef.current.value,
        };
        try {
            const res=await axios.post('/users/login',User);
            myStorage.setItem("user",res.data.username);
            setCurrentUser(res.data.username);
            setShowLogin(false);
           setError(false);
        } catch (err) {
            setError(true);
        }
    }
    return(
        <div>
            <div className='loginContainer'>
                <div className='logo'>
                    <Room></Room>
                    Register Window
                </div>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='username' ref={nameRef}></input>
                    <input type='password' placeholder='password' ref={passwordRef}></input>
                    <button className='loginButton'>Login</button>
                    {error && (
                        <span className='failure'>
                            Incorrect Credentials.
                        </span>
                    )}
                    
                </form>
                <Cancel className='loginCancel' onClick={()=>setShowLogin(false)}></Cancel>
            </div>
        </div>
    )
}