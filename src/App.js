
import './App.css';
import React,{useState,useEffect,useRef,useCallback} from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {MdEdit} from 'react-icons/md';
import {MdDelete} from 'react-icons/md';

const App=() =>{
  const [todos,setTodos] = useState([]);
  const [userInput, setUseInput]= useState("");
  const ref = useRef(null);
  const [todoIndex,setTodoIndex]=useState(null);
  const [editText,setEditText] = useState("");
  const [editing, setEditing]= useState(false);

  const addTodoHandler = useCallback(()=>{
        const oldTodos= [...todos];

        if(userInput ===""){
           return;
        }else{
           const newTodo={
             id:Math.floor(Math.random()*1000),
             text:userInput
           };

           const newTodos=oldTodos.concat(newTodo);

           setTodos(newTodos)
        }

        setUseInput("");
  },[todos,userInput]);

  const deleteTodoHandler=useCallback((id)=>{
    const oldTodos=[...todos];
    const newTodos=oldTodos.filter((todo)=>todo.id !==id);

    setTodos(newTodos);
          
  },[todos]);

  const editTodoHandler=useCallback((index)=>{
    setTodoIndex(index);
    setEditing(true);
      
  },[])

  const saveEditTodoHandler=useCallback((id)=>{
    setEditing(false)
    setTodoIndex(null)

    const oldTodos=[...todos];
   const newTodos= oldTodos.map((todo)=> {
      if(todo.id===id){
        if(editText !== ""){
          todo.text =editText
        }else{
          return todo
        }
      }
      return todo

    });
    setTodos(newTodos)

  },[editText,todos]);


  useEffect(()=>{
     ref.current.focus()

  },[])

  return (
    <div className="App">
      <Navbar/>
      <div className="container">
        <span className='total'>Total Todos:{todos.length}</span>
        <div className='input-container'>
          <input type="text"  
          value={userInput} 
          ref={ref}
          onChange={(e)=>setUseInput(e.target.value)}  />
          <button onClick={addTodoHandler}>Add</button>

        </div>
        <div className="todos-container-parent">
          {todos.map((todo,index)=>(
            <div key={todo.id} className='todos-container-child'>
              {editing && todoIndex=== index ? (
              <div>
                <input type="text" defaultValue={todo.text} onChange={(e)=>setEditText(e.target.value)} />
                <button onClick={()=>saveEditTodoHandler(todo.id)}>Save</button>
              </div>
              
               ) :<>
               <div><h4 className='todo-text'>{todo.text}</h4></div>
               <div><MdEdit className='icon' 
               onClick={()=>editTodoHandler(index)}/>
                   <MdDelete className='icon' 
                    onClick={()=>deleteTodoHandler(todo.id)}/></div> </>}
             
                

            </div>
          ))}

        </div>
      </div>
      <Footer/>
      
    </div>
  );
}

export default App;
