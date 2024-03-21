import React, { useState } from 'react';
import '../../App.css';
import './login.css';


import {  useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {toast} from 'react-hot-toast';



function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            var formData = new FormData();
            formData.append("email", email); 
            formData.append("password", password);
            var response = await fetch('http://localhost/react_api/auth/login.php', {
                method: 'POST',
                body: formData,
            });

            var result = await response.json();

            if(result.success){
                toast.success(result.message);
                localStorage.setItem("token", result.token);
                navigate("/Home");

            }else{
                toast.error(result.message);
            }

            

        } catch (error) {
            console.log(error)
        }
    }

    return (
        
        <div className='loginContainer'>
        <form onSubmit={onSubmit}>
            <div className='container-heading'>
            <div className='container'>
                <div className='header'>
                    <div className='text'></div>
                    <div className='title'>Login</div>
                    <div className='underline'></div>
                </div>
                
                <div className='inputs'>
                    
                
                     
                    <input  onChange={(v) => { setEmail(v.target.value) }} required value={email} placeholder='Enter your email' type='email' className='input'></input>
                    <input onChange={(v) => { setPassword(v.target.value) }} value={password} required placeholder='Enter your password' type='password' className='input'></input>
            
                </div>

                 
                    <div className="forgot-password">Forget Password?<span>Click Here!</span></div>
                
                <div style={{
            "display":"flex",
            "gap":"10px"}}>
                <Button type='submit' className='button'>Login</Button>
                {/* <Link to={"/signup"}>
                
                </Link> */}
                <Button onClick={()=>{
                    navigate("/signup")
                }} className='button'>signup</Button></div>
                
                <div style={{ "display": "flex", "gap": "10px" }}>
             
                </div>
            </div>
            </div>
            
        </form>
        </div>
    );
}

export default Login;
