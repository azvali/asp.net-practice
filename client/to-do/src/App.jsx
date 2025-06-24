import './App.css';
import { useState, useEffect } from 'react';


function App() {

  const [task, setTask] = useState('');
  const [dbList, setDbList] = useState([]);

  useEffect(() => {
    getTasks();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(task);

    if(task === ""){
      console.log('task empty.');
      return;
    }

    const response = await fetch("http://localhost:5093/api/postTask",{
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({
        Task: task
      })
    })

    const data = await response.json();
    console.log(data);
    setDbList(currList => [...currList, data]);
    setTask('');
  }
  
  const getTasks = async () => {
    const response = await fetch('http://localhost:5093/api/getTasks', {
      method: "GET",
    })

    const data = await response.json();

    if(response.ok){
      setDbList(data);
      
    }
  }

  const handleRemove = async (id) => {
    
    const response = await fetch(`http://localhost:5093/api/deleteItem/${id}`, {
      method : "DELETE"
    });

    const data = response.json();

    if(response.ok){
      setDbList(currList => currList.filter(item => item.id !== id));
    }
    else{
      console.log(data);
    }
  } 

  return (
    <>
      <div className='header'>
        <h1>To do list</h1>
      </div>
      <form className='input-field'>
        <input className='todo-info' type='text' placeholder='Input Task' value={task} onChange={(e) => {setTask(e.target.value)}}></input>
        <button type='submit' onClick={(e) => {handleSubmit(e)}}>Add</button>
      </form>
      <div className='list-items'>
        {dbList.map(item => (
          <div className='list-item' key={item.id}>
            <h1>{item.content}</h1>
            <button onClick={() => {handleRemove(item.id)}}>Remove</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
