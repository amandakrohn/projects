import Axios from 'axios';

const URL = 'http://localhost:5000/kurant/'

async function addKurant(group, id, money, date, type, note){
    const res = await Axios({
        method: 'POST', 
        url: URL, 
        data: {
            group,
            id,
            money,
            date,
            type,
            note
        }
    })

    return res
}

 async function getKurant( group ){
     const res = await Axios({
        method: 'GET',
        url: URL,
        data: {
            group
        }
     })

     return res.data
}

async function deleteKurant( _id ) {
    try {
        const res = await Axios({
            method: 'DELETE', 
            url: URL + _id, 
            data: {
                _id: _id
            }
        })
        console.log("kurantservice: ", res.data)
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
