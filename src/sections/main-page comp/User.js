import React ,{useEffect, useState} from 'react'
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom'
import './User.css'


function User() {
    const navigate=useNavigate();
    const [name,setname]=useState('')
    let val=[]
    const logs =useEffect(()=>{
      if(Cookies.get('logs')){
          val=Cookies.get('logs')
          setname(val.split(',')[3])
      }else{
            navigate('/')
          }
        },[])
    function lo(){
        Cookies.remove('logs')
        navigate('/')
    }
  return (
    <div className='main-body'>
      <div className="msg">
          <h1>Welcome,{name}</h1>
      </div>
      <button className='logout' onClick={lo}>Logout</button>
    </div>
  )
}

export default User
