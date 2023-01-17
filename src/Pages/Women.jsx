import React,{useState} from "react";
import ImageCard from '../Components/ImageCard';
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
const Women = () => {
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
                <section className="section shop gender">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <img src="../images/0F6A0266_2.jpg" alt="0F6A0266_2" />
                                <div className="text-box">
                                    <h3 className="heading">Shop For Her</h3>
                                    <Button btnText={'Shop Hoodies'} />
                                    <Button btnText={'Shop Joggers'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section new gallery">
                    <div className="wrapper">
                        <div className="boxes">
                            <ImageCard />

                            <ImageCard />

                            <ImageCard />

                            <ImageCard />

                            <ImageCard />

                            <ImageCard />

                            <ImageCard />

                            <ImageCard />

                            <ImageCard />

                            <ImageCard />

                            <ImageCard />

                            <ImageCard />

                            <ImageCard />

                            <ImageCard />

                            <ImageCard />

                            <ImageCard />

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
 
export default Women;