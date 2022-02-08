import React from 'react';
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({...rest}) => {
    const auth = localStorage.getItem('token');
    if (auth){
        return <Route {...rest}/>
    }
  return <Redirect to="/signin"/>
};

export default PrivateRoute;
