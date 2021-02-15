import React, { useContext } from 'react'
import Axios from 'axios';

//context
import { UserContextProvider } from './context/UserContext'

//components

import Router from './Router'

//styles
import './styles/main.scss'

Axios.defaults.withCredentials = true

function App() {

    return (
      <UserContextProvider>
        <Router />
      </UserContextProvider>

    );
}

export default App;
