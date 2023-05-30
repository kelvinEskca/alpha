import React,{useState} from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import SupportHeader from '../Components/SupportHeader';
import Loader from "../Components/Loader";
import MobileNav from "../Components/MobileNav";
import Modal from "../Components/Modal";
const Return = () => {

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
                                <h3 className="heading">Returns & Exchanges</h3>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section policy">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">30-day Returns</h3>
                                <ul>
                                    <li>We have a 30-day return window for all items on our site (excluding items discounted 30% or more). This return window begins once your package has been delivered to you.</li>
                                    <li>In the unlikely event that you've received an incorrect item, are missing an item from your order, or an item is damaged in any way, please submit a ticket to our Support Team! (Failure to notify our Support Team of this prior to shipment will cause your item to be subject to our Returns Policy along with any costs that may be associated with a denied return.)</li>
                                </ul>
                            </div>

                            <div className="box">
                                <h3 className="heading">Return standards and conditions:</h3>
                                <ul>
                                    <li>By adding return items to your return, you are verifying that you have (1) received the items selected to return and (2) intend to return the selected items.</li>
                                    <li>Items must be unwashed and not put through a dryer</li>
                                    <li>Items covered in animal/human hair are subject to denial.</li>
                                    <li>Items covered in glitter, powder, skin cells, or other matter are subject to denial.</li>
                                    <li>Items with piling may be subject to denial.</li>
                                    <li>Items with strong odors or smells like smoke, cologne, detergent, scented sprays, body odor, etc., will not be accepted.</li>
                                    <li>Items with markings or other stains (such as deodorant) will not be accepted.</li>
                                    <li>Many (but not all) of our items include VELONTÉ tags. Please ensure these VELONTÉ and sizing tags are attached, or your return will be subject to denial.</li>
                                    <li>At this time, we do not cover the cost of return shipping.</li>
                                </ul>
                                <p className="paragraph">For domestic US customers, the label cost will be deducted automatically from the product(s) you are returning through our returns portal (see US domestic customers link below).</p>
                                <ul>
                                    <li>If you are returning your entire order, please note that the original shipping costs will not be refunded.</li>
                                    <li>Any returns that are delivered outside of 45 days of the delivery date of your order may be subject to denial. Please contact our support team if your return is delayed unexpectedly.</li>
                                    <li>If your return is denied, we will notify you via email. Your order will then be reshipped to you within 5-10 business days.</li>
                                </ul>
                            </div>

                            <div className="box">
                                <h3 className="heading">Can sale items be returned?</h3>
                                <ul>
                                    <li>Any items discounted 30% or more are considered final sale and cannot be returned for a refund or exchange. Items discounted less than 30% are welcome to be returned within our 30-day window.</li>
                                    <li>Although ineligible for returns, items marked final sale are still covered under our <Link to='/warranty'>Warranty Policy</Link></li>
                                </ul>
                                <p className="paragraph">If you need to start a return, click one of the links below. If you need any extra help, <Link to="/contact">contact us</Link>and we'll be happy to give you a hand!</p>

                                <Link to='/ticket'>US domestic customers, please click here.</Link>
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
 
export default Return;