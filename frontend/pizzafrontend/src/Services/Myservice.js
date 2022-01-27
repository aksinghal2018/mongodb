import axios from 'axios'
import { MainUrl } from '../config/Url'

export const getrequest=()=>{
    return(axios.get(`${MainUrl}post/getpost`))
}
export  const  postrequest=(data)=>{
    return(
    axios.post(`${MainUrl}post/addpost`,data))
}
export  const  updaterequest=(data)=>{
   // console.log(data)
    const config = { headers: {'Content-Type': 'application/json'} };
    return(
    axios.put(`${MainUrl}post/updatepost`,data,config))
}
export  const  deletetrequest=(data)=>{
    return(
    axios.delete(`${MainUrl}post/deletepost/${data}`))
}