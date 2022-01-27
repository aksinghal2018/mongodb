import React from 'react'
import { useEffect } from 'react'
import { encryptStorage } from '../config/Encrypt'
function Logout() {
    useEffect(() => {
       encryptStorage.removeItem("user")
       window.location.replace('/')
    }, [])
    return (
        <div>
            
        </div>
    )
}

export default Logout
