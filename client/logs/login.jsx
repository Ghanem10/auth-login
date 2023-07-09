import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { propsContext } from '../src/context';
import { URL_HOST } from '../env';
import axios from 'axios';
import './style.scss';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setName } = useContext(propsContext);

    let navigate = useNavigate();

    const fetchBackEndData = useCallback(async () => {

        if (!email || !password) {
            return;
        }
        
        try {
            const { 
                data: { 
                    t: token, 
                    user: name 
            }} = await axios.post(`${URL_HOST}/auth/41v/login`, { email, password });

            await axios.post(`${URL_HOST}/page/41v/router`, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            }).then(res => setName(res.data.name.name));

            let path = "/page";
            navigate(path);
        } catch (e) {
            console.log(e.reponse.data.mes);
        }

    }, [email, password]);

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        setEmail("");
        setPassword("");
        
        fetchBackEndData();
    }

    function githubLoginProviders() {
        window.location.href = `${URL_HOST}/auth/github`;
    }

    function googleLoginProviders() {
        window.location.href = `${URL_HOST}/auth/google`;
    }
    
    return (
        <div className="container-login">
            <form onSubmit={handleSubmit}>
                <h2 className="title-login">Login</h2>
                <div className="email">
                    <span>Email</span>
                    <input 
                        name="email" 
                        type="text" 
                        value={email}
                        onChange={e => handleEmailChange(e)} 
                        placeholder="Enter you name..." 
                    />
                </div>
                <div className="password">
                    <span>Password</span>
                    <input 
                        name="password" 
                        type="password" 
                        value={password}
                        onChange={e => handlePasswordChange(e)} 
                        placeholder="Enter you password..." 
                    />
                </div>
                <button type="submit" className="btn-login">Login</button>
                <div className="link-register">
                    <span>Not a member? </span> <Link to={'/register'}>register</Link>
                </div>
                <div className="social-provider">
                    <button 
                        className="github"
                        onClick={() => githubLoginProviders()}
                    >
                        GitHub <FontAwesomeIcon id="git" icon={faGithub} />
                    </button>
                    <button 
                        className="google"
                        onClick={() => googleLoginProviders()}
                    >
                        Google <FontAwesomeIcon id="google" icon={faGoogle} />
                    </button>
                </div>
            </form>
        </div>
    );
}