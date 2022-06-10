import {useState} from "react"

import { BsTrash } from "react-icons/bs";

export const SingleTodo = ({todo,setTodoList}) => {
    const [completed, setCompleted] = useState("none")

    const deleteSingleTodo = (id) => {
        setTodoList(prev => prev.filter(todo => todo.id !== id))
    }

    return(
        <>
           <li className="single__todo">
              <p onClick={()=>setCompleted("line-through")} style={{ textDecoration:completed}}> {todo.title} </p>
               <BsTrash onClick={()=>deleteSingleTodo(todo.id)}/>
            </li>
        </>
    )
}