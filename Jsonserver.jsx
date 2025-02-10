import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Jsonserver = () => {
const[data,setData] = useState({
    name:"",
    age:""
  })

  const[allData,setAllData] = useState([])
  const[id,setId] = useState('')
   const handleChange = (e)=>{
     const{name,value} = e.target
     console.log(value)
     setData({
        ...data,
        [name]:value
     })
   }

   const seveData =(e)=>{
    e.preventDefault()
    if(id != ''){
        axios.put("http://localhost:3000/users/"+id,data)
        .then(()=>console.log("Updated successfully...."))
    }else{
        axios.post("http://localhost:3000/users/",data)
        .then(()=>console.log("updated successfully....."))
    }
    disp()
    setData({
        name:'',
        age:''
    })
    setId('')
   }
   const disp=()=>{
        axios.get("http://localhost:3000/users")
        .then((res)=>setAllData(res.data))
   }
   useEffect(()=>{
        disp()
   })

   const delData = (id)=>{
    axios.delete("http://localhost:3000/users/"+id)
    .then(()=>console.log('Deleted successfully....'))
    disp()
   }

   const editData = (id)=>{
    axios.patch("http://localhost:3000/users/"+id)
    .then((res)=>setData(res.data))
    setId(id)
   }
  return (
    <div>
    <form action='#' method='post' onSubmit={seveData}>
        <label htmlFor=''>Name:</label>
        <input type='text'name='name'id='' onChange={handleChange} value={data.name}/>
<br></br>
        <label htmlFor=''>Age:</label>
        <input type='number'name='age'id='' onChange={handleChange} value={data.age}/><br></br>
        <input type='submit' value="Save Data"/>
    </form>

    <br></br>

     <table border={"2"}>
        <thead>
            <td>Id</td>
            <td>Name</td>
            <td>Age</td>
            <td>Action</td>
        </thead>
        <tbody>
               {
                allData.map((i)=>{
                    return(
                        <tr>
                            <td>{i.id}</td>
                            <td>{i.name}</td>
                            <td>{i.age}</td>
                            <td>
                            <button onClick={()=>editData(i.id)}>Edit</button>
                            <button onClick={()=>delData(i.id)}>Delete</button>
                            </td>
                        </tr>
                      
                    )
                })
               }
        </tbody>


     </table>
    </div>

    
  )
}

export default Jsonserver
