'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState, ReactNode } from "react";

export interface ContextProps {
    userIdContext: string;
    setUserIdContext: Dispatch<SetStateAction<string>>;
    emailContext: string;
    setEmailContext: Dispatch<SetStateAction<string>>;
    usernameContext: string;
    setUsernameContext: Dispatch<SetStateAction<string>>;
}

// Define una interfaz para las props del proveedor del contexto
interface GlobalContextProviderProps {
    children: ReactNode;
}

export const GlobalContext = createContext<ContextProps>({
    userIdContext: '',
    setUserIdContext: (): string => '',
    emailContext: '',
    setEmailContext: (): string => '',
    usernameContext: '',
    setUsernameContext: (): string => ''
});

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
    const [userIdContext, setUserIdContext] = useState('');
    const [emailContext, setEmailContext] = useState('');
    const [usernameContext, setUsernameContext] = useState('');

    return (
        <GlobalContext.Provider value={{ userIdContext, setUserIdContext, emailContext, setEmailContext, usernameContext, setUsernameContext }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
