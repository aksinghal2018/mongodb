import axios from "axios";
import React, { useState, useEffect,useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Row,
  Col,
  Modal,
  Form,
  Container,
  InputGroup,
  FormControl,
  FormGroup,
  Table,
} from "react-bootstrap";
import { encryptStorage } from '../config/Encrypt'
// import SocialButton from "./SocialButton";
// import bcrypt from "bcryptjs";

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = /^[a-zA-Z ]{2,100}$/;
const regForUsername = RegExp(
  /^(?=.{4,20}$)(?:[a-zA-Z\d]+(?:(?:\.|-|_)[a-zA-Z\d])*)+$/
);
const regForPassword = RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

function Addinvoice() {
  //   const dispatch = useDispatch();
  const inpprice = useRef();
  const inpquantity = useRef();
  const inptotal = useRef();
  const inpdiscount = useRef();
  const inpinvoicedate = useRef();
  const inpduedate = useRef();
  const [totalo, setTotalo] = useState();
  const [totalvalue, settotalvalue] = useState(0)
  const [invoicenumber, setinvoicenumber] = useState(Math.floor(Math.random()*100000))
  var datavalue=Math.random(1000)
  async function loaddata(){
    await axios.post("http://localhost:8899/getinvoicedata",{id:encryptStorage.getItem('user')[0]._id}).then(
        data=>{
            if(data.data.err=="1"){
                alert(data.data.msg)
                return(1)
            }
            else{
                console.log(data.data.data.length)
                datavalue=data.data.data.length
                return(data.data.data.length+1)
            }

        }
    )
}

useEffect(() => {
  setinvoicenumber(loaddata())
}, [])
  
  const userdata=encryptStorage.getItem('user')
  console.log(userdata)
  const [prod, setProd] = useState({
    item: "",
    quantity: "",
    price: "",
    discount: "",
    total: "",
  });
  const [allprod, setAllprod] = useState([]);
  const [errors, setErrors] = useState({
    item: "",
    quantity: "",
    price: "",
    discount: "",
    total: "",
  });
  
  const [invoice, setInvoice] = useState({
    invoiceno: "",
    receivername: "",
    address: "",
    invoicedate: "",
    duedate: "",
    totalo:""
  });

  const [mainerrors, setMainerrors] = useState({
    invoiceno: "",
    receivername: "",
    address: "",
    invoicedate: "",
    duedate: "",
    totalo:""
  });
  const [uid, setUid] = useState()

  const [cdate, setCdate] = useState();
  useEffect(() => {
    getCurrentDate();
    console.log(cdate);
   
  }, []);

  const handler = (event) => {
    const { name, value } = event.target;
    // ((price - (price * dist / 100)) * qty).

    let total = ((inpprice.current.value - (inpprice.current.value * inpdiscount.current.value / 100)) * inpquantity.current.value)
    
    setProd((prevState) => ({
      ...prevState,
      total: total,
    }));
    let totalo=allprod.map(item => Number(item.total)).reduce((prev, curr) => prev + curr, 0);
    setTotalo(totalo)

    // let errors=state.errors;
    switch (name) {
      case "item":
        let eitem = value.length > 1 ? "" : "Enter Valid Product Name";
        setErrors({ ...errors, item: eitem });

        break;

      case "quantity":
        let equantity = value > 0 ? "" : "Enter Valid quantity";
        setErrors({ ...errors, quantity: equantity });
        break;
      case "price":
        let eprice = value > 1 ? "" : "Enter Valid Price";
        setErrors({ ...errors, price: eprice });
        break;
      case "discount":
        let ediscount =
          value > 1 && value < 100 ? "" : "Enter Valid Discount Amount";
        setErrors({ ...errors, discount: ediscount });
        break;

      default:
    }
    setProd((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // setState({[name]:value},...state);

    // setErrors(errors)
  };
  
  const formSubmit = async (event) => {
    event.preventDefault();
    let totalo=allprod.map(item => Number(item.total)).reduce((prev, curr) => prev + curr, 0);
    const prevtotal=totalvalue
    settotalvalue(prevtotal+prod.total)
    setTotalo(totalo)
    // setUser({ ...user, cource: selectedc });
    console.log(inpduedate.current.value);
    if (
      validate(errors) &&
      document.getElementById("item").value !== "" &&
      document.getElementById("quantity").value !== "" &&
      document.getElementById("price").value !== "" &&
      document.getElementById("discount").value !== "" &&
      document.getElementById("total").value !== ""
    ) {
     
      setAllprod(allprod => [...allprod, prod]);
      document.getElementById("myFormProd").reset();
  
    } else {
      alert("Please Enter Valid Data");
    }
  };
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };
  const mainhandler = (event) => {
    const { name, value } = event.target;
    // ((price - (price * dist / 100)) * qty).

    
    // let errors=state.errors;
    switch (name) {
      case "invoiceno":
        let einvoiceno = value.length > 0 ? "" : "Enter Valid Invoice No";
        setMainerrors({ ...mainerrors, invoiceno: einvoiceno });

        break;

      case "receivername":
        let ereceivername = value.length > 2 ? "" : "Enter Valid Name";
        setMainerrors({ ...mainerrors, receivername: ereceivername });
        break;
      case "address":
        let eaddress = value.length > 4 ? "" : "Enter Valid Address";
        setMainerrors({ ...mainerrors, address: eaddress });
        break;
         case "invoicedate":
        let einvoicedate =
          value > 1  ? "" : "Select a Date";
        setMainerrors({ ...mainerrors, invoicedate: einvoicedate });
        break;
      case "duedate":
        let eduedate =   value > 1  ? "" : "Select a Date";
        setMainerrors({ ...mainerrors, duedate: eduedate });
        break;
        case "totalo":
          let etotalo =
            value > 1  ? "" : "Total is not valid";
          setMainerrors({ ...mainerrors, totalo: etotalo });
          break;
  
      default:
    }
    setInvoice((prevState) => ({
      ...prevState,
      [name]: value,
      invoicedate:inpinvoicedate.current.value,
      duedate:inpduedate.current.value,
    }));

    // setState({[name]:value},...state);

    // setErrors(errors)
  };

  const mainformSubmit = async (event) => {
    event.preventDefault();
    console.log( mainvalidate(mainerrors))
    // setUser({ ...user, cource: selectedc });
    if (
      document.getElementById("invoiceno").value !== "" &&
      document.getElementById("receivername").value !== "" &&
      document.getElementById("address").value !== "" &&
      document.getElementById("totalo").value !== ""&&
      allprod!==undefined
    ) {
      console.log(userdata)
      var data1=0;
      allprod.map((item)=>{
        data1=data1+item.total
      })
      var value=document.getElementById("totalo").value
      var paystatus="Unpaid"
      console.log(value==0)
      if(value==0){
        paystatus="Unpaid"
      }
      else if(value==data1){
        paystatus="paid"
      }
      else{
        paystatus="partially paid"
      }
      
      const data={"userid":userdata[0]._id,"email":userdata[0].email,"cdate":cdate,"ddate":inpduedate.current.value,"invoiceno":document.getElementById("invoiceno").value,"receivername":document.getElementById("receivername").value,"address":document.getElementById("address").value,"totalo":data1,"Status":paystatus,"valuepay":document.getElementById("totalo").value
    ,data:allprod,"balance":data1-value
  }
  if(data1<value || value<0){
    alert("incorect pay value")
  }
  else{
    console.log(data)
      axios.post('http://localhost:8899/getinvoice',data).then(data=>{
        console.log(data)
        if(data.data.err=="1"){
          alert(data.data.msg)
          //window.location.reload("/dashboard")
        }
      })
    }
  }
  
    else {
      alert("Please Enter Valid Data");
    }
  
  };
  const mainvalidate = (mainerrors) => {
    let valid = true;
    Object.values(mainerrors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };
  function getCurrentDate(separator = "-") {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    const cdate = `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date}`;
    setCdate(cdate);
  }
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form id="myForm justify-content-start">
              <Col xs lg="6">
                <h1> Create Invoice</h1>
              </Col>
              <br/>
              <Form.Group>
                <Row className="text-start">
                  <Col xs lg="8">
                    <Form.Label>Invoice number</Form.Label>
                    <InputGroup className="mb-2">
                      <FormControl
                        type="Number"
                        placeholder="Invoice number"
                        name="invoiceno"
                        id="invoiceno"
                        onChange={mainhandler}
                        defaultValue={invoicenumber}
                      />
                    </InputGroup>
                    {mainerrors.invoiceno && (
                      <Form.Text style={{ color: "red" }}>
                        {mainerrors.invoiceno}
                      </Form.Text>
                    )}
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <Row className="text-start">
                  <Col xs lg="8">
                    <Form.Label>Receiver Name</Form.Label>
                    <InputGroup className="mb-2">
                      <FormControl
                        type="text"
                        placeholder="Receiver Name"
                        name="receivername"
                        id="receivername"
                        onChange={mainhandler}
                      />
                    </InputGroup>
                    {mainerrors.receivername && (
                      <Form.Text style={{ color: "red" }}>
                        {mainerrors.receivername}
                      </Form.Text>
                    )}
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="text-start">
                <Row>
                  <Col xs lg="8">
                    <Form.Label>Receiver Address</Form.Label>
                    <Form.Control as="textarea"
                      className="mb-2"
                      type="text"
                      placeholder="Receiver Address"
                      name="address"
                      id="address"
                      rows={2}
                      onChange={mainhandler}
                    />
                    {mainerrors.address && (
                      <Form.Text style={{ color: "red" }}>
                        {mainerrors.address}
                      </Form.Text>
                    )}
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="text-start">
                <Row>
                  <Col xs lg="4">
                    <Form.Label>Invoice Date</Form.Label>
                    <Form.Control
                      className="mb-2"
                      type="date"
                      name="invoicedate"
                      id="invoicedate"
                      ref={inpinvoicedate}
                      onChange={mainhandler}
                      error={errors.date_of_birth}
                      defaultValue={cdate}
                    />
                  </Col>
                  <Col xs lg="4">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control type="date" name="duedate" id="duedate" ref={inpduedate} />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="text-start">
                <Row>
                  <Col xs lg="8">
                    <Form.Label>Pay by Customer</Form.Label>
                    <Form.Control
                      className="mb-2"
                      type="number"
                      placeholder="Total Amount"
                      name="totalo"
                      id="totalo"
                      defaultValue={allprod.map(item => Number(item.total)).reduce((prev, curr) => prev + curr, 0)}
                      onChange={mainhandler}

                    />
                    {errors.address && (
                      <Form.Text style={{ color: "red" }}>
                        {errors.address}
                      </Form.Text>
                    )}
                  </Col>
                </Row>
              </Form.Group>
              <br />

              <Form.Group>
                <Col xs lg="2">
                  <Button variant="outline-dark"  style={{width: "7rem"}} type="submit" onClick={(event)=>mainformSubmit(event)}>
                    Add Invoice
                  </Button>
                </Col>
              </Form.Group>






            </Form>
          </Col>
          <Col>
            <Form className="text-start mt-4" id="myFormProd">
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Item</Form.Label>
                  <Form.Control
                    type="text"
                    name="item"
                    id="item"
                    placeholder="Enter Product Name"
                    onChange={handler}
                  />
                  {errors.item && (
                    <Form.Text style={{ color: "red" }}>
                      {errors.item}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    id="quantity"
                    placeholder="Quantity"
                    onChange={handler}
                    ref={inpquantity}
                  />
                  {errors.quantity && (
                    <Form.Text style={{ color: "red" }}>
                      {errors.quantity}
                    </Form.Text>
                  )}
                </Form.Group>
              </Row>

              <Row className="mb-3 ">
                <Form.Group as={Col}>
                  <Form.Label>₹ Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    id="price"
                    placeholder="₹ Price"
                    ref={inpprice}
                    onChange={handler}
                  />
                  {errors.price && (
                    <Form.Text style={{ color: "red" }}>
                      {errors.price}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Discount %</Form.Label>
                  <Form.Control
                    type="number"
                    name="discount"
                    id="discount"
                    placeholder="Discount %"
                    ref={inpdiscount}
                    onChange={handler}
                  />
                  {errors.discount && (
                    <Form.Text style={{ color: "red" }}>
                      {errors.discount}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>₹ Total</Form.Label>
                  <Form.Control
                    type="Number"
                    name="total"
                    id="total"
                    ref={inptotal}
                    placeholder="₹ Total"
                    defaultValue={prod.total}
                    onChange={handler}
                  />
                </Form.Group>
              </Row>

              <Button variant="primary" type="submit" onClick={formSubmit}>
                Add Product
              </Button>
            </Form>
            <br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                { allprod.length &&
                allprod.map((val, i) => (
                  <tr>
                    <td>{i+1}</td>
                    <td>{val.item}</td>
                    <td>{val.quantity}</td>
                    <td>₹ {val.price}</td>
                    <td>{val.discount} %</td>
                    <td>₹ {val.total}</td>
                  </tr>
                ))}
                <tr>
                  <td>

                  </td>
                  <td>
                    
                  </td>
                  <td>
                    
                  </td>
                  <td>
                    
                  </td>
                  <td>
                    <h4>Total:</h4>
                  </td>
                  <td>
                    {totalvalue}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Addinvoice;
