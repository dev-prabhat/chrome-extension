import { useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import { SingleTodo } from "../SingleTodo"
import "./todo.css"

export const Todo = () => {
    const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem("todoList")) ?? [])
    const [todo, setTodo] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if(todo.trim() === "") return alert("Please Enter todo..")
        setTodoList(prev => ([...prev ,{ id: uuid(),title:todo}]))
        setTodo("")
    }

    useEffect(()=>{
       localStorage.setItem("todoList",JSON.stringify(todoList))
    },[todoList])

    const handleDelete = () => {
        localStorage.removeItem("todoList")
        setTodoList([])
    }

    return(
      <div className="todo__container"> 
        <form className="todo__form" onSubmit={handleSubmit}>
            <p className="todo__title">Todo List</p>
            <input
              className="todo__input"
              type="text"
              placeholder="enter your todo..." 
              onChange={(e)=>setTodo(e.target.value)}
              value={todo}
              required
              />    
        </form>
        <ul className="todo__list">
            {
                todoList.map((todo) => (
                <SingleTodo key={todo.id} todo={todo} setTodoList={setTodoList}/>))
            }
            <button className="delete-btn" onClick={handleDelete}> Delete All</button>
        </ul>
    </div>
    )
}