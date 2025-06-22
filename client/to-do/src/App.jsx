import './App.css';
import { useState } from 'react';


function App() {

  const [task, setTask] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault()
    //do something
    console.log(task);
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
