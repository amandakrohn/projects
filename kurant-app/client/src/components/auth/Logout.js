import React, {useContext, useState} from 'react'
import AuthService from '../../services/auth-service'
import UserContext from '../../context/UserContext'
import { useHistory } from 'react-router-dom'



function Logout() {    
    const { setUserData } = useContext(UserContext)

    const history = useHistory()

    //states
    const [error, setError] = useState('')
    
    async function handleSubmit(e){
        e.preventDefault()

        try{
            setError('')
            AuthService.logout()
            setUserData({
                token: undefined,
                user: undefined,
            }) 
            history.push("/login")          
        } catch(err){
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