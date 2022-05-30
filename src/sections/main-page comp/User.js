import React ,{useEffect, useState} from 'react'
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom'
import './User.css'


function User() {
    const navigate=useNavigate();
    let val=[]
    const logs =useEffect(()=>{
      if(Cookies.get('logs')){
          val=Cookies.get('logs')
          val=val.split(',')
      }else{
            navigate('/')
          }
        },[])
  console.log(val[3])
    function lo(){
        Cookies.remove('logs')
        navigate('/')
    }
  return (
    <div className='main-body'>
      <div className="msg">
          <h1>Welcome,{val[3]}</h1>
      </div>
      <button className='logout' onClick={lo}>Logout</button>
    </div>
  )
}

export default User
