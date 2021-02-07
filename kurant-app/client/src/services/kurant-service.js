import Axios from 'axios';

const URL = 'http://localhost:5000/api/kurant/'

async function addKurant(user, group, id, money, date, type, note){
    const res = await Axios({
        method: 'POST', 
        url: URL + 'kurant', 
        data: {
            group,
            id,
            money,
            date,
            type,
            note
        }, 
        headers: {
            'x-auth-token': user.token,
        }
    })
    return res
}

 async function getKurant( group ){
     const res = await Axios.get(URL + "kurant", {
         group
     })
     return res.data
}

async function deleteKurant( user, _id ) {
    try {
        const res = await Axios({
            method: 'delete', 
            url: URL + 'delete', 
            data: {
                _id: _id
            }, 
            headers: {
                'x-auth-token': user.token,
            }
        })
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
