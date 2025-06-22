import './App.css'

function App() {


  return (
    <>
      <div className='header'>
        <h1>To do list</h1>
      </div>
      <form className='input-field'>
        <input className='todo-info' type='text' placeholder='Input Task'></input>
        <button type='submit'>Add</button>
      </form>
      <div className='list-items'>

      </div>
    </>
  )
}

export default App
