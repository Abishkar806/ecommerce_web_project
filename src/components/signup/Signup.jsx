import React, { useState } from 'react';
import '../../App.css';
import './signup.css';


import {  useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import {Toaster, toast} from 'react-hot-toast';


function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

    const onSubmit = async (e) => {
      e.preventDefault();

      if (password !== confirmPassword) {
        setPasswordsMatch(false);
        toast.error("Password doesnot match");
        return;
        
      }
      try {
        var formData = new FormData();
        formData.append("name",name);
        formData.append("email", email);
        formData.append("password", password);
  
        var response = await fetch('http://localhost/react_api/auth/register.php', {
          method: 'POST',
          body: formData,
        });
        var result = await response.json();

        if(result.success){
          toast.success(result.message);
           navigate("/login");
          

        }else{
            toast.error(result.message);
        }

  
        
  
      } catch (error) {
        console.log(error)
      }
    }
  
    return (
      <div className='signupContainer'>
      <form onSubmit={onSubmit}>
        <div className='container'>
          <div className='header'>
            <div className='text'>{}</div>
            <div className='title'>SignUp</div>
            <div className='underline'></div>
            <h1>Please fill all the details correctly!!!!</h1>
          </div>
          <div className='inputs'>
            
             
              <input value={name} onChange={(v) => setName(v.target.value)} required placeholder='Enter your name' type='text' className='input'></input>
                <input value={email} onChange={(v) => setEmail(v.target.value)} required placeholder='Enter your email' type='email' className='input'></input>
                <input value={password} onChange={(v) => setPassword(v.target.value)} required placeholder='Enter your password' type='password' className='input'></input>
                <input value={confirmPassword} onChange={(v) =>{ setConfirmPassword(v.target.value);setPasswordsMatch(true);}} required placeholder='Confirm your password' type='password' className='input'></input>
          </div>
  
      

          
          <div style={{
            "display":"flex",
            "gap":"10px"
          }}>    <Button type='submit' className='button'>SignUp</Button>
                {/* <Link to={"/signup"}>
                
                </Link> */}
                <Button onClick={()=>{
                    navigate("/Login")
                }} className='button'>Login</Button></div>
      
                <div style={{ "display": "flex", "gap": "10px" }}>
             
                </div>
                </div>
          

                
        
      </form>
      </div>
    );
  }

export default Signup;
