import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { encryptStorage } from '../config/Encrypt'
import { Table, Form } from 'react-bootstrap'
import "../new.css"
function InvoiceComponent() {
    const [invoice, setinvoice] = useState([])
    const [cdata, setcdata] = useState("Partially Paid")
    const [conditionalcomponent, setconditionalcomponent] = useState(0)
    const [sendemailcomponents, setsendemailcomponents] = useState(<></>)

    useEffect(() => {
        axios.post("http://localhost:8899/getinvoicedata", { email: encryptStorage.getItem('user')[0].email }).then(
            data => {
                if (data.data.err == "1") {
                    alert(data.data.msg)
                }
                else {
                    setinvoice(data.data.data)
                    console.log(data)
                }

            }
        )
    }, [])

    const handler = (e) => {
        if (e.target.name !== "cdata") {
            setcdata(e.target.value)
            //alert(e.currentTarget.dataset.id)
            var itemdata = document.getElementById(`new${e.currentTarget.dataset.id}`)
            var itemdata1 = document.getElementById(`new1${e.currentTarget.dataset.id}`)
            if (e.target.value == "Partially Paid") {
                itemdata.style.display = "block"
                itemdata1.style.display = "block"
            }
            else if (e.target.value == "Select") {
                itemdata.style.display = "none"
                itemdata1.style.display = "none"
            }
            else {
                itemdata.style.display = "none"
                itemdata1.style.display = "block"
            }
        }
        else {
            setconditionalcomponent(e.target.value)
        }
    }
    const conditonalrender = (data, data1) => {
        if (data == "Paid") {
            return (<h6>Fully Paid</h6>)
        }
        else {
            return (
                <Form.Select aria-label="Default select example" onChange={handler} data-id={data1} >
                    <option id={data1}>Select</option>
                    <option value="Partially Paid" id={data1}>Partially Paid</option>
                    <option value="Full Paid" id={data1}>Full Paid</option>
                </Form.Select>
            )
        }
    }
    const submit = (id) => {
        alert(cdata)
        if (cdata == "Partially Paid") {
            const data = { id: id, status: "Partially Paid", amount: conditionalcomponent }
            axios.post("http://localhost:8899/updatepdf", data).then(
                data => console.log(data)
            )
        }
        if (cdata == "Full Paid") {
            const data = { id: id, status: "fullyPaid" }
            axios.post("http://localhost:8899/updatepdf", data).then(
                data => console.log(data)
            )
        }
        window.location.reload("")
    }
    const sendEmail = (index, email, filename) => {
        const data = { email: email, filename: filename }
        const item = document.getElementById(`new2${index}`)
        const item1 = document.getElementById(`new4${index}`)
        axios.post("http://localhost:8899/sendemail", data).then(
            data => {
                if (data.data.err == "1") {
                    alert(data.data.Msg)
                    item.style.display = "none"
                    item1.style.display = "block"
                }
            }
        )
    }
    return (
        <div style={{ padding: "4%" }}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Invoice Number</th>
                        <th>Receiver Name</th>
                        <th>Date</th>
                        <th>Invoice link</th>
                        <th>Status</th>
                        <th>Pending Amount</th>
                        <th>Actions</th>
                        <th>Send Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        invoice.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.data.receivername}</td>
                                    <td>{item.data.invoiceno}</td>
                                    <td>{item.orderdate.split(" ")[0] + " " + item.orderdate.split(" ")[1] + " " + item.orderdate.split(" ")[2] + " " + item.orderdate.split(" ")[3]}</td>
                                    <td><a href={`http://localhost:8899/Orderspdf/${item.invoicename}`} target="_blank" style={{ textDecoration: "none" }}>Invoice Link</a></td>
                                    <td style={{ color: "red" }}>{item.data.Status}</td>
                                    <td>{Math.round(item.data.balance * 100) / 100}</td>
                                    <td>
                                        {
                                            conditonalrender(item.data.Status, index)

                                        }
                                        <center>
                                            <input type="number" name="cdata" onChange={handler} style={{ display: "none" }} id={`new${index}`} />
                                            <button type="button" onClick={() => submit(item._id)} className='btn btn-warning' style={{ display: "none" }} id={`new1${index}`} >Submit</button>
                                        </center>
                                    </td>
                                    <td id={`new3${index}`}>
                                        <button type='button' className='btn btn-primary' onClick={() => sendEmail(index, item.data.email, item.invoicename)} id={`new2${index}`}>Send Email</button>
                                        <div id={`new4${index}`} style={{ display: "none" }}>
                                            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                                <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                                <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                            </svg>
                                        </div>
                                    </td>


                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default InvoiceComponent
