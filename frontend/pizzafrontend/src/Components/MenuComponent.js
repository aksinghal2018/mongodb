import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Card, Button,Col,Row } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import { encryptStorage } from '../config/Encrypt'
import {useDispatch} from 'react-redux'
function MenuComponent(props) {
    const [menu, setmenu] = useState([])
    const [time, settime] = useState(60)
    const [state, setstate] = useState("")
    const dispatch = useDispatch()
    //const { id } = useParams()
    if(time==0){
        window.location.reload()
    }
    useEffect(() => {
        if(encryptStorage.getItem('cart')==undefined){
            encryptStorage.setItem('cart',JSON.stringify([]))
        }
        
        axios.get(`http://localhost:8899/getmenu`,{
            headers:{"Authentication":`Bearer ${localStorage.getItem('_token')}`}
        }).then(
            data => {
                console.log(data)
                if(data.data.err==1){
                    alert(data.data.msg)
                    localStorage.removeItem('_token')
                    window.location.replace('/logout')
                }
                else{
                    setmenu(data.data.data)}
                }
                )
                setInterval(()=>{
                   // console.log(time)
                    settime((prevState)=>(
                        
                        prevState=prevState-1
                    )
                    )
                },1000)
    }, [])

    const Additem=(id,name,price)=>{
        var data=encryptStorage.getItem('cart')
        console.log("cart")
        console.log(encryptStorage.getItem('cart'))
        var index=-1
        data.map(item=>{
            if(item.id==id){
                index=index+1
            }
        })
        if(index==-1){
        data.push({id:id,name:name,price:price,quantity:1})
        encryptStorage.setItem('cart',data)
        dispatch({type:'Inc_count'})
        alert("item added")
        }
        else{
            alert("already added")
        }
    }
    return (
        <div>
            <div style={{backgroundImage:"url('../Images/background1.jpg')",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center"}}>
                <Row style={{paddingLeft:"30px",paddingBottom:"50px",paddingRight:"30px"}}>
                    
                {menu.map((item, index) => {
                    return (
                        <Col xs={3} key={index}>
                        <Card style={{ width: '18rem',margin:"20px" }} >
                            <Card.Img variant="top" src={`http://localhost:8899/${item.image}` } style={{height:"220px"}} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    Price:
                                    {item.price}$<br/>
                                    Category:
                                    {item.category}
                                </Card.Text>
                                <Button variant="primary" style={{marginRight:"20px"}} onClick={()=>{Additem(item._id,item.name,item.price)}} id={item._id}>Add item {item.likes}</Button>
                            </Card.Body>
                        </Card>
                        </Col>
                    )
                })}
                </Row>
            </div>
            <ul>
            </ul>
        </div>
    )
}

export default MenuComponent
