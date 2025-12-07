"use client";

import { error } from "console";
import { ReactNode, createContext, useContext, useState } from "react";
import type { User,AppContextType } from "./types";


const AppContext=createContext<AppContextType | undefined>(undefined);

export const useAppContext =()=> {
    const context=useContext(AppContext);
    if(!context) throw new Error("useAppContext must be used inside RootLayout");
    return context;
}

export function RootLayout({children}: {children:ReactNode}){
    const [user, setUser]=useState<User | null>(null);
    return(
        <AppContext.Provider value={{user, setUser}}>
            <html>
                <body>
                    {children}
                </body>
            </html>
        </AppContext.Provider>
    );

}
