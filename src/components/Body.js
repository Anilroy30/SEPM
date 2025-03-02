import React from 'react'
import Login from './Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Body = () => {

   const appRouter = createBrowserRouter([
    {
        path: "/login",
        element: <Login/>
    },
   ]) 

  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body