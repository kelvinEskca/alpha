import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import baseUrl from "../config/config.js";
import axios from 'axios';
import AlertModal from "../Components/AlertModal";
const Forgot = () => {
    axios.defaults.withCredentials = true;
    const [email,setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [alertText,setAlertText] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setIsSubmitting(true);
        try{
            const resetPassword = await axios.post(`${baseUrl.baseUrl}/alphaapi/auth/forget`,{
                email:email,
            });
            if(resetPassword.status === 200){
                setIsSubmitting(false);
                setIsSuccessModalOpen(true);
                setAlertText("Email Sent");
                setTimeout(()=>{
                    setIsSuccessModalOpen(false);
                },3000)
                navigate('/');
            }
            else{
                setIsSubmitting(false);
                setIsSuccessModalOpen(true);
                setAlertText(resetPassword.statusText);
            }
        }
        catch(err){
            setIsSubmitting(false);
            if (err.response && err.response.status === 401) {
                setIsSuccessModalOpen(true);
                setAlertText(err.response.data);
                setTimeout(()=>{
                    setIsSuccessModalOpen(false);
                },3000)
            }
        }
    }
    return (
        <>
            <Header />
            <main className="main">
                <section className="section auth">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">Reset Password</h3>
                                <form action="#" className="form" onSubmit={handleSubmit}>
                                    <label htmlFor="#">Email Address
                                        <input type="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} required />
                                    </label>

                                    <label htmlFor="#">
                                        {isSubmitting ? (<button>Processing....</button>) :(<button >Recover</button>)}
                                    </label>

                                    <label htmlFor="#" className="center-label">
                                        <span>Remember your password? <Link to='/login'>Back To Login</Link></span>
                                    </label>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <AlertModal isOpen={isSuccessModalOpen} alertText={alertText} onClose={() => setIsSuccessModalOpen(false)} />
            </main>

            <Footer />
        </>
        
    );
}
 
export default Forgot;