import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserService from '../../services/user-service'
import KurantService from '../../services/kurant-service'
import Nav from '../../components/layout/Nav'

function Kurant() {
    //date, HTML format: YYYY-MM-DD as string
    // behöver lägga till en 0:a innan alla månader 1-9, typ getMonth ger ej 0X, vilket formatet kräver 
    const date = new Date();
    let currentMonth = date.getMonth() + 1 < 10 ? 
        `0${date.getMonth() + 1}` : date.getMonth() + 1
    let currentDay = date.getDate() < 10 ?
        `0${date.getDate()}` : date.getDate()
    
    let currentDate = `${date.getFullYear()}-${currentMonth}-${currentDay}`

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [titel, setTitel] = useState([])
    const [kurant, setKurant] = useState({
        group: 'titel',
        id: '',
        money: 0,
        date: currentDate,
        type: '',
        note: '',
    })
        
    //ska hämta alla titlar <3
    useEffect(() => {
        setError('')
        
        async function getUsers(){
            try {
                const res = await UserService.getUsers("titel")
                setTitel(res.map(user => user))
            } catch(err) {
                setError(err)
            }
        }
        getUsers()
    }, [])

    function updateField(e){
        setKurant({
            ...kurant,
            [e.target.name]: e.target.value 
        })
    }

    async function handleSubmit(e){
        e.preventDefault()

        try{
            setError('')
            setLoading(true)
            const res = await KurantService.addKurant(kurant.group, kurant.id, kurant.money, kurant.date, kurant.type, kurant.note)
            setKurant({
                ...kurant,      //keep id and type unless change ()
                group: 'titel',
                money: 0,
                date: currentDate,
                note: '',
            })
            console.log(res)
        } catch(err){
            setError(err.response.data.msg)
        }
        setLoading(false)
    }

    return (
        <>
        <Nav />
          <div className="h1-parent">
            <h1>Lägg till kurant </h1>
          </div>
        <div className="block-container">
            {error ? <p> {error} </p> : ''}
            <form onSubmit={handleSubmit}>
            <div className="field">
                <label for="id"><b>Name</b></label>
                <select
                    name="id"
                    onClick={updateField}
                    required
                    defaultValue={'DEFAULT'}>
                    <option value={'DEFAULT'} disabled hidden>Vem</option>
                        {titel.map((user) => (
                            <option key={user.id} value={user.id}>{user.username}</option>
                        ))}
                </select>
            </div>
            <div className="field">
                <label for="money">Hur mycket?</label>
                <input 
                    type="number"
                    name="money"
                    value={kurant.money}
                    onChange={updateField} 
                    id="money"
                    min="1" 
                    required />
          </div>
          <div className="field">
            <label for="date">Datum</label>
            <input
                type="date"
                name="date"
                value={kurant.date}
                onChange={updateField}
                />
           </div>
           <div className="field">
                <label for="type">Typ</label>
                <select
                    name="type"
                    onClick={updateField}
                    required
                    defaultValue={'DEFAULT'}>
                    <option value={'DEFAULT'} disabled hidden>Typ av kurant</option>
                    <option value="sen">Sen </option>
                    <option value="betting">Betting</option>
                    <option value="annat">Annat </option>
                </select>
            </div>
            <div className="field">
                <label for="note">Note</label>
                <input
                    placeholder="Note"
                    type="textarea"
                    name="note"
                    value={kurant.note}
                    onChange={updateField}
                />
           </div>
          <button 
              disabled={loading}
              type="submit">Lägg till
          </button>
          <p>
              {error}
          </p>
        </form>
        <button> <Link to="/" > Tillbaka </Link> </button>
    </div>
    </>
  );
}

export default Kurant