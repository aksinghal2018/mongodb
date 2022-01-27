import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Form,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {Alert} from 'react-bootstrap'

function Forgetpassword() {
    const [email, setemail] = useState("")
    const [alert, setalert] = useState(<></>)
    const handler=(e)=>{
        setemail(e.target.value)
    }
    const submit=(e)=>{
        e.preventDefault()
        console.log(email)
        const data={email:email}
        axios.post('http://localhost:8899/forgetpassword',data).then(
            data=>{
                if(data.data.err=="1"){
                    setalert(<Alert variant="danger">
                        {data.data.msg}
                      </Alert>)
                }
                else{
                    setalert(<Alert variant="info">
                        Forget Password link send to Email!
                      </Alert>)
                      setTimeout(()=>{
                          window.location.replace('/login')
                      },5000)
                }
            }
        )
    }
    return (
        <div style={{ paddingLeft: "20px", paddingTop: "25px", paddingBottom: "150px", backgroundImage: "url('../Images/background1.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center",height:"560px" }}>
            <Form style={{ padding: "50px", border: "2px solid black", width: "50%", marginLeft: "23%", marginTop: "20px", backgroundImage: "url('../Images/backgroundregis.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }} onSubmit={submit}>
                <h1><u>Forget Password</u></h1>
                {alert}
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handler} name="email" style={{ backgroundColor: "lightyellow" }} />

                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Forgetpassword
