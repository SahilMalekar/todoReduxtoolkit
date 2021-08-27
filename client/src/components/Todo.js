import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo , fetchTodo , deleteTodo } from "../features/todoSlice";
import { logOut } from "../features/authSlice";

const Todo = () => {
    const [myTodo , setTodo] = useState('')
    const dispatch = useDispatch();
    const todos = useSelector(state=>state.todos)
    const handleClick = ()=>{
        dispatch(createTodo({todo : myTodo}))
        setTodo('')
    }
    const handleDelete =(id)=>{
        dispatch(deleteTodo(id))
    }
    useEffect(()=>{
        dispatch(fetchTodo())
    },[])
    return ( 
        <div >
            <input type="text" placeholder="Add todo..." value={myTodo} onChange={(e)=>setTodo(e.target.value)} />
            <button className='btn #f50057 pink accent-3' onClick={()=>handleClick()}>Add</button>
            <ul class="collection with-header">
            {todos.map(item =>{
                return  <li onClick={()=>handleDelete(item._id)} className="collection-item" key={item._id}>{item.todo}</li>
            })}
                   
      </ul>
      <button className='btn #f50057 pink accent-3' onClick={()=> dispatch(logOut())}>LogOut</button>
        </div>
     );
}
 
export default Todo;