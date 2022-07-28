import React from 'react'
import './App.css';
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import UserDashboard from './pages/user/UserDashboard'
import {BrowserRouter, Route} from 'react-router-dom'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './component/PrivateRoute';
import AdminCreateProduct from './pages/admin/AdminCreateProduct';
import AdminAddBanner from './pages/admin/AdminAddBanner';
import AdminDashboard from './pages/admin/AdminDashboard';




const App = () => {
  return (
    <>
      <ToastContainer/>
        <BrowserRouter>
          <Route exact path="/" component={Home}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/signin" component={SignIn}/>
          <PrivateRoute exact path="/user/dashboard" component={UserDashboard}/>
          <Route exact path="/admin/dashboard" component={AdminDashboard}/>
          <Route exact path="/admin/dashboard/product/create" component={AdminCreateProduct}/>
          <Route exact path="/admin/dashboard/banner/create" component={AdminAddBanner}/>
        
      </BrowserRouter>
    </>

  )
}

export default App
