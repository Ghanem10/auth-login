import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Page() {
    let navigate = useNavigate();

    function logOut() {
        let path = "/login";
        navigate(path);
    }

    return (
        <>
            <h1>PAGE HERE </h1>
            <button onClick={logOut}>click</button>
        </>
    );
}