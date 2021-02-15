import axios from 'axios';

const URL = 'http://localhost:5000/admin/'

async function register(username, email, password, passwordCheck) {
    await axios.post(URL, {
        username,
        email,
        password, 
        passwordCheck
    })

    const loginRes = await axios.post(URL + "login", {
        email, 
        password
    })

    return loginRes;
}

async function login(email, password) {
    const loginRes = await axios.post(URL + "login", {
      email,
      password  
    })

    return loginRes;
}

async function logout(){
    const logoutRes = await axios.get(URL + "logout")
    console.log("logged out:", logoutRes)
    return logoutRes
}


export default {
    register,
    login,
    logout,
}