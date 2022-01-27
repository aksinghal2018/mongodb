import React from 'react'
//import axios from 'axios'
import { updaterequest } from '../Services/Myservice'
import { useState ,useEffect} from 'react'
import { useHistory, useParams  } from 'react-router'
function Update() {
    const [id, setid] = useState(useParams().id)
    const [pname, setpname] = useState(useParams().pname)
    const [pdesc, setpdesc] = useState(useParams().pdesc)
    let history=useHistory()
    //console.log(useParams())
    useEffect(() => {
        //console.log(pname)
      //  console.log(id,pname,pdesc)
    }, [])
    const handler=(e)=>{
        if(e.target.name=="pname"){
            setpname(e.target.value)
        }
        else{
            setpdesc(e.target.value)
        }
    }
    const submit=(e)=>{
        e.preventDefault()
        if(pname!=""){
       const data1={"id":id,"pname":pname,"pdesc":pdesc}
       updaterequest(data1).then(
           data=>{
              // console.log(data)
               if(data.data.err!='0'){
                   alert("error occur")
               }
               else{
                   alert("data Updated successfully.")
                   history.push("/")
               }
           }
       )
        }
         else{
           alert("cannot be empty post feild.")
       }
    }
    
    return (
        <div className="container">
           
            <form onSubmit={submit}>
  <div className="form-group">
      <label htmlFor="post">Posts</label>
      <input type="text" name="pname" id="post" className="form-control" placeholder="posts" onChange={handler} value={pname}/>
      </div>
      <div className="form-group">
      <label htmlFor="postdesc">Posts Description</label>
      <textarea className="form-control" id="postdesc" rows="3" name="pdesc" onChange={handler} value={pdesc}></textarea>
      </div>
      <button type="submit" className="btn btn-primary" > Update</button>
      </form>
        </div>
    )
}

export default Update
