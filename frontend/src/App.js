import { useState } from 'react'
import './App.css';

import Login from './pages/Login'
import Chat from './pages/Chat'

function App() {
  const [user, setUser] = useState('')
  const [isLogged, setIsLogged] = useState(false)

  const login = () => {
    if(user)
      setIsLogged(true)
  }

  const render = () => {
    if(isLogged)
      return <Chat user={user}/>
    else
      return <Login onSubmit={login} value={user} onChange={setUser}/>
  }

  return (
    <div className="App">
      {render()}
    </div>
  );
}

export default App;
