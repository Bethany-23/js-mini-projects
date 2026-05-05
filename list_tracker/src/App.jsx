import { useState } from "react";


function App(){

  const[tasks, setTasks] = useState([])
  const[input, setInput] = useState("")

  const addTask = () =>{
      if(input.trim() !== ""){
        const newTask = [...tasks, input];
        setTasks(newTask)
        setInput("")
        localStorage.setItem("myTodoList", JSON.stringify(newTask))
      };
    }

  const removeTask = (indexToRemove) =>{
    const updatedTask = tasks.filter((_, index) => index !== indexToRemove);
    setTasks(updatedTask);
    }

  return(
    <>
    <h1> These are the list of tasks</h1>

    <input 
    type="text"
    placeholder="Enter your task here"
    value={input}
    onChange={(e)=>setInput(e.target.value)}
     />
    <button onClick={addTask}> Add Task</button>

    <ul>
      {tasks.map((t, index)=>(
        <li>
          {t}
          <button onClick={()=>removeTask(index)}> Remove</button>
        </li>
      ))}
    </ul>

    </>
  );

}

export default App;