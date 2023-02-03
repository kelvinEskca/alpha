import Button from '../Components/Button';
import Input from '../Components/Input';
import React,{useState} from 'react';
import { useEffect } from 'react';
import Footer from '../Components/Footer';
import SupportHeader from '../Components/SupportHeader';
import Loader from "../Components/Loader";
import MobileNav from "../Components/MobileNav";
import Modal from "../Components/Modal";
const Contact = () => {

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
                                <h3 className="heading">Contact Us</h3>
                                <form action="#">
                                    <label htmlFor="#"><Input type={'text'} placeholder={'Search key words here...'} /></label>
                                    <Button btnText={'Search'} />
                                </form>
                                
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section policy form-policy">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                            <form action="#">
                                <label htmlFor="#">Name:
                                    <input type="text" name='name' placeholder='Name' />
                                </label>

                                <label htmlFor="#">Email:
                                    <input type="email" name='email' placeholder='Email' />
                                </label>

                                <label htmlFor="#">Message:
                                    <textarea name="message" id="message" cols="30" rows="10" placeholder='Message'></textarea>
                                </label>

                                <label htmlFor="#"><button>Submit</button></label>
                            </form>
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
 
export default Contact;