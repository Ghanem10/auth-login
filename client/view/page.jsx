import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { propsContext } from '../src/context';
import './light.scss';

export default function Page() {
    const element = useRef(null);
    const { name } = useContext(propsContext);

    let navigate = useNavigate();

    function logOut() {
        let path = "/login";
        navigate(path);
    }

    function turnOff() {
        element.current.classList.remove("light");
        element.current.classList.remove("light-on");
        element.current.classList.add("light-off");
    }

    function turnOn() {
        element.current.classList.remove("light");
        element.current.classList.remove("light-off");
        element.current.classList.add("light-on");
    }

    return (
        <>
            <h1>Hi {name}, turn on the light!</h1>
            <svg ref={element} className="light" height="350px" width="350px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                viewBox="0 0 489.981 489.981" xmlSpace="preserve">
            <g>
                <g>
                    <g>
                        <path d="M189.363,481.081h24.5c3.9,5.1,16.3,8.9,31.1,8.9s27.2-3.9,31.1-8.9h24.5v-86.3h-111.2V481.081z"/>
                        <path d="M234.463,0.381c-65.7,5.1-119,56.8-125.6,122.5c-3.9,37.3,7.8,71.9,28.4,98.8c32.7,41.6,51.7,92.2,51.7,145.1v2.3h45.9
                            v-176.6l-3.1,3.1c-4.3,3.6-10.1,3.9-14,0l-20-20c-3.9-3.9-4.1-10.6-0.1-14.4c3.9-3.7,10-3.7,13.8,0.2l13.2,13.2l13.3-13.3
                            c3.8-3.8,10-3.8,13.8,0l13.3,13.3l13-13c3.9-3.9,10.6-4.1,14.4-0.1c3.7,3.9,3.7,10-0.2,13.8l-20.2,20.2c-3.9,3.9-10.1,3.9-14,0
                            l-3.1-3.1v176.6h46v-2.3c0-52.9,19.1-103.4,51.7-144.7c18.3-23.3,29.2-52.5,29.2-84.8
                            C381.863,57.881,314.963-5.519,234.463,0.381z"/>
                    </g>
                </g>
            </g>
            </svg>
            <div className="btn">
                <button className="btn-off" onClick={turnOff}>Turn Off</button>
                <button className="btn-on" onClick={turnOn}>Turn On</button>
            </div>
            <button className="log-out" onClick={logOut}>Log out</button>
        </>
    );
}