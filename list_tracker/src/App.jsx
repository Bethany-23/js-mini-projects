// import { useState, useEffect } from "react";

import { useState } from "react";

// function App(){
//   const[task, setTask] = useState([]);
//   const[inputValue, setInputValue] = useState("")

//   const addTask = ()=>{
//     if(inputValue.trim() !== ""){
//       const newTask= [...task, inputValue];
//       setTask(newTask)
//       setInputValue("");
//       localStorage.setItem("myTodoList", JSON.stringify(newTask))
//     };
//   }
//   const removeTask = (indexToRemove)=>{
//     const updatedTask = task.filter((_, index)=> index !== indexToRemove);
//     setTask(updatedTask);
//   }
 
//   return (
//     <>
//       <h1> Here are your tasks</h1>
//       <input
//         type="text"
//         placeholder="add your task here"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//       />

//       <button onClick={addTask}>Add Task</button>

//       <ul>
//         {task.map((t, index) => (
//           <li>
//             {t}
//             <button onClick={()=>removeTask(index)}>Remove</button>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

// export default App;



function App(){

  const[tasks, setTasks] = useState([])
  const[input, setInput] = useState("")

  const addTask = () =>{

  }

  const removeTask = () =>{
    if (input.trim() !== ""){
      const newTask = [...tasks, input];
      setTasks(newTask);
      setInput("");
      localStorage.getItem()
    }

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
    </>
  )

}

export default App;