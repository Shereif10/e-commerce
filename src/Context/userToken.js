import { createContext, useState } from "react";


export let userToken = createContext(null)

export default function UserTokenProvider({children}){

    let [isLogin,setIsLogin] = useState(null)

    return <userToken.Provider value={{isLogin,setIsLogin}}>
        {children}
    </userToken.Provider>
}