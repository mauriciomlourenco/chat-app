import { ButtonBase } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user-context";
import socketIO from 'socket.io-client';
import { MessageButton } from "../../components/message-button";


type MessageType = {
    callId: string,
    caller: string,
    media: string
    service: string
    startDate: string
}

export function ChatsScreen(){
    const user = localStorage.getItem('userChat');
    const userAux = user ? JSON.parse(user) : null;
    const router = useNavigate();
    const { handleLogout } = useContext(UserContext);
    const socket = socketIO("http://dev.digitro.com", {
              reconnectionDelayMax: 10000,
              path: "/callcontrol",
              // withCredentials: true,
            //   extraHeaders: {
            //     "Access-Control-Allow-Origin": "*",
            //     "Access-Control-Allow-Headers": "origin, x-requested-with, content-type",
            //     "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS"
            //   }
          });
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [messageSelected, setMessageSelected] = useState('');   
    

    useEffect(() => {

        if (!userAux) {
            router('/')
        } else {

            socket.emit("USER_CONNECT", {
                username: userAux.name,
                maxCalls: userAux.numberConnections   
            })    
        

        }


    }, [userAux, router, socket])

    socket.on("NEW_CALL", (data: MessageType) => {

        const idExists = messages.find((message: MessageType) => message.callId === data.callId)
        if (idExists) {
            const newMessages = messages.map((message: MessageType) => {
                if (message.callId === data.callId) {
                    
                    return data
                }
                return message
            });
            setMessages(newMessages)
        }
        else {
            setMessages(state =>[...state, data])
        }

        

        
        
    })

   

    function logout() {
        handleLogout()
        router('/')
    }

    function handleSelectMessage(messageCallId: string) {
        setMessageSelected(messageCallId)
        const response = socket.emit("NEW_CALL_ANSWERED", {
            callId: messageCallId,
        })

        console.log("response msg: ", response)
    }

    if (userAux) {
        return (            
                <div className="w-full h-screen flex flex-col">
                    <header className="flex items-center gap-4 p-4 bg-green-strong h-content">
                        <h1 className="text-white font-semibold text-lg">{userAux.name}</h1>
                        <ButtonBase
                         onClick={() => logout()}
                         sx={{
                             color: 'white',
                             backgroundColor: 'red',
                             borderRadius: '4px',
                             padding: '4px 8px',
                             fontSize: '18px',
                             fontWeight: 600,

                             '&:hover': {
                                 backgroundColor: 'rgba(255, 0, 0, 0.7)',
                                 filter: 'alpha(opacity=70)',
                                 transition: "all 0.2s ease-in-out",
                             }
                             
                         }}
                        >
                            Desconectar
                        </ButtonBase>
                    </header>
        
                    <div className="flex h-screen">
                        <aside className="w-[25%] p-4 border border-color-gray max-h-[calc(100vh-100px)] min-w-[300px] overflow-y-auto rounded-b-lg">
        
                            <div className="flex flex-col gap-4 overflow-y-auto h-content pb-8">
                                <h1 className="text-lg font-semibold">Atendimentos</h1>                       
        
                                {messages.map((message: MessageType) => (
                                    <MessageButton
                                        key={message.callId}
                                        callId={message.callId}
                                        caller={message.caller}
                                        service={message.service}
                                        startDate={message.startDate}
                                        handleSelectMessage={handleSelectMessage}
                                        messageSelected={messageSelected}
                                        
                                    />
                                ))}                   
        
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