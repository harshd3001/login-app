import React, { useEffect, useState } from 'react'
import { collection, getDocs,setDoc, Timestamp ,doc} from "firebase/firestore"; 
import './Register.css'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import {db} from '../firebase'
;


function Register() {
    const [email, setemail]=useState('')
    const [pwd, setpwd]=useState('')
    const [name, setname]=useState('')
    const [type, settype]=useState(false)
    const [disable,setdisable]=useState(true)  
    const navigate=useNavigate();
    const logs =useEffect(()=>{
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
    },[])
    let em=[]

    useEffect(()=>{
        if ((email!=='')&&(pwd!=='')&&(name!=='')){
            setdisable(false)
        }else{
            setdisable(true)
        }
    },[email,pwd,name])

    function typecheck(val){
        if (val==='user'){
            settype(false)
        }else settype(true)
    }

    const submitdata=async()=>{
        const data={
            email:email,
            password:pwd,
            name:name,
            isadmin:type,
            date: Timestamp.fromDate(new Date()) 
        }
        await setDoc(doc(db,'register',email),data)
    }

    async function check(e){
        await getdata()
        e.preventDefault()
        if(!email.includes('@sankey.com')){
            setemail('')
            alert('invalid email')
            return false
            }
        if(em.includes(email)){
            setemail('')
            alert('email of this name exists')
            return false
        }  
        if(pwd.length<=6){
            alert('password too short')
            return false
        }
        await submitdata();
        navigate('/')
    }

    async function getdata(){
        const querySnapshot = await getDocs(collection(db, "register"));
        querySnapshot.forEach((doc) => {
        em.push(doc.id)
});
        
    }
    
    return (
    <div className='main'>
        <div className="main-form">
        <h1>Register</h1>
        <form action="Submit">
             <div className="mail">
                 <label htmlFor="email">Email :-   </label>
                 <br />
                 <input type="email" name="email" id="email" placeholder='example@sankey.com' value={email} onChange={e=>{setemail(e.target.value.toLowerCase())}}/>
             </div>
             <div className="key">
                 <label htmlFor="password">Password :-   </label>
                 <br />
                 <input type="text" name="password" id="password" placeholder='enter a strong password' onChange={e=>{setpwd(e.target.value)}}/>
             </div>
             <div className="username">
                 <label htmlFor="name">Name :-   </label>
                 <br />
                 <input type="text" name="name" id="name" placeholder='enter your name' onChange={e=>{setname(e.target.value)}}/>
             </div>
             <div className="check">
                 <p>User type:-</p>
                 <input type="radio" name="checkbtn" id="user" value='user' checked='checked' onChange={e=>typecheck(e.target.value)}/>
                 <label htmlFor="user">User</label>
                 <br />
                 <input type="radio" name="checkbtn" id="admin" value='admin' onChange={e=>typecheck(e.target.value)} />
                 <label htmlFor="admin">Admin</label>
             </div>
             <button type="submit" className='btn' disabled={disable} form="nameform" value="Submit" onClick={check}>Submit</button>
        </form>      
        </div>
    </div>



  )
}

export default Register
