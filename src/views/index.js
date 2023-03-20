import React from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Banner from "./Banner";
import Services from "./Services";
import Footer from "../components/Footer";

const Home = () => {

    React.useEffect(() => {
        AOS.init();
    });
    return (
        <>
            <div className="">
                <Banner />
                <Services />
                <Footer />
            </div>
        </>
    )
}

export default Home