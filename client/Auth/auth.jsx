import React, { useReducer } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from '../logs/register';
import Login from '../logs/login';
import Page from '../view/page';
import Context from '../src/context';


export const logs = {
    NAME: "NAME",
    EMAIL: "EMAIL",
    PASSWORD: "PASSWORD",
};

function Reducer(state, action) {
    switch(action.type) {
        case logs.NAME:
            return { ...state, name: action.payload.name };
        case logs.EMAIL:
            return { ...state, email: action.payload.email };
        case logs.PASSWORD:
            return { ...state, password: action.payload.password };
        default:
            return state;
    };
}

export default function AuthenticationRequests() {
    const [state, dispatch] = useReducer(Reducer, { 
        name: "",
        email: "",
        password: "",
    });

    return (
        <React.Fragment>
            <Context>
                <BrowserRouter>
                    <Routes>
                        <Route path="/register" element={
                            <Register 
                                state={state} 
                                dispatch={dispatch} 
                            />
                        } />
                        <Route path="/" element={
                            <Login />
                        } />
                        <Route index path="/login" element={
                            <Login />
                        } />
                        <Route path="/page" element={<Page />} />
                    </Routes>
                </BrowserRouter>
            </Context>
        </React.Fragment>
    );
}