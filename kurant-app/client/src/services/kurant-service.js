import Axios from 'axios';

const URL = 'http://localhost:5000/api/kurant/'

async function addKurant(group, id, money, date, type, note){
    const res = await Axios.post(URL + "kurant", {
        group,
        id,
        money,
        date,
        type,
        note
    })
    return res
}

 async function getKurant( group ){
     const res = await Axios.get(URL + "kurant", {
         group
     })
     return res.data
}

async function deleteKurant( id ) {
    try {
        console.log(id, "deleteKurant")
        const res = await Axios.delete(URL + 'delete', {id})
        console.log(res.data, "res.data")
        return res.data
    } catch (err){
        console.error(err)
    }
}


export default {
    getKurant,
    addKurant,
    deleteKurant
}
