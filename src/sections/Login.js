import React, { useState,useEffect } from 'react'
import { Link ,} from 'react-router-dom'
import {db} from '../firebase'
import { collection, getDocs } from "firebase/firestore"; 
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import './login.css'

function Login() {
  const [email,setemail]= useState('')
    const[pwd,setpwd]=useState('')
    const [disable,setdisable]=useState('')
  
  const navigate=useNavigate();
  
  function logs(){
    if(Cookies.get('logs')){
    let data=Cookies.get('logs')
    data=data.split(',')
    if(data[2]==='true'){
      navigate('/admin')
    }
    else{
      navigate('/user')
    }
  }
}
logs()

    let em=[]
    useEffect(()=>{
      if ((email!=='' && email.includes('@sankey.com'))&&(pwd!=='')){
          setdisable(false)
      }else{
          setdisable(true)
      }
  },[email,pwd])
  
  async function getdata(){
    const querySnapshot = await getDocs(collection(db, "register"));
        querySnapshot.forEach((doc) => {
        em.push(doc.data());
});
  }
  getdata()

  function checking(){
    let count=0   
        for(let i=0;i<em.length;i++){
          if(em[i].email===email){
            if(em[count].password===pwd){
              Cookies.set('logs',[email,pwd,em[count].isadmin,em[count].name],{expires:15})
              logs()
              return true
            }
            else{
              setpwd('')
              alert('password incorrect')
              return false
            }
          }
          count+=1
        }
        setemail('')
        alert('email incorrect')
  }

  return (
    <div className='login-main'>
        <div className="login-form">
            <h1>Login</h1>
            <form action="Submit">
             <div className="mail">
                 <label htmlFor="email">Email :-   </label>
                 <br />
                 <input type="email" name="email" id="email" value={email} placeholder='example@sankey.com' onChange={e=>{setemail(e.target.value.toLowerCase())}}/>
             </div>
             <div className="key">
                 <label htmlFor="password">Password :-   </label>
                 <br />
                 <input type="text" name="password" id="password" value={pwd}onChange={e=>{setpwd(e.target.value)}}/>
             </div>
             <button type="submit" className='subbtn' disabled={disable} form="nameform" value="Submit" onClick={checking}>Submit</button>
             <Link to='/register' >
             <button type="submit" className='regbtn' value='register'>Register</button>
             </Link>
             </form>
        </div>
    </div>
  )
}

export default Login
