import React,{useState} from 'react';
import { useEffect } from 'react';
import Footer from '../Components/Footer';
import SupportHeader from '../Components/SupportHeader';
import Loader from "../Components/Loader";
import MobileNav from "../Components/MobileNav";
import Modal from "../Components/Modal";
import { Link } from 'react-router-dom';
const Help = () => {

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
    if(loading) return <Loader />;
    return (
        <>
            <SupportHeader handleModal={handleModal} handleMobile={handleMobile}/>
            <main className="main help-main">
                <section className="section cant">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">Return Policy</h3>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section policy">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">How long does it take to process a return?</h3>
                                <ul>
                                    <li>Important Notice - Unfortunately we are experiencing longer than normal processing times. We appreciate your patience!</li>
                                    <li>Once your return package has been delivered to us, please allow our team 7-20 business days to inspect and process the item(s).</li>
                                </ul>
                            </div>

                            <div className="box">
                                <h3 className="heading">Refunds:</h3>
                                <p className="paragraph">Upon your return package's delivery and processing, the cost of the returned item(s) will be issued to the original method of payment used when placing the order. This can take 3-5 business days to process. Please note that return label costs are deducted from the total refund amount for the item(s) being returned.</p>
                            </div>

                            <div className="box">
                                <h3 className="heading">Why does my package say it was delivered if I haven't received it?</h3>
                                <p className="paragraph">Don't stress! We suggest double checking around your property, mailbox, front desk/locker area, and with neighbors first.</p>

                                <h3 className="heading">If your delivery address is in the United States:</h3>
                                <p className="paragraph">It is recommended by the couriers we use to wait an additional 5 business days for delivery. It is very common for packages to be delivered a few days after initially being marked as delivered.</p>

                                <h3 className="heading">If your delivery address is outside of the United States:</h3>
                                <p className="paragraph">Couriers recommend waiting an additional 2 business days for delivery. If you still haven't received your package by the third business day, please proceed in opening a claim through your local courier.</p>

                                <p className="paragraph">If you have waited these extra days, or would like further assistance looking into your package's delivery, please contact our <Link to="/support">Support Team</Link></p>

                                <h3 className="heading">Please contact us within 15 days of the delivery date. This will ensure that our team is able to assist you further and open an investigation on applicable orders.</h3>
                            </div>

                            <div className="box">
                                <h3 className="heading">Where can I find my tracking number?</h3>
                                <p className="paragraph">You'll find your tracking number in your shipping confirmation email. Below you'll find a breakdown of tracking number identifications and links that can be found in your shipping email.</p>

                                <p className="paragraph">If you have any additional questions or concerns, our Support Team is here for you. Just submit a <Link to='/support'>ticket</Link> and we'll be happy to give you a hand!</p>
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
 
export default Help;