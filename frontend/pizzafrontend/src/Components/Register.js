import React from 'react'
import { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import axios from 'axios'
function Register() {
    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [cpassword, setcpassword] = useState("")
    const [mobile, setmobile] = useState("")
    const [age, setage] = useState("")
    const [address, setaddress] = useState("")
    const [companyname, setcompanyname] = useState("")
    
    const handler = (e) => {
        var id = e.target.id
        //console.log(id)
        if(id == "fname"){
            setfname(e.target.value)
        }
        if(id == "lname"){
            setlname(e.target.value)
        }
        if (id === "name") {
            setusername(e.target.value)
        }
        if (id === "email") {
            setemail(e.target.value)
        }
        if (id === "mobile") {
            setmobile(e.target.value)
        }
        if (id === "age") {
            setage(e.target.value)
        }
        if (id === "address") {
            setaddress(e.target.value)
        }
        if(id == "companyname"){
            setcompanyname(e.target.value)
        }
        if (id === "password") {
            setpassword(e.target.value)
        }
        else{
            setcpassword(e.target.value)
        }
    }
    const submit = (e) => {
        e.preventDefault()
        if(cpassword===password){
        const data = { "fname":fname,"lname":lname,"username": username, "email": email, "mobile": mobile, "age": age,"address":address,"companyname":companyname,"password":password }
        //console.log(data)
        axios.post('http://localhost:8899/adduser', data).then(
            data => { 
            if(data.data.err===""){
                alert(data.data.message)
                window.location.replace("/login")
            }
            else{
                alert(data.data.err)
                //window.location.reload()
            }
            }
        )
        }
        else{
            alert("password and confirm password should be same")
        }
    }
    return (
        <div className="changefont" style={{ padding: "20px", marginBottom: "20px"  ,backgroundImage:"url('../Images/background1.jpg')",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center"}}>
            <Form style={{ padding: "50px", border: "2px solid black", width: "50%", marginLeft: "23%", marginBottom: "30px" ,backgroundImage:"url('../Images/backgroundregis.jpg')",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center" }} onSubmit={submit} encType="multipart/form-data">
                <h1><u>Register</u></h1>
                <Form.Group className="mb-3" controlId="fname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter First Name"  onChange={handler} style={{backgroundColor:"lightyellow"}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="lname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Last Name"  onChange={handler} style={{backgroundColor:"lightyellow"}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username"  onChange={handler} style={{backgroundColor:"lightyellow"}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"  onChange={handler} style={{backgroundColor:"lightyellow"}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="Number" placeholder="Enter age"  onChange={handler} style={{backgroundColor:"lightyellow"}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="mobile">
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control type="Number" placeholder="Enter Mobile"  onChange={handler} style={{backgroundColor:"lightyellow"}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>address</Form.Label>
                    <Form.Control type="text" placeholder="Enter Address"  onChange={handler} style={{backgroundColor:"lightyellow"}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="companyname">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Company Name"  onChange={handler} style={{backgroundColor:"lightyellow"}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handler} style={{backgroundColor:"lightyellow"}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="cpassword">
                    <Form.Label> Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password"  onChange={handler} style={{backgroundColor:"lightyellow"}}/>
                </Form.Group>
                <div style={{display:"flex"}}>
                <Button variant="primary" type="submit" style={{marginRight:"5px"}}>
                    Submit
                </Button>
                <Button variant="primary" type="reset">
                    Reset
                </Button>
                </div>
            </Form>
        </div>
    )
}

export default Register
