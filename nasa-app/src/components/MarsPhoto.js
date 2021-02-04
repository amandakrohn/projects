import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Home.css'


export default function Home(){
    const APP_KEY = 'yhyWZureXbsUFjlbxYgYDjzjFGXf5KcAznb4CyRc';

    const [photoData, setPhotoData] = useState('');

    function generateRandomNumber() {
        var arr = [];
        while(arr.length < 8) {
            var r = Math.floor(Math.random() * 300) + 1;
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        console.log(arr);
        return arr;
    }


    useEffect(() => {
        fetchPhoto();

        async function fetchPhoto(){
            const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${APP_KEY}`);
            const data = await res.json();

            const randIndex = generateRandomNumber();
            var photoArray = [];
            for (let index = 0; index < randIndex.length; ++index) {
                let newIndex = randIndex[index];
                photoArray.push(data.photos[newIndex]);
            }
            setPhotoData(photoArray);
        }
    }, []);


    return (
        <div className="wrapper">
            <ul className="nav-ul">
                <div className="link">
                    <li><Link className='text-link' to="/">PHOTO OF THE DAY</Link></li>
                    <li><Link className={['text-link', 'active'].join(" ")} to="marsphoto">PHOTOS OF MARS</Link></li>
                </div>
            </ul>
            <div className="content__mp">
                {
                    Object.values(photoData).map(x => (
                        <div className="mars_card">
                            <img className="mars_photo" src={x.img_src} alt=""/>
                            <div className="overlay">
                                <p className="mars_date">{x.earth_date}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
