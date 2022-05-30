import React, { useCallback, useEffect, useState } from 'react'
import {db} from '../../firebase'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import './admin.css'
import {AgGridReact} from 'ag-grid-react'
import { collection, getDocs} from "firebase/firestore"; 
import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import { doc, deleteDoc } from "firebase/firestore";


function Admin() {
    // const [data,setdata]=useState([])
    const [disable,setdis]=useState(true)
    const[selrow,setrow]=useState('')
    const [rowData,setrdata]=useState([])
    const navigate=useNavigate();
    if(Cookies.get('logs')){
        let val=Cookies.get('logs')
        val=val.split(',')
    }else{
        navigate('/')
    }   
    useEffect(()=>{
        let em=[]
        let data=[]
        let ans=[]
        async function call(){
            const querySnapshot = await getDocs(collection(db, "register"));
            querySnapshot.docs.forEach((doc) => {
                em.push(doc.data())
           });
            data=em
            data.forEach((dat)=>{ans.push({email:dat.email,password:dat.password,name:dat.name,admin:dat.isadmin})})
            em=[]
            setrdata(ans)
    }
        call();
    },[])
    console.log(rowData.filter(data=>data.email!=='hero@sankey.com')) 
    const columnDefs=[
        {field:'email',sortable:true,filter:true},
        {field:'password',sortable:true,filter:true},
        {field:'name',sortable:true,filter:true},
        {field:'admin',sortable:true,filter:true}
    ]
    const cellClicked=useCallback(e=>{
        setrow(e.data.email)
        setdis(false)
    },[]);
    async function del(){
        await deleteDoc(doc(db, "register", selrow));
        setrdata(rowData.filter(data=>data.email!==selrow))
    }
    function desel(){
        setrow('')
        setdis(true)
    }
    function lo(){
        Cookies.remove('logs')
        navigate('/')
    }   
  return (
    <div className='admin-body'>
       <button className='dessel' disabled={disable} onClick={desel}>Deselect</button>
      <button className='delbtn' disabled={disable} onClick={del}>Delete</button>
      <div className="row">
      <div className="ag-theme-alpine" style={{width:700,height:500,fontSize:15}}>
          <AgGridReact 
          onCellClicked={cellClicked}
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection='single' 
          animateRows={true}/>
      </div>
      </div>
      <button className='lo' onClick={lo}>Logout</button>
    </div>
  )
}

export default Admin
