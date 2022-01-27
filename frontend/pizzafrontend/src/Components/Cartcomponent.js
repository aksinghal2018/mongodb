import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { encryptStorage } from '../config/Encrypt'
import { Container,Table,Row,Col } from 'react-bootstrap'
import '../index.css'
import { useDispatch } from 'react-redux'
function Cartcomponent() {
    const [cart, setcart] = useState([])
    const [state, setstate] = useState(0)
    const dispatch = useDispatch()
    var totalbalance=0
    var changedata=0
    cart.map((item)=>{
            totalbalance=totalbalance+item.price*item.quantity
        
    })
    useEffect(() => {
        setcart(encryptStorage.getItem('cart'))
        
    }, [state])
    
    const deleteitem=(value)=>{
        var data=encryptStorage.getItem('cart')
        data.splice(value,1)
        encryptStorage.setItem('cart',data)
        setstate(Math.random())
    }
    
    const Orderconfirm=(e)=>{
        const data=encryptStorage.getItem('cart')
        const user=encryptStorage.getItem('user')
        console.log(user[0])
        const datasend={id:user[0]._id,date:Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'}),order:data,user:user[0]}
        if(data==undefined || data.length == 0){
            alert("No item in cart")
        }
        else{
            axios.post('http://localhost:8899/ordersend',datasend,{
                headers:{"Authentication":`Bearer ${localStorage.getItem('_token')}`}
            }).then(
                (data)=>{
                    console.log(data)
                    if(data.data.err!=1){
                    if(data.data.err==""){
                        alert(data.data.msg)
                        encryptStorage.setItem("cart",JSON.stringify([]))
                        window.location.replace("/menu")
                    }
                    else{
                        alert(data.data.err)
                    }
                }
                else{
                    alert(data.data.msg)
                    localStorage.removeItem('_token')
                    window.location.replace('/logout')
                }
                }
            )
        }

    }
    const incquantity=(index)=>{
        var data=encryptStorage.getItem("cart")
        data[index].quantity=data[index].quantity+1
        encryptStorage.setItem("cart",data)
        setstate(Math.random())
        }
    const decquantity=(index)=>{
        var data=encryptStorage.getItem("cart")
        if(data[index].quantity>1){
        data[index].quantity=data[index].quantity-1
        encryptStorage.setItem("cart",data)}
        else{
            var data=encryptStorage.getItem('cart')
            data.splice(index,1)
            encryptStorage.setItem('cart',data)
            dispatch({type:'Dec_count'})
        }
        setstate(Math.random())

}
    return (
        <div style={{backgroundImage:"url('../Images/background1.jpg')",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center",minHeight:"560px",color:"white",paddingLeft:"40px",paddingRight:"40px"}}>
            <h1>Cart</h1>
            <Table striped bordered hover style={{backgroundImage:"url('../Images/cartbackground.png')",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center"}} className="changefont">
        <thead>
          <tr>
            <th >#</th>
            <th >Name</th>
            <th >Price</th>
            <th >Quanitity</th>
            <th >Total</th>
            <th >Action</th>
          </tr>
        </thead>
        <tbody>
          
            {
                cart.map((item,index)=>{
                    return(<tr ><td>{index+1}</td><td>{item.name}</td><td>{item.price}</td><td><center><button type="button" id={index} className="btn btn-primary" style={{marginRight:"20px"}} onClick={()=>{decquantity(index)}}>-</button>{item.quantity}<button type="button" id={index} className="btn btn-primary " style={{marginLeft:"20px"}} onClick={()=>{incquantity(index)}}>+</button></center></td><td>{item.price * item.quantity}</td><td><button type="button" className="btn btn-danger" id={item.id} onClick={()=>{deleteitem(index)}}>Delete</button></td></tr>)
                })
            }
            </tbody>
          </Table>
          <Row>
              <Col>
            <p className="changefont" style={{color:"white"}}>Total: {totalbalance} RS</p></Col><Col><button type="button" className="btn btn-primary changefont" onClick={Orderconfirm} style={{color:"white",marginBottom:"120px"}} >Order</button></Col></Row>
        </div>
    )
}

export default Cartcomponent
