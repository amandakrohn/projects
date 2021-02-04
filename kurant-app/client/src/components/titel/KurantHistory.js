import React, { useContext, useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios';

import KurantService from '../../services/kurant-service'

import Nav from '../layout/Nav'

import UserContext from '../../context/UserContext'

function KurantHistory() {
    const { userData } = useContext(UserContext)

    const [error, setError] = useState('')
    const [kurantHistory, setKurantHistory] = useState([])
    const [topUsers, setTopUsers] = useState([])
    const [kurantSum, setKurantSum] = useState(0)
    const [loading, setLoading] = useState(false)
    
    useLayoutEffect(() => {
        setError('')   
        async function fetchData() {
            try{
                setLoading(true)
                const kurantRes = await KurantService.getKurant("titel")
                const kurantRes_2 = await KurantService.getKurant("titel")

                setKurantHistory(kurantRes.map(kurant => kurant))
                
                setKurantSum(kurantRes.reduce((prev, curr) => {
                    return prev + curr.money;
                }, 0))

                setTopUsers(kurantRes_2.reduce(function (acc, curr) {
                    const found = acc.find(e => e.id === curr.id)
                    if(found) found.money = found.money + curr.money
                    return found ? acc : acc.concat(curr)
                }, [])
                .sort((prev, curr) => {
                    return curr.money - prev.money;
                })
                .slice(0,3))
            } catch (err){
                console.log(err)
                setError()
            }
        }

        fetchData()
        setLoading(false);
    }, [])

    async function handleDelete( _id ){
        const res = await KurantService.deleteKurant( _id )
        console.log(res, "res after handleDelete")
    }

    if(loading) {
        console.log("Loading")
        return(
            <div>
                {loading ? 'Loading...' : kurantHistory}
            </div>)
    } else {
        return(
            <>
            <Nav />
            <div className="h1-parent">
                <h1>Stats - Titel</h1>
            </div>
                {error ? {error} : ''} 
            <div>
                <p> graphs n stuff ? </p>
                
            </div>
            <hr></hr>
            <div>
                <h2>Sum: {kurantSum}</h2>
            </div>
            <div>
                <h4>Topplista</h4>
                    <div className="top-kurant-history-container">
                    {topUsers.map((user) => (
                        <div className="top-kurant-history-item">
                            <p>{user.username}</p> 
                            <p> {user.money}</p>
                        </div>
                    ))}
                    </div>
                </div>
            
            <div>
                <hr></hr>
                
                <div className="kurant-history-container">   
                    {kurantHistory.map((kurant) => (
                        <div className="kurant-history-item">
                            <p>{kurant.username}</p> 
                            <p> {kurant.money}</p>
                            <button onClick={e => handleDelete(kurant._id)}>Delete</button>
                        </div>
                    ))}
                </div>
                
                <button> <Link to="/" > Tillbaka </Link> </button>
            </div>
        </>
    )
}
}


export default KurantHistory


/*useEffect(() => {
        setTopUsers([])

        async function getKurant(){
            let userKurant = []
            try {
                const res = await UserService.getUsers("titel")
                res.map(user => userKurant.push({username: user.username, money: 0}))
                return userKurant
            } catch(err) {
                setError(err)
            }
        }

        async function topKurant( userKurant ) {
            try {
                setTopUsers([])
                for(let kurant in kurantHistory) {
                    let currentUser = kurantHistory[kurant].username
                    let money = kurantHistory[kurant].money

                    let userObj = userKurant.find( obj => obj.username === currentUser )
                    userObj.money = userObj.money + money
                    console.log(kurantHistory[kurant])
                    setTopUsers([...topUsers, kurantHistory[kurant]])

                    //change? test frst cus changed without test
                }
                
                console.log(topUsers, "topp1")
            } catch(error){
                console.log(error)
            }
            
            
            /* 
            userKurant.sort((a,b) => {
                return b.money - a.money
            })
            let top3Users = userKurant.slice(0, 3)
            setTopUsers(top3Users)*/
        //}
        /*
                async function exec(){
                    let uk = await getKurant()
                    let res = await topKurant(uk)
                    
                }
        
                exec()
                
        
            }, [])*/