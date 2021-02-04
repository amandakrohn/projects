import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Axios from 'axios';

//context
import UserContext from './context/UserContext'

//utils
import PrivateRoute from './utils/PrivateRoute'
import UnAuthorizedRoute from './utils/UnAuthorizedRoute'

//components
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/Dashboard.js'
import CreateTitel from './components/titel/CreateTitel'
import AddKurant from './components/titel/AddKurant'
import KurantHistory from './components/titel/KurantHistory'
import Settings from './components/Settings'


//styles
import './styles/main.scss'


function App() {
    const [userData, setUserData] = useState({
      token: undefined,
      user: undefined
    })

    useEffect(() => {
      const checkLoggedIn = async () => {
        let token = localStorage.getItem("auth-token");
        if(token === null) {
          localStorage.setItem("auth-token", "");
          token = "";
        }

        const tokenRes = await Axios.post(
          "http://localhost:5000/admins/tokenIsValid",
          null,
          { headers: { "x-auth-token": token } }
        )

        if(tokenRes.data) {
          const userRes = await Axios.get("http://localhost:5000/admins/", {
            headers: { "x-auth-token": token } })
          setUserData({
            token,
            user: userRes.data,
          })
        }
      }
  
      checkLoggedIn();
    }, []);

    return (
      <Router>
        <UserContext.Provider value={{userData, setUserData}}>
          <Switch>
            <UnAuthorizedRoute path="/login" component={Login}/>
            <UnAuthorizedRoute path="/register" component={Register}/>
            <PrivateRoute component={Dashboard} path="/" exact />
            <PrivateRoute component={CreateTitel} path="/create-titel" />
            <PrivateRoute component={AddKurant} path="/add-kurant-titel" />
            <PrivateRoute component={KurantHistory} path="/kurant-titel" />
            <PrivateRoute component={Settings} path="/settings" />
          </Switch>
        </UserContext.Provider>
      </Router>
    );
}

export default App;
