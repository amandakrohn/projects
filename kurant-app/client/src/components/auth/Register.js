import React, {useState, useRef, useContext } from 'react'
import AuthService from '../../services/auth-service'
import { Link, useHistory } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import { RiMailLine, RiLockPasswordLine, RiLockPasswordFill, RiUser3Line } from 'react-icons/ri'

function Register() {
    //context
    const { setUserData } = useContext(UserContext)

    //history
    const history = useHistory()

    //refs
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfRef = useRef()

    //states
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)


    async function handleSubmit(e){
        e.preventDefault()

        try{
            setError('')
            setLoading(true)
            const registerRes = await AuthService.register(nameRef.current.value, emailRef.current.value, passwordRef.current.value, passwordConfRef.current.value)
            setUserData({
                token: registerRes.data.token ,
                user: registerRes.data.user
            })
            localStorage.setItem("auth-token", registerRes.data.token)
            history.push("/")
        } catch(err){
            setError(err.response.data.msg)
            console.log(error)
        }

        setLoading(false)
    }

    return (
      <div className="block-container">
        <h1 className="register">Registrering</h1>
            {error ? <p> {error} </p> : ''}
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="field">
                <label for="name"><b>Username</b></label>
                <div className="icon">
                    <RiUser3Line color="white" size={25} />
                </div>
                <input 
                    type="text" 
                    placeholder="Enter Username" 
                    ref = {nameRef}
                    id="uname" 
                    />
            </div>
            
            <div className="field">
                <label for="email"><b>Email</b></label>
                <div className="icon">
                    <RiMailLine color="white" size={25} />
                </div>
                <input 
                    type="text" 
                    placeholder="Enter Email" 
                    ref={emailRef}
                    id="email" 
                    required />
            </div>

            <div className="field">
                <label for="psw"><b>Password</b></label>
                <div className="icon">
                    <RiLockPasswordLine color="white" size={25} />
                </div>
                <input 
                    type="password" 
                    placeholder="Enter Password" 
                    ref={passwordRef}
                    id="psw" 
                    required />
            </div>

            <div className="field">
                <label for="psw-repeat"><b>Repeat Password</b></label>
                <div className="icon">
                    <RiLockPasswordFill color="white" size={25} />
                </div>
                <input 
                    type="password" 
                    placeholder="Repeat Password" 
                    ref={passwordConfRef}
                    id="psw-repeat" 
                    required/>
            </div>
            <button 
                disabled={loading}
                type="submit">Registrera
            </button>
          </form>
          <div className="no-account">
              <p>Har du redan ett konto? <Link to="/login">Logga in.</Link></p> 
          </div>
      </div>
    );
}

export default Register