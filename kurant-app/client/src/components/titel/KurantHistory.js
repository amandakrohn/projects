import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

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
    const [rerender, setRerender] = useState(false)

    useEffect(() => {
        setError('') 

        async function history() {
            try{
                console.log("rendering history")
                const kurantRes = await KurantService.getKurant("titel")
                setKurantHistory([...kurantRes].map(kurant => kurant))
            } catch (err){
                console.log(err)
                setError(err)
            }
        }

        async function sum() {
            try{
                console.log("render total sum")
                const kurantRes = await KurantService.getKurant("titel")

                setKurantSum([...kurantRes].reduce((prev, curr) => {
                    return prev + curr.money;
                }, 0))
            } catch (err){
                console.log(err)
                setError(err)
            }
        }

        async function top() {
            try{
                console.log("render top")
                const kurantRes = await KurantService.getKurant("titel")

                setTopUsers([...kurantRes].reduce(function (acc, curr) {
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
                setError(err)
            }
        }

        setLoading(true)
        history()
        sum()
        top()
        setLoading(false);
    }, [rerender])
    

    async function handleDelete( _id ){
        try{
            setLoading(true)
            setError('')
            await KurantService.deleteKurant( userData, _id )
            setRerender(!rerender)
        } catch(err){
            setError(err)
            console.error(err)
        }
        setLoading(false)
    }

    if(loading) {
        console.log("Loading")
        return(
            <div>
                <p>Loading...</p>
            </div>)
    } else {
        return(
            <>
            <Nav />
            <div className="h1-parent">
                <h1>Stats - Titel</h1>
            </div>
                {error ? error : ''} 
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