import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Home.css'


export default function Home(){
    const API_KEY = 'yhyWZureXbsUFjlbxYgYDjzjFGXf5KcAznb4CyRc';

    const [photoData, setPhotoData] = useState('');

    useEffect(() => {
        fetchPhoto();

        async function fetchPhoto(){
            const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
            const data = await res.json();
            console.log(data);
            setPhotoData(data);
        }
    }, []);


    return (
        <div className="wrapper">
            <ul className="nav-ul">
                <div className="link">
                    <li><Link className={['text-link', 'active'].join(" ")} to="/">PHOTO OF THE DAY</Link></li>
                    <li><Link className='text-link' to="marsphoto">PHOTOS OF MARS</Link></li>
                </div>
            </ul>
            <div className="content">
                <div className="text">
                    <h1>{photoData.title}</h1>
                    <p className="explanation">{photoData.explanation}</p>
                    <p className="date">{photoData.date}</p>
                </div>
                <img className="nasaImg" src={photoData.url} alt=""/>
                <div className="copyright">
                    <p>&copy; {photoData.copyright}</p>
                    
                </div>
            </div>
        </div>
    );
}
