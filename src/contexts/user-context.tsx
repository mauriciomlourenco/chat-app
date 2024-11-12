import { ReactNode, createContext, useEffect, useState } from "react"
interface UserContextProps {
    name: string
    numberConnections: string
    handleLogin: (nameAux: string, numberConnectionsAux: string) => void
    handleLogout: () => void
}

export const UserContext = createContext({} as UserContextProps)

export const UserProvider = ({ children } : { children: ReactNode}) => {
    const [name, setName] = useState('')
    const [numberConnections, setNumberConnections] = useState('')

    useEffect(() => {
        const user = localStorage.getItem('userChat')
        if (user) {
            const userAux = JSON.parse(user)
            setName(userAux.name)
            setNumberConnections(userAux.numberConnections)
        }
    }, [])

    function handleLogin(nameAux: string, numberConnectionsAux: string) {
        setName(nameAux)
        setNumberConnections(numberConnectionsAux)
        localStorage.setItem('userChat', JSON.stringify({ name: nameAux, numberConnections: numberConnectionsAux }))        
    }

    function handleLogout() {
        setName('')
        setNumberConnections('')
        localStorage.removeItem('userChat')
    }

    return (
        <UserContext.Provider value={{ name, numberConnections, handleLogin, handleLogout }}>
            {children}
        </UserContext.Provider>
    )
}