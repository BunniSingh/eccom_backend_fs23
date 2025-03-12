import React from 'react'
import { Outlet } from 'react-router-dom'

const PostloginLayout = () => {
  return (
    <>
        <div>
            <h2>Navbar Post-login</h2>
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

export default PostloginLayout