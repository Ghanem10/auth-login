import React, { createContext, useState } from 'react';

export const propsContext = createContext();

export default function Context({ children }) {
    const [name,setName] = useState("");

    return (
        <propsContext.Provider value={{
            name,
            setName
        }}>
            {children}
        </propsContext.Provider>
    )
}