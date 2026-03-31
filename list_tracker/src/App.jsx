import { useState, useEffect } from "react";

function App(){
  const[task, setTask] = useState([]);
  const[inputValue, setInputValue] = useState("")

  const addTask = ()=>{
    if(inputValue.trim() !== ""){
      const newTask= [...task, inputValue];
      setTask(newTask)
      setInputValue("");
      localStorage.setItem("myTodoList", JSON.stringify(newTask))
    };
  }
  const removeTask = (index)=>{
    if(index == task){
      setTask[index].pop();
    }
  }
 
  return (
    <>
      <h1> Here are your tasks</h1>
      <input
        type="text"
        placeholder="add your task here"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      <ul>
        {task.map((t, index) => (
          <li>
            {t}
            <button onClick={()=>removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;