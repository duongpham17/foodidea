import React, { useEffect, useState, createContext } from 'react';
import {IUsersResponse} from '@database/models/users';
import api from '@database/api';

interface Props {
    children: React.ReactNode,
};

export interface PropsContextTypes {
    user: IUsersResponse | null,
    protect: (userAllowed: string[]) => void
};

// for consuming in children components, initial return state
export const Context = createContext<PropsContextTypes>({
    user: null,
    protect: (userAllowed) => null
});

export const useAuthentication = ({children}: Props) => {

    const [user, setUser] = useState<IUsersResponse | null>(null);

    useEffect(() => {
        const storage = typeof window === "undefined" ? "" :  localStorage.getItem("user");
        const user = storage ? JSON.parse(storage) : null;
        if(!user) return;
        (async () => {
            try{
                const response = await api.get("/authentication/persist");
                if(!response) return;
                setUser(response.data.data);
            } catch(err: any){
                console.log(err.response)
            }
        })();
        
    }, []);

    const protect = (userAllowed: string[]) => {
        if(user){
            if(userAllowed.includes(user.role)){
                return;
            } else {
                window.location.replace("/404")
            }
        }
    };

    const value = {
        user,
        protect
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default useAuthentication