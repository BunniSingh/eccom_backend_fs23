import React from 'react'
import { Outlet } from 'react-router-dom'

const PreloginLayout = () => {
  return (
    <>
        <div>
            <h2>Navbar Pre-login</h2>
        </div>
        <div>
            <Outlet/>
        </div>
        <div>
            <h2>Footer</h2>
        </div>
    </>
  )
}

export default PreloginLayout