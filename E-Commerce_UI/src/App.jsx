import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import PreloginLayout from './container/preloginLayout/PreloginLayout'
import Login from './container/Login/Login'
import Register from './container/Register/Register'


const router = createBrowserRouter([
  {
    path: "/",
    element: <PreloginLayout/>,
    children: [
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
    ]
  }
])
function App() {

  return (
    <>
      <h1>Welcome E-Commerce</h1>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
