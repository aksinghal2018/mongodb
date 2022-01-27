import React from 'react'
import Crouselcomponent from './Crouselcomponent'
import { Container, Card, Button } from 'react-bootstrap'
import { Bar, Line,Pie, Doughnut } from 'react-chartjs-2';
import { Row,Col } from 'react-bootstrap';

function Home() {
    const Signinhandle = () => {
        window.location.replace("/login")
    }
    return (
        <div style={{ padding: "20px", backgroundImage: "url('../Images/background1.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
            <Crouselcomponent />
            <div style={{ backgroundColor: "white", marginBottom: "50px", paddingLeft: "18px", paddingRight: "18px", marginTop: "8px", paddingBottom: "50px" }}>
                
                
            </div>

        </div>
    )
}

export default Home
