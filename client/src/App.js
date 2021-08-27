import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Auth from './components/Auth';
import Todo from './components/Todo';
import { addToken } from './features/authSlice';


function App() {

  const { token } = useSelector(state => state.user)
  const dispath = useDispatch()
  useEffect(()=>{
    dispath(addToken())
  },[])
  
  return (
    <div className="App">
      {token ? <Todo /> : <Auth />}
    </div>
  );
}

export default App;
