import React, {useContext, useState} from 'react'
import AuthService from '../../services/auth-service'
import { useHistory } from 'react-router-dom'
import UserContext from '../../context/UserContext'

function Logout() {   
    //context
    const { getLoggedIn } = useContext( UserContext ) 

    const history = useHistory()

    //states
    const [error, setError] = useState('')
    
    async function handleSubmit(e){
        e.preventDefault()

        try{
            setError('')
            await AuthService.logout()
            await getLoggedIn()
            history.push("/login")          
        } catch(err){
            console.error(err)
            setError(err)
        }
    }

    return (
      <div className="">
          <p className="menu-item" onClick={handleSubmit}>Logga ut</p>
            <p>
                {error}
            </p>
      </div>
    );
}

export default Logout