import React from 'react'
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap'
import logo from "../../assets/images/logo2.png"

const Footer = () => {
    return (
        <section>
            <Row className='justify-content-center'>
                <Col lg="2" md="2"></Col>
                <Col lg="8" md="8" sm="12" xs="12" className='d-flex my-5'>
                    <p><img src={logo} alt="Space X" className="footer-logo" /></p>
                    <a href="#" className='mx-3 text-white social'>TWITTER</a>
                    <a href="#" className='mx-3 text-white social'>YOUTUPE</a>
                    <a href="#" className='mx-3 text-white social'>INSTAGRAM</a>
                    <a href="#" className='mx-3 text-white social'>FLICKR</a>
                    <a href="#" className='mx-3 text-white social'>LINKEDIN</a>
                    <a href="#" className='mx-3 text-white social'>PRIVACY POLICY</a>
                    <a href="#" className='mx-3 text-white social'>SUPPLIER</a>
                </Col>
                <Col lg="2" md="2"></Col>
            </Row>
        </section>
    )
}

export default Footer