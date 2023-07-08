import React, { useCallback } from 'react';
import { logs } from '../Auth/auth';
import { URL_HOST } from '../env';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.scss';

export default function Register({ state, dispatch }) {
    let navigate = useNavigate();
    
    const name = state.name;
    const email = state.email;
    const password = state.password;

    const fetchBackEndData = useCallback(async () => {

        if (!name || !email || !password) {
            return;
        }

        try {
            await axios.post(`${URL_HOST}/auth/41v/register`, {
                name, email, password    
            });
            let path = "/login";
            navigate(path);

        } catch (e) {
            console.log(e.response);
        }
        
    }, [name, email, password]);

    function handleNameChange(e) {

        dispatch({
            type: logs.NAME,
            payload: {
                name: e.target.value
            },
        });
    }

    function handleEmailChange(e) {

        dispatch({
            type: logs.EMAIL,
            payload: {
                email: e.target.value
            },
        });
    }

    function handlePasswordChange(e) {

        dispatch({
            type: logs.PASSWORD,
            payload: {
                password: e.target.value
            },
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        dispatch({
            type: logs.NAME,
            payload: {
                name: ""
            },
        });

        dispatch({
            type: logs.EMAIL,
            payload: {
                email: ""
            },
        });

        dispatch({
            type: logs.PASSWORD,
            payload: {
                password: ""
            },
        });

        fetchBackEndData();
    }

    return (
        <form onSubmit={handleSubmit} className="container-register">
            <h2 className="title-register">Register</h2>
            <div className="name">
                <input 
                    name="name" 
                    type="text"
                    value={state.name}
                    onChange={e => handleNameChange(e)}
                    placeholder="Enter you name..." 
                    required
                />
            </div>
            <div className="email">
                <input 
                    name="email" 
                    type="text"
                    value={state.email}
                    onChange={e => handleEmailChange(e)}
                    placeholder="Enter you email..." 
                    required
                />
            </div>
            <div className="password">
                <input 
                    name="password" 
                    type="password"
                    value={state.password}
                    onChange={e => handlePasswordChange(e)}
                    placeholder="Enter you password..."
                    required
                />
            </div>
            <button className="btn-register" type="submit">Register</button>
        </form>
    );
}