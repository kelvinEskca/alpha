import React,{useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Modal from "./Modal";
import MobileNav from "./MobileNav";
const Success = () => {
    const [modal,setModal] = useState(false);
    const [mobile,setMobile] = useState(false);
    const handleModal = () =>{
        setModal(!modal);
    }

    const handleMobile = () =>{
        setMobile(!mobile);
    }
    return (
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile}/>
            <main className="main successmain">
                <section className="section success">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="successheading">Thank you for the purchase!</h3>
                                <p className="paragraph">Check your email for information about your order</p>
                            </div>
                        </div>
                    </div>
                </section>

                <Modal modal={modal} handleModal={handleModal} />

                <MobileNav mobile={mobile} handleMobile={handleMobile} />
            </main>
        <Footer />
        </>
    );
}
 
export default Success;