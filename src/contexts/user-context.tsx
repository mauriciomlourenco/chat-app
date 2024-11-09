import { ReactNode, createContext, useState } from "react"

interface UserContextProps {
    name: string
    numberConnections: string
    handleLogin: (nameAux: string, numberConnectionsAux: string) => void
}

export const UserContext = createContext({} as UserContextProps)

export const UserProvider = ({ children } : { children: ReactNode}) => {
    const [name, setName] = useState('')
    const [numberConnections, setNumberConnections] = useState('')

    function handleLogin(nameAux: string, numberConnectionsAux: string) {
        setName(nameAux)
        setNumberConnections(numberConnectionsAux)
    }
    return (
        <UserContext.Provider value={{ name, numberConnections, handleLogin }}>
            {children}
        </UserContext.Provider>
    )
}