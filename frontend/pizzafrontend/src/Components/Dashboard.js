import React from 'react'
import { useState, useEffect } from 'react'
import { encryptStorage } from '../config/Encrypt'
import {Card,Button} from 'react-bootstrap'
import jwt_decode from 'jwt-decode'
import Addinvoice from './Addinvoice'
function Dashboard() {
    const [user, setuser] = useState("")
    const userdata=encryptStorage.getItem('user')[0]
    //console.log(userdata)
    async function fetchdata(){
        await setuser(encryptStorage.getItem('user'))
    }
    useEffect(() => {
        fetchdata()
        const data=jwt_decode(localStorage.getItem('_token'))
        //alert(user)
        setuser(data.UID)
        //console.log(encryptStorage.getItem('user'))
    }, [])
    return (
        
        <div style={{ backgroundImage:"url('../Images/dashboardbackground.jpg')",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center",minHeight:"700px",paddingLeft:"70px",paddingRight:"70px",paddingTop:"50px"}}>
        
            <Addinvoice />
        </div>
        )
}

export default Dashboard
