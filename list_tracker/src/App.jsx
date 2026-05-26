import { useState } from "react";

function app(){

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([])

  const addTask = () =>{
    if(input.trim() !== ""){
      const newTask = [...tasks, input]
      setTasks(newTask);
      setInput("")
      localStorage.setItem("myTodoList", JSON.stringify(newTask))
    }
  }

  const removeTask = (indexToRemove) =>{
    const updatedTask = tasks.filter((_,index) => index !== indexToRemove);
    setTasks(updatedTask)
  }
  return(
    <>
    <h1> These are the task </h1>
    <input 
     type="text"
     placeholder="Enter your tasks here"
     value={input}
     onChange={(e) => setInput(e.target.value)}/>

     <button onClick={addTask}>addTask</button>

     <ul>
      {tasks.map((t,index) => (
        <li>
          {t}
          <button onClick={() => removeTask(index)}>DeleteTask</button>
        </li>
      ))}
     </ul>
    </>

  
  )
}

export default app;