import Button from '../Components/Button';
import Input from '../Components/Input';
import React,{useState} from 'react';
import { useEffect } from 'react';
import Footer from '../Components/Footer';
import SupportHeader from '../Components/SupportHeader';
import Loader from "../Components/Loader";
import MobileNav from "../Components/MobileNav";
import Modal from "../Components/Modal";
import baseUrl from "../config/config.js";
import axios from 'axios';
import AlertModal from '../Components/AlertModal';
const Contact = () => {

    const [modal,setModal] = useState(false);
    const [mobile,setMobile] = useState(false);
    const [loading,setLoading] = useState(true);
    const [stats,setStats] = useState('');
    const [email,setEmail] = useState('');
    const [fname,setfName] = useState('');
    const [lname,setlName] = useState('');
    const [message,setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [alertText,setAlertText] = useState('');

    const handleModal = () =>{
        setModal(!modal);
    }

    const handleMobile = () =>{
        setMobile(!mobile);
    }

    useEffect(()=>{
        setLoading(false);
    },[]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setIsSubmitting(true)
        if(email === ''  || fname === '' || lname === '' || message === ''){
            alert('Please ensure all fields are filled');
        }
        else{
            try{
                const contactSubmit = await axios.post(`${baseUrl.baseUrl}/alphaapi/contact`,{
                    email:email,
                    fname:fname,
                    lname:lname,
                    message:message,
                });
                setLoading(true);
                
                if(contactSubmit.status === 201){
                    setIsSuccessModalOpen(true);
                    setAlertText("Contact Message Sent Successfully!");
                    setLoading(false);
                    setIsSubmitting(false);
                    setTimeout(()=>{
                        setIsSuccessModalOpen(false);
                    },3000)
                }
                else{
                    setLoading(false);
                    setIsSuccessModalOpen(true);
                    setAlertText("Contact Message Failed to send!");
                    setTimeout(()=>{
                        setIsSuccessModalOpen(false);
                    },3000);
                }
            }
            catch(err){
                setLoading(false);
                setIsSubmitting(false);
                if (err.response && err.response.status === 401) {
                    setStats(err.response.data);
                    setTimeout(()=>{
                        setStats('');
                    },3000)
                }
            }
        }
    }
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
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="#">Name:
                                        <input type="text" name='fname' placeholder='First Name' onChange={(e)=>{setfName(e.target.value)}} required />
                                    </label>

                                    <label htmlFor="#">Name:
                                        <input type="text" name='lname' placeholder='Last Name' onChange={(e)=>{setlName(e.target.value)}} required />
                                    </label>

                                    <label htmlFor="#">Email:
                                        <input type='email' placeholder='Email' onChange={(e)=>{setEmail(e.target.value);}} required/>
                                    </label>

                                    <label htmlFor="#">Message:
                                        <textarea name="message" id="message" cols="30" rows="10" placeholder='Message' onChange={(e)=>{setMessage(e.target.value)}} required></textarea>
                                    </label>

                                    <label htmlFor="#">{stats === '' ? (<button>{isSubmitting ? 'Processing..' : 'Submit'}</button>) : (<button>{isSubmitting ? 'Processing..' : stats}</button>)}</label>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <Modal modal={modal} handleModal={handleModal} />

                <MobileNav mobile={mobile} handleMobile={handleMobile} />

                <AlertModal isOpen={isSuccessModalOpen} alertText={alertText} onClose={() => setIsSuccessModalOpen(false)} />
            </main>

            <Footer />
        </>
    );
}
 
export default Contact;