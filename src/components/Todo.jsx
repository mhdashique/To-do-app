import React, { useEffect, useRef, useState } from "react";
import Todoitems from "./Todoitems";
import todo_icon from '../assets/todo_icon.png'

const Todo = () => {
  const [todolist,setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos") ) : [])
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
  const deleteTodo = (id)=>{
    setTodoList((prvTodos)=>{
      return prvTodos.filter((todo)=>todo.id !== id)
    })
  }
  const toggle = (id)=>{
    setTodoList((prevTodos)=>{
      return prevTodos.map((todo)=>{
        if (todo.id === id){
          return {...todo, isComplete : !todo.isComplete}
        }
        return todo;
      })
    })
  }

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todolist))
  },[todolist])

  return (
    <div
      className="bg-white place-self-center w-11/12 max-w-md xflex flex-col p-6  min-h-[500px] rounded-xl">

    {/* ----title--- */}
    <div className="flex items-center m-4 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl fond-semibold">To-Do List</h1>
    </div>

    {/* ----input box--- */}
    <div className="flex items-center m-4 bg-gray-200 rounded-full">
        <input ref={inputRef}  className="bg-transparent border-0 outline-none
        flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600 " type="text" placeholder="Add Your Task"/>
        <button onClick={add} className="border-none rounded-full bg-orange-700 w-32 h-14 text-white
        text-lg fond-medium cursor-pointer">ADD+</button>
    </div>

    {/* ---todo list--- */}

      {todolist.map((item,index)=>{
       return <Todoitems key={index} text={item.text} id={item.id} isComplete={item.isComplete}
       deleteTodo={deleteTodo} toggle={toggle}/>    
      })} 


    </div>
  );
};

export default Todo;
