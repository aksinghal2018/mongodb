import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Form,Button, Container} from 'react-bootstrap'
import { encryptStorage } from '../config/Encrypt'
import {Link} from 'react-router-dom'
function Login() {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const handler = (e) => {
        var id = e.target.id
        //console.log(id)
      
        if (id === "email") {
            setemail(e.target.value)
        }
        if (id === "password") {
            setpassword(e.target.value)
        }
    }
    const submit = (e) => {
        e.preventDefault()
        const data = {  "email": email, "password": password }
        //console.log(data)
        axios.post('http://localhost:8899/checkuser', data).then(
            data => { 
              if(data.data.err===""){
                console.log(data.data.data)
                encryptStorage.setItem('user',data.data.data)
                localStorage.setItem('_token',data.data.token)
                window.location.replace('/dashboard')
                //console.log(data.data)
              }
              else{
                alert(data.data.message)
              }
             }
        )
    }
    return (
        <div className="changefont" style={{paddingLeft:"20px",paddingTop:"25px",paddingBottom:"150px" ,backgroundImage:"url('../Images/background1.jpg')",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center"}}>
            <Form style={{padding:"50px",border:"2px solid black",width:"50%",marginLeft:"23%" ,marginTop:"20px" ,backgroundImage:"url('../Images/backgroundregis.jpg')",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center"}} onSubmit={submit}>
                <h1><u>Login</u></h1>
  <Form.Group className="mb-3" controlId="email">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" onChange={handler} name ="email" style={{backgroundColor:"lightyellow"}} />
    
  </Form.Group>

  <Form.Group className="mb-3" controlId="password">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onChange={handler} name=" password" style={{backgroundColor:"lightyellow"}}/>
  </Form.Group>
  
  <Button variant="primary" type="submit">
    Submit
  </Button>
  <Link to={`/forgetpassword`} style={{   textDecoration: "none",marginLeft:"20px",fontSize:"17px" }} className="changefont">Forget Password</Link>
</Form>
        </div>
    )
}

export default Login
