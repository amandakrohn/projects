import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import UserContext from '../context/UserContext'

function UnAuthorizedRoute({component: Component, ...rest}){  
  const { userData } = useContext(UserContext)
  
  return (
      <Route {...rest} render={props => (
        userData.user ? ( <Redirect to="/" />) : ( <Component {...props}/> )
      )}/>
  )
}

export default UnAuthorizedRoute;