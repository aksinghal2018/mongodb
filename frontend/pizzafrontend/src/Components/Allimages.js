import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
function Allimages() {
    const [data1, setdata1] = useState([])
    
    async function fetchdata(){

        await axios.get("http://localhost:8899/getimages").then(
            data=>{
            setdata1(data.data.data)}
        )
    }
    useEffect(() => {
        fetchdata()
    }, [])
    return (
        <div>
            <ul>
                {
                    data1.map((item)=>{
                        return(<li><a href={`http://localhost:8899/${item}`} >{item}</a></li>)
                    })
                }
            </ul>
            
        </div>
    )
}

export default Allimages
