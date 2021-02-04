import Axios from 'axios';

const URL = 'http://localhost:5000/users/'

async function addUsers(name, id, group){
    let str = ""
    group === "titel" ? str = "addTitel" : str = "addDkd"

    await Axios.post(URL + str, {
        name,
        id,
        group,
    })
}

 async function getUsers(group){
     let str = ""
     group === "titel" ? str = "addTitel" : str = "addDkd"

     const res = await Axios.get(URL + str, {
         group
     })
     return res.data
}

export default {
    getUsers,
    addUsers
}
