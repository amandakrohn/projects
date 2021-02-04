import React, {useState, useRef, useContext } from 'react'
import AuthService from '../../services/auth-service'
import { Link, useHistory } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import { RiMailLine, RiLockPasswordLine } from 'react-icons/ri'

function Login() {
    //context
    const { setUserData } = useContext(UserContext)

    //history
    const history = useHistory()

    //refs
    const emailRef = useRef()
    const passwordRef = useRef()

    //states
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    
    async function handleSubmit(e){
        e.preventDefault()

        try{
            setError('')
            setLoading(true)
            const loginRes = await AuthService.login(emailRef.current.value, passwordRef.current.value)
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            })
            localStorage.setItem("auth-token", loginRes.data.token)
            history.push("/")
        } catch(err){
            setError(err.response.data.msg)
            console.log(error)
        }
       
        setLoading(false)
    }

    return (
      <div className="block-container">
        <h1 className="login"> Logga in </h1>
        {error ? <p> {error} </p> : ''}
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="field">
                <label htmlFor="email"><b>Email</b></label>
                <div className="icon">
                    <RiMailLine color="white" size={25} />
                </div>
                <input 
                    type="text" 
                    name="email"
                    placeholder="Email" 
                    ref={emailRef}
                    id="email" 
                    required />
            </div>
            <div className="field">
                <label htmlFor="psw"><b>Lösenord</b></label>
                <div className="icon">
                    <RiLockPasswordLine color="white" size={25}/>
                </div>
                <input 
                    name="psw"
                    type="password" 
                    placeholder="Lösenord" 
                    ref={passwordRef}
                    id="psw" 
                    required />
            </div>
            <button 
                disabled={loading}
                type="submit">Logga in
            </button>
        </form>
        <div className="no-register">
            <p>Har du inget konto?  <Link to="/register">Skapa ett konto.</Link></p> 
        </div>
      </div>
    );
}

export default Login