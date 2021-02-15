import React, {useContext} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

//context
import UserContext  from './context/UserContext'


//components
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/Dashboard.js'
import CreateTitel from './components/titel/CreateTitel'
import AddKurant from './components/titel/AddKurant'
import KurantHistory from './components/titel/KurantHistory'
import Settings from './components/Settings'


function Router() {

  const { loggedIn } = useContext( UserContext );

    return (
        <BrowserRouter>
          <Switch>
            {!loggedIn && <Route path="/login" component={Login}/> }
            {!loggedIn && <Route path="/register" component={Register}/> }
            {loggedIn && <Route component={Dashboard} path="/" exact /> }
            {loggedIn && <Route component={CreateTitel} path="/create-titel" /> }
            {loggedIn && <Route component={AddKurant} path="/add-kurant-titel" /> }
            {loggedIn && <Route component={KurantHistory} path="/kurant-titel" /> }
            {loggedIn && <Route component={Settings} path="/settings" /> }
          </Switch>
        </BrowserRouter>

    );
}

export default Router;
