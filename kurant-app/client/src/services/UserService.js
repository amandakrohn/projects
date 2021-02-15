import Axios from 'axios';

const URL = 'http://localhost:5000/user/'

async function addUsers(name, id, group){
    let str = ""
    group === "titel" ? str = "titel" : str = "dkd"

    await Axios.post(URL + str, {
        name,
        id,
        group,
    })
}

 async function getUsers(group){
     let str = ""
     group === "titel" ? str = "titel" : str = "dkd"

     const res = await Axios.get(URL + str, {
         group
     })
     return res.data
}

export default {
    getUsers,
    addUsers
}
