import React, { useRef, useState } from "react";
import Todoitems from "./Todoitems";
import todo_icon from '../assets/todo_icon.png'

const Todo = () => {
  const [todolist,setTodoList] = useState([])
  const inputRef = useRef();
  const add = ()=>{
    const inputText = inputRef.current.value.trim();

    if(inputText === ""){
        return null;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    }
    setTodoList((prev)=>[...prev,newTodo]);
    inputRef.current.value = "";
  }

  return (
    <div
      className="bg-white place-self-center w-11/12 max-w-md 
    flex flex-col p-7 min-h-[500px] rounded-xl"
    >
    {/* ----title--- */}
    <div className="flex items-center m-7 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl fond-semibold">To-Do List</h1>
    </div>

    {/* ----input box--- */}
    <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input ref={inputRef}  className="bg-transparent border-0 outline-none
        flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600 " type="text" placeholder="Add Your Task"/>
        <button onClick={add} className="border-none rounded-full bg-orange-700 w-32 h-14 text-white
        text-lg fond-medium cursor-pointer">ADD+</button>
    </div>

    {/* ---todo list--- */}
    <div>
      {todolist.map((item,index)=>{
       return <Todoitems key={index} text={item.text} />    
      })} 
    </div>

    </div>
  );
};

export default Todo;
