import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import UserContext from '../context/UserContext'

function PrivateRoute({component: Component, ...rest}){  
  const { userData } = useContext(UserContext)
  console.log(userData)
  
  return (
      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /login page
      <Route {...rest} render={props => (
        userData.user ? ( <Component {...props}/>) : ( <Redirect to="/login" />)
      )}/>
  )
}

export default PrivateRoute;