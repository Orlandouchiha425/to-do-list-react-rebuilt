import { useState,useEffect , useRef} from 'react';
import axios from 'axios'

import { Link } from 'react-router-dom';

import './App.css';

function App() {

  // i get the data from To do list whcih i get the /list from backend. 
  const [tasks,setTasks]=useState({})
  const [buttonPressed, setButtonPressed]=useState(false)
  const [info, setInfo]=useState(false)
  const entry = useRef(null);
  const status = useRef(null);
 useEffect(()=>{
  (async()=>{
    try{
      const response=await axios.get('http://localhost:3000/todo/list')
      setTasks(response.data)
    }catch(err){
      console.log(err)
    }
  })()
 },[info,buttonPressed])


 ///``````````````````````````````````````````````````````````````````
 const handleClick=async(statusChange,id)=>{
   try{
     const response=await axios.put(`http://localhost:3000/todo/${id}`,{
       status:statusChange
     })
     if(response.status===200){
       setButtonPressed(!buttonPressed)
     }else{
       console.log('something went wrong')
     }
    

   }catch(err){
     console.log(err)
   }
 }


////~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
///this was my code below, however it failed, so i copied Josh code from READ me file, trying to do a post
// const handleSubmit=async(statusSubmit)=>{
//   try{
//     const response=await axios.post(`http://localhost:3000/todo`,{
//       status:statusSubmit

//     })
//     if(response.status===200){
//       setTasks(response.data)
//     }
//   }catch(err){
//     console.log('something went wrong')
//   }
// }



const handleSubmit = async (evt) => {
  evt.preventDefault()
  
  try {
    await axios.post('http://localhost:3000/todo', {
      entry: entry.current.value,
      status: status.current.value.toUpperCase()
    })
    setInfo(!info)
    entry.current.value = ""
  } catch (err) {
    console.log(err)
  }


}
////~~~~~~~~~~~~~~~~~~

  return (
    <div className="App">
     
<div className='container'>




<form action="/" method="POST">
        <label>Entry:<input ref={entry} type='text'/> </label> 
        <label>Status:
          <select ref={status}>
            <option value="TO-DO">
              TO-DO
            </option>

            <option value="PENDING">
              Pending
            </option>
            <option value="COMPLETED">
              Completed
            </option>
          </select>
          </label>
          <button onClick={handleSubmit}>Add</button>
    </form>
   
    <div id='to-do'>
    <h2>To-do</h2>
    <div className='list-group jumbotron'>

        {
          tasks["TO-DO"]  ? tasks["TO-DO"].map((item,index)=>{ 
            return(
              <div className=" list-group-item"key={index}>
                <Link to={`/${item._id}`}>{item.entry}</Link>
                <div>
                  <button onClick={()=>{handleClick("PENDING",item._id)}}>Pending</button>
                  <button onClick={()=>{handleClick("COMPLETED",item._id)}}>Completed</button>
                </div>
              </div>
            )
          })
          :
          ""
        }
       
        
       

      </div>
      </div>
      <div id='pending'>
    <h2>Pending</h2>
    <div className='list-group jumbotron'>


        {
          tasks["PENDING"]  ? tasks["PENDING"].map((item,index)=>{ 
            return(
              <div className="list-group-item" key={index}>
                <Link to={`/${item._id} `}> {item.entry}</Link>
                <div>
                  <button onClick={()=>{handleClick("TO-DO",item._id)}}>ToDo</button>
                  <button onClick={()=>{handleClick("COMPLETED",item._id)}}>Completed</button>
                </div>
              </div>
            )
          })
          :
          ""
        }
      </div>
    </div>
  <div id='completed'>
    <h2>Completed</h2>
    <div className='list-group jumbotron'>

    {
          tasks["COMPLETED"]  ? tasks["COMPLETED"].map((item,index)=>{ 
            return(
              <div className=" list-group-item " key={index}>
                <Link to={`/${item._id}`}>{item.entry}</Link>
                <div>
                  <button onClick={()=>{handleClick("PENDING",item._id)}}>Pending</button>
                  <button onClick={()=>{handleClick("TO-DO",item._id)}}>ToDo</button>
                </div>
              </div>
            )
          })
          :
          ""
        }
      </div>

</div>
</div>
    </div>
  );
}

export default App;
