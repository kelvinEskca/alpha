import React,{useState} from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import axios from "axios";
const Track = () => {
    const [modal,setModal] = useState(false)
    const [mobile,setMobile] = useState(false)
    const handleModal = () =>{
        setModal(!modal);
    }

    const handleMobile = () =>{
        setMobile(!mobile);
    }

    
    return (
        <>
        <Header handleModal={handleModal} handleMobile={handleMobile}/>
        <main className="main">
            <section className="section">
                <div className="wrapper">
                    <div className="boxes">
                        <div className="box">

                        </div>
                    </div>
                </div>
            </section>

            <Modal modal={modal} handleModal={handleModal} />
            <MobileNav mobile={mobile} handleMobile={handleMobile} />
        </main>
        <Footer/>
        </>
        
    );
}
 
export default Track;