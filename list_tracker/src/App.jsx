import { useState, useEffect } from "react"

function App(){
  const [task, setTask] = useState([]);
  const [inputValue, setInputValue] = useState("")

  const addTask = () =>{
    if(inputValue.trim() !== " "){
      setTask([...task, inputValue]);
      setInputValue("");
    }
  }
  const removeTask = (indexToRemove)=>{
    
  }
  const updateTask = (index) =>{

  }
  return(
    <>
    <input
     type="text"
     value={inputValue}
     onChange={(e)=>setInputValue(e.target.value)}/>

    <button onClick={addTask}>Add a task</button>
    <ul>
      {task.map((t, index)=>(<li></li>))}
    </ul>
    </>
  )
}
export default App;