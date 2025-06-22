import './App.css';
import { useState } from 'react';


function App() {

  const [task, setTask] = useState('');
  const [dbList, setDbList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    //do something

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
    setTask('');
  }

  const handleRemove = (e) => {
    e.preventDefault();
    //do something
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
        <h1> temp </h1>
        <button onClick={(e) => {handleRemove(e)}}>Remove</button>
      </div>
    </>
  )
}

export default App
