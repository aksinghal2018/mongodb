import React from 'react'
import { useState, useEffect } from 'react'
import { encryptStorage } from '../config/Encrypt'
import jwt_decode from 'jwt-decode'
function Settingcomponent() {
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
    const update=()=>{
        window.location.replace("/updatecompany")
    }
    return (
        <div style={{ backgroundImage:"url('../Images/dashboardbackground.jpg')",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center",minHeight:"700px",paddingLeft:"70px",paddingRight:"70px",paddingTop:"50px"}}>
        <div style={{border:"2px solid black",width:"43%",marginLeft:"30%",padding:"30px"}}>
            <img src={`http://localhost:8899/${userdata.logo}`} alt='companylogo'  style={{width:"100%",height:"200px"}}/>
            <h1 className="changefont"><center>Welcome</center></h1>
            <h1 className="changefont">Username:<span style={{marginLeft:"20px"}}></span>{userdata.username}</h1>
            <h1 className="changefont">Email:<span style={{marginLeft:"20px"}}></span>{userdata.email}</h1>
            <h1 className="changefont">Address:<span style={{marginLeft:"20px"}}></span>{userdata.address}</h1>
            <h1 className="changefont">Company Name:<span style={{marginLeft:"20px"}}></span>{userdata.CompanyName}</h1>
            <buttton type="button" className="btn btn-warning" onClick={update} >Update</buttton>
        </div>
        </div>
    )
}

export default Settingcomponent
