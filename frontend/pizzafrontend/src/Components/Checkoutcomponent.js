import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Form,Button, Container, Row,Col} from 'react-bootstrap'
import { encryptStorage } from '../config/Encrypt'

function Checkoutcomponent() {
    const [cardnumber, setcardnumber] = useState("")
    const [expdate, setexpdate] = useState("")
    const [cvv, setcvv] = useState("")
    const handler = (e) => {
        var id = e.target.id
        //console.log(id)
      
        if (id === "cardnumber") {
            setcardnumber(e.target.value)
        }
        if (id === "expdate") {
            setexpdate(e.target.value)
        }
        else{
            setcvv(e.target.value)
        }
    }
    const submit = (e) => {
        e.preventDefault()
        const data = {  "cardnumber": cardnumber, "expdate": expdate,"cvv":cvv }
        console.log(data)
        if(cardnumber.toString().length<16){
            alert("cardnumber length should be 16 ")
        }
        if(cvv.toString().length!=3){
            alert("cvv length should be 3 ")
        }
        if(cardnumber=="" || expdate=="" || cvv=="" ){
            alert("feild not be empty.")
        }
        else{
            alert("payment successfull")
        }
    }
    return (
        <div className="changefont" style={{ paddingLeft: "20px", paddingTop: "25px", paddingBottom: "150px", backgroundImage: "url('../Images/background1.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
            <Form style={{ padding: "50px", border: "2px solid black", width: "50%", marginLeft: "23%", marginTop: "20px", backgroundImage: "url('../Images/cardbackground.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" ,borderRadius:"20px"}} onSubmit={submit}>
                <Row>
                    <Col>
                <h1><u>Payment</u></h1></Col><Col><h4>Bill : 500$</h4></Col></Row>
                <Form.Group className="mb-3" controlId="cardnumber">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter card number ." onChange={handler} name="cardnumber" style={{ backgroundColor: "lightyellow" }} />

                </Form.Group>
                <Row>
                    <Col>
                <Form.Group className="mb-3" controlId="expdate">
                    <Form.Label>Exp Date</Form.Label>
                    <Form.Control type="date" placeholder="expire date" onChange={handler} name=" expdate" style={{ backgroundColor: "lightyellow" }} />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group className="mb-3" controlId="cvv">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control type="text" placeholder=" Enter cvv number" onChange={handler} name=" cvv" style={{ backgroundColor: "lightyellow" }} />
                </Form.Group>
                </Col>
                </Row>
                <Button variant="primary" type="submit">
                    Pay
                </Button>
            </Form>
        </div>
    )
}

export default Checkoutcomponent
