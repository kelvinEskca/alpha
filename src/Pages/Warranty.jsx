import React,{useState} from 'react';
import { useEffect } from 'react';
import Footer from '../Components/Footer';
import SupportHeader from '../Components/SupportHeader';
import MobileNav from "../Components/MobileNav";
import Modal from "../Components/Modal";
import { Link } from 'react-router-dom';
const Warranty = () => {

    const [modal,setModal] = useState(false);
    const [mobile,setMobile] = useState(false);
    const [loading,setLoading] = useState(true);

    const handleModal = () =>{
        setModal(!modal);
    }

    const handleMobile = () =>{
        setMobile(!mobile);
    }

    useEffect(()=>{
        setLoading(false);
    },[]);
   
    return (
        <>
            <SupportHeader handleModal={handleModal} handleMobile={handleMobile}/>
            <main className="main help-main">
                <section className="section cant">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">Warranty Policy</h3>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section policy">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">90-Day Warranty</h3>
                                <ul>
                                    <li>We have a 90-day Warranty for all items on our site! The warranty begins once your package has been delivered to you. This policy was made effective on January 29th, 2023</li>
                                    <li>Items deemed defective by the manufacturer or damaged within the the policy timeframe are covered.</li>
                                    <li>In the unlikely event that you've received an incorrect item, are missing an item from your order, or an item is damaged in any way, please submit a ticket to our <Link to={'/ticket'} /></li>
                                    <li>Failure to communicate any damaged or defective items to our Support Team will lead to your item being subject to our <Link to={'/return'} /> along with any costs that may be associated with a denied return.</li>
                                </ul>
                            </div>

                            <div className="box">
                                <h3 className="heading">What is deemed defective or damaged?</h3>
                                <ul>
                                    <li>We are eager to stand behind the quality of our pieces. If you experience any of the following issues, they may be covered under our warranty policy:</li>
                                    <li>Holes</li>
                                    <li>Rips/tears</li>
                                    <li>Manufacturing Errors</li>
                                    <li>Missing features</li>
                                    <li>Other one of a kind instances as deemed by our support team.</li>
                                </ul>
                            </div>

                            <div className="box">
                                <h3 className="heading">Care Guide</h3>
                                <ul>
                                    <li>Care Guide: Each Product page lists the care guide for the item. Failure to follow the care guide may void the Warranty Policy.</li>
                                </ul>
                            </div>

                            <div className="box">
                                <h3 className="heading">Are sale items covered under the Warranty Policy?</h3>
                                <p className="paragraph">Items purchased from the VELONTÉ site directly are covered under our 90 day Warranty Policy. We are proud to stand behind the quality of our pieces, including any discounts or final sale pieces. <em>Please note that items discounted at 30% or more are considered final sale and ineligible for returns, refunds, or exchanges.</em></p>
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
 
export default Warranty;