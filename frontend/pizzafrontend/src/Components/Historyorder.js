import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { encryptStorage } from '../config/Encrypt'
import {Container, Table} from 'react-bootstrap'
function Historyorder() {
    const [historydata, sethistorydata] = useState([])
    const [iddata, setiddata] = useState("")
    //console.log(historydata)
    useEffect(() => {
        const id=encryptStorage.getItem('user')[0]._id
        setiddata(id)
        ///console.log(id)
        axios.post('http://localhost:8899/orderhistory',{id:id},{
            headers:{"Authentication":`Bearer ${localStorage.getItem('_token')}`}
        }).then(
            data=>{
                //console.log(data.data)
                sethistorydata(data.data)
            }
        )
    }, [])
    const convertdata=(value)=>{
        var value1=value.split(" ")
        //console.log(value1)
        value=value1[0]+" "+value1[1]+" "+value1[2]+" "+value1[3]+" "+value1[4]+" "+value1[5]
        return(value)
    }

    const detail=(value,statusdata)=>{
        var data=[]
        historydata.map((item,index)=>{
            console.log(item)
            if(item._id==value){
                data=item
            }
        })
        console.log(data.order)
        encryptStorage.setItem("orderdetail",{data:data.order,status:statusdata})
        window.location.replace('/orderdetail')
    }
    return (
        <div style={{backgroundImage:"url('../Images/background1.jpg')",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center",height:"560px",color:"white",padding:"20px"}}>
            <h1 className="changefont" style={{color:"white"}}>Order History</h1>
            <Table striped bordered hover style={{backgroundImage:"url('../Images/cartbackground.png')",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center"}} className="changefont">
  <thead>
    <tr>
      <th>#</th>
      <th>Order Date</th>
      <th>Detail</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {
        historydata.map((item,index)=>{
            return(
                <tr key={index}><td>{index+1}</td><td>{convertdata(item.orderdate)}</td><td><button type="button" onClick={()=>{detail(item._id,"Pending")}}>Detail</button></td><td className="text-danger">Pending</td></tr>
            )
        })
    }
  </tbody>
</Table>
        </div>
    )
}

export default Historyorder
