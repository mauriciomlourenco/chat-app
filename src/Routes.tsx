import {
    createBrowserRouter,
    RouterProvider,    
  } from "react-router-dom"
import { Login } from "./pages/login"
import { ChatsScreen } from "./pages/chats-screen"


export function RouterComponent() {
    // const user = localStorage.getItem('userChat')

    const router = createBrowserRouter([
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/chats",
          element: <ChatsScreen />,
        },
        {
            path: "/*",
            element: <ChatsScreen />,
          },
      ])

    return <RouterProvider router={router} />
    

}