import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Form, Button, Container } from 'react-bootstrap'
function AddMenu() {
    const [name, setname] = useState("")
    const [image, setimage] = useState("")
    const [price, setprice] = useState("")
    const [category, setcategory] = useState("")
    const [quantity, setquantity] = useState("")
    const [categorydata, setcategorydata] = useState([
        "Samsung TV",
        "Xiaomi Mi TV",
        "Sony TV",
        "LG TV",
        "Haier TV",
        "Vu TV",
        "Videocon TV"
        
    ])

    const handler = (e) => {
        var id = e.target.id
        //console.log(id)
        if (id === "name") {
            setname(e.target.value)
        }
        if (id === "price") {
            setprice(e.target.value)
        }
        if (id === "category") {
            setcategory(e.target.value)
        }
        if (id === "quantity") {
            setquantity(e.target.value)
        }
        else {
            setimage(e.target.value)
        }
    }
    const submit = (e) => {
        e.preventDefault()
        //const data = { "name": name, "email": email, "password": password, "myfile": mypic }
        //console.log(data)
        let formData = new FormData();    //formdata object
        var imagedata = document.querySelector('input[type="file"]').files[0];
        formData.append("myfile", imagedata);
        formData.append('name', name);   //append the values with key, value pair
        formData.append('price', price);
        formData.append('category', category);
        formData.append('quantity', quantity)

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
        axios.post('http://localhost:8899/addmenu', formData, config).then(
            data => {
                if (data.data.err === "") {
                    alert(data.data.message)
                    window.location.replace("/menu")
                }
                else {
                    alert(data.data.err)
                    //window.location.reload()
                }
            }
        )

    }

    return (
        <div style={{ padding: "20px", marginBottom: "20px",backgroundImage:"url('../Images/background1.jpg')",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center" }}>
            <Form style={{ padding: "50px", border: "2px solid black", width: "50%", marginLeft: "23%", marginBottom: "30px" ,backgroundImage:"url('../Images/backgroundregis.jpg')",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center"}} onSubmit={submit} encType="multipart/form-data">
                <h1><u>Add Item</u></h1>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter itemname " onChange={handler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="Number" placeholder="Enter Price" onChange={handler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category</Form.Label>
                <Form.Select aria-label="Default select example" onChange={handler} id="category">
                    <option>Category menu</option>
                    {
                        categorydata.map(item=>{
                            return(

                                <option value={item}>{item}</option>
                            )
                        })
                    }
                    
                </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="text" placeholder="Enter Quantity" onChange={handler} />
                </Form.Group>
                <Form.Group controlId="menupic" className="mb-3">
                    <Form.Label>Menu Pic: </Form.Label>
                    <input type="file" name="menupic" onChange={handler} style={{ marginLeft: "20px" }} />
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

export default AddMenu
