import React from 'react'
import { Row, Col } from 'reactstrap'
import Navbar from "../components/NavBar/index"

const Banner = () => {
    return (
        <section className='banner-sec'>
            <Navbar />
            <Row className='d-flex'>
                <Col lg="12" md="12" xs="12" sm="12">
                    <div className='text-center mt-5' data-aos="fade-right"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine">
                        <h1 className='text-white title-header'>Falcon Heavy</h1>
                    </div>
                    <div className='text-center mt-5' data-aos="fade-left"
                        data-aos-offset="300"
                        data-aos-easing="ease-in-sine">
                        <h1 className='text-white'>OVER 5 MILLION LBS OF THRUST</h1>
                    </div>
                </Col>
            </Row>
        </section>
    )
}

export default Banner