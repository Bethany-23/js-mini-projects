import { useState, useEffect } from "react";

function App(){
  const[task, setTask] = useState([]);
  const[inputValue, setInputValue] = useState("")

  const addTask = ()=>{
    if(inputValue.trim() !== ""){
      setTask([...task, inputValue]);
      setInputValue("");
    }
  }
  const removeTask = ()=>{

  }
  return(
    <>
    <h1> Here are your tasks</h1>
    <input
    type="text"
    placeholder="add your task here"
    value={inputValue}
    onChange={(e) =>setInputValue(e.target.value)}/>

    <button onClick={addTask}>Add Task</button>
    <ul></ul>
    </>
  )
}

export default App;