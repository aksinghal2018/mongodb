import React from 'react'
import { encryptStorage } from '../config/Encrypt'
import { Container, Table,Row,Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
function Orderdetail() {
    const [detail, setdetail] = useState([])
    //console.log(detail)
    var totalbalance=0
    detail.map((item)=>{
            totalbalance=totalbalance+item.price*item.quantity
        
    })
    useEffect(() => {
        setdetail(encryptStorage.getItem('orderdetail').data)
    }, [])
    return (
        <div style={{backgroundImage:"url('../Images/background1.jpg')",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center",height:"560px",color:"white",padding:"20px"}}>
            <h1>Order Details </h1>
            <h1 className="text-danger">Status : {encryptStorage.getItem('orderdetail').status}</h1>
            <Table striped bordered hover style={{backgroundImage:"url('../Images/cartbackground.png')",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center"}} className="changefont">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quanitity</th>
                        <th>Total</th>
                        
                    </tr>
                </thead>
                <tbody>

                    {
                        detail.map((item, index) => {
                            return (<tr><td>{index + 1}</td><td>{item.name}</td><td>{item.price}</td><td>{item.quantity}</td><td>{item.price * item.quantity}</td></tr>)
                        })
                    }
                </tbody>
            </Table>
            <Row>
                <Col>
                    <p className="changefont" style={{color:"white"}}>Total: {totalbalance} RS</p></Col></Row>
        </div>
    )
}

export default Orderdetail
