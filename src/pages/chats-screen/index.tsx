import { Chat } from "@mui/icons-material";
import { ButtonBase } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user-context";

export function ChatsScreen(){
    const user = localStorage.getItem('userChat')
    const router = useNavigate()
    const { handleLogout } = useContext(UserContext)

    useEffect(() => {

        if (!user) {
            router('/')
        }

    }, [user, router])

    function logout() {
        handleLogout()
        router('/')
    }

    if (user) {
        return (            
                <div className="w-full h-screen flex flex-col">
                    <header className="flex items-center gap-4 p-4 bg-green-strong h-content">
                        <h1> Jose</h1>
                        <ButtonBase
                         onClick={() => logout()}
                         sx={{
                             color: 'white',
                             backgroundColor: 'red',
                             borderRadius: '4px',
                             padding: '4px 8px'
                             
                         }}
                        >
                            Desconectar
                        </ButtonBase>
                    </header>
        
                    <div className="flex h-screen">
                        <aside className="w-[25%] p-4 border border-color-gray max-h-[calc(100vh-100px)] min-w-[300px] overflow-y-auto rounded-b-lg">
        
                            <div className="flex flex-col gap-4 overflow-y-auto">
                                <h1 >Atendimentos</h1>                       
        
                                <div className="flex rounded-lg bg-white border border-color-gray overflow-hidden">
                                    <div className="w-[1.5%] bg-red-500" />
                                    
                                    <div className="flex items-center my-4 ml-8 xs:flex-col w-full">
                                        <Chat sx={{ fontSize: 40, color: 'rgba(0, 108, 121, 0.85)' }} />
        
                                        <div className="flex flex-col ml-8">
                                            <h1>Lucas</h1>
                                            <p>Nova matrícula</p>
                                        </div>
        
                                        <span className="ml-auto mr-4">10:35</span>
                                    </div>
                                </div>                    
        
                            </div>
                        </aside>
        
                        <main className="flex-1 p-4">
                            <h1>Chat</h1>
                        </main>
                    </div>
        
                </div>
            )
        
    }

    return <></>
}