import React from 'react'
import './App.css';
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import {BrowserRouter, Route} from 'react-router-dom'


const App = () => {
  return (
   <BrowserRouter>
      <Route exact path="/" component={Home}/>
      <Route exact path="/signup" component={SignUp}/>
      <Route exact path="/signin" component={SignIn}/>
   </BrowserRouter>
  )
}

export default App
