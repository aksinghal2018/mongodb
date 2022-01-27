import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Form, Button, Container } from 'react-bootstrap'
function Registernew() {
    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [address, setaddress] = useState("")
    const [companyname, setcompanyname] = useState("")
    const [image, setimage] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")

    const handler = (e) => {
        var id = e.target.id
        //console.log(id)
        if (id === "fname") {
            setfname(e.target.value)
        }
        if (id === "lname") {
            setlname(e.target.value)
        }
        if (id === "username") {
            setusername(e.target.value)
        }
        if (id === "address") {
            setaddress(e.target.value)
        }
        if (id === "companyname") {
            setcompanyname(e.target.value)
        }
        if (id === "password") {
            setpassword(e.target.value)
        }
        if (id === "confirmpassword") {
            setconfirmpassword(e.target.value)
        }
        if(id === "email"){
            setemail(e.target.value)
        }
        
    }
    const submit = (e) => {
        e.preventDefault()
        //const data = { "name": name, "email": email, "password": password, "myfile": mypic }
        //console.log(data)
        let formData = new FormData();    //formdata object
        var imagedata = document.querySelector('input[type="file"]').files[0];
        formData.append("myfile", imagedata);
        formData.append('fname', fname);   //append the values with key, value pair
        formData.append('lname', lname);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('address', address);
        formData.append('companyname', companyname);
        formData.append('password', password);
        const config = {
            headers: {
                "Content-Type": "multipart/form-data; boundary=AaB03x" +
                    "--AaB03x" +
                    "Content-Disposition: file" +
                    "Content-Type: png" +
                    "Content-Transfer-Encoding: binary" +
                    "...data... " +
                    "--AaB03x--",
                "Accept": "application/json",
                "type": "formData",
                "Authentication":`Bearer ${localStorage.getItem('_token')}`
                
            }
        }
        axios.post('http://localhost:8899/adduserdata1', formData, config).then(
            data => {
                if (data.data.err === "") {
                    alert(data.data.message)
                    window.location.replace("/login")
                }
                else {
                    console.log(data)
                    alert(data.data.err)
                    //window.location.reload()
                }
            }
        )

    }

    return (
        <div style={{ padding: "20px", marginBottom: "20px",backgroundImage:"url('../Images/background1.jpg')",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center" }}>
            <Form style={{ padding: "50px", border: "2px solid black", width: "50%", marginLeft: "23%", marginBottom: "30px" ,backgroundImage:"url('../Images/backgroundregis.jpg')",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center"}} onSubmit={submit} encType="multipart/form-data">
                <h1><u>Register</u></h1>
                <Form.Group className="mb-3" controlId="fname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter First Name " onChange={handler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Last Name " onChange={handler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter username " onChange={handler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email " onChange={handler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter address " onChange={handler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="companyname">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter company name " onChange={handler} />
                </Form.Group>
                <Form.Group controlId="companylogo" className="mb-3">
                    <Form.Label>Company Logo: </Form.Label>
                    <input type="file" name="menupic" onChange={handler} style={{ marginLeft: "20px" }} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password " onChange={handler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmpassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter confirm password " onChange={handler} />
                </Form.Group>
                <div style={{ display: "flex" }}>
                    <Button variant="primary" type="submit" style={{ marginRight: "5px" }}>
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

export default Registernew
