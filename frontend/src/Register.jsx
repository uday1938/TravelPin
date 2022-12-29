import { Cancel, Room } from '@material-ui/icons'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import './register.css'
export default function Register({setShowRegister}){
    const [success,setSuccess]=useState(false);
    const [error,setError]=useState(false);
    const nameRef= useRef();
    const emailRef= useRef();
    const passwordRef= useRef();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const newUser={
            username:nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
        };
        try {
            await axios.post('/users/register',newUser);
            setSuccess(true); setError(false);
        } catch (err) {
            setError(true);
        }
    }
    return(
        <div>
            <div className='registerContainer'>
                <div className='logo'>
                    <Room></Room>
                    Register Window
                </div>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='username' ref={nameRef}></input>
                    <input type='email' placeholder='email' ref={emailRef}></input>
                    <input type='password' placeholder='password' ref={passwordRef}></input>
                    <button className='registerButton'>Register</button>
                    {success && (
                        <span className='success'>
                            Successfull Registartion. You can Login now.
                        </span>
                    )}
                    {error && (
                        <span className='failure'>
                            Something went wrong. Please try again.
                        </span>
                    )}
                    
                </form>
                <Cancel className='registerCancel' onClick={()=>setShowRegister(false)}></Cancel>
            </div>
        </div>
    )
}