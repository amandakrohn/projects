import axios from 'axios';

const URL = 'http://localhost:5000/admins/'

async function register(username, email, password, passwordCheck) {
    await axios.post(URL + "register", {
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

function logout(){
    localStorage.setItem("auth-token", "")
}

function getCurrentUser(){
    return JSON.parse(localStorage.getItem("auth-token"));
}

export default {
    register,
    login,
    logout,
    getCurrentUser
}