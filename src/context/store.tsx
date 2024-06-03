'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

export interface ContextProps {
    userIdContext: string,
    setUserIdContext: Dispatch<SetStateAction<string>>,
    emailContext: string,
    setEmailContext: Dispatch<SetStateAction<string>>, 
    usernameContext: string, 
    setUsernameContext: Dispatch<SetStateAction<string>>, 
    searchSpeciality: string, 
    setSearchSpeciality: Dispatch<SetStateAction<string>>,
    searchCity: string, 
    setSearchCity: Dispatch<SetStateAction<string>>
}

export const GlobalContext = createContext<ContextProps>({
    userIdContext: '',
    setUserIdContext: (): string => '',
    emailContext: '',
    setEmailContext: (): string => '' , 
    usernameContext: '', 
    setUsernameContext: (): string => '' ,
    searchSpeciality: '', 
    setSearchSpeciality: (): string => '',
    searchCity: '', 
    setSearchCity: (): string => ''    
})

export const GlobalContextProvider = ({ children }: any) => {
    const [userIdContext, setUserIdContext] = useState('');
    const [emailContext, setEmailContext] = useState('');
    const [usernameContext, setUsernameContext] = useState('');
    const [searchSpeciality, setSearchSpeciality] = useState('');
    const [searchCity, setSearchCity] = useState('');
    
    return (
        <GlobalContext.Provider value={{ userIdContext, setUserIdContext, emailContext, setEmailContext, usernameContext, setUsernameContext, searchSpeciality, setSearchSpeciality, searchCity, setSearchCity}}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);