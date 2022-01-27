import React from 'react'
import {Carousel} from 'react-bootstrap'
function Crouselcomponent() {
    return (
        <Carousel fade>
  <Carousel.Item>
    <img
      className="d-block w-100"
      style={{height:"500px"}}
      src={"../Images/image1.jpg"}
      alt="First slide"
    />
    <Carousel.Caption>
      </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      style={{height:"500px"}}
      src={"../Images/image2.jpg"}
      alt="Second slide"
    />

    <Carousel.Caption>
      </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      style={{height:"500px"}}
      src={"../Images/image3.jpg"}
      alt="Third slide"
    />

    <Carousel.Caption>
      </Carousel.Caption>
  </Carousel.Item>
</Carousel>
    )
}

export default Crouselcomponent
