import React, { useState } from "react";
import {Link, useNavigate, useParams} from 'react-router-dom';
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import baseUrl from "../config/config.js";
import axios from 'axios';
import AlertModal from "../Components/AlertModal";
const Reset = () => {
    axios.defaults.withCredentials = true;
    const [password,setPassword] = useState('');
    const [confirmpassword,setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [alertText,setAlertText] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setIsSubmitting(true);
        if(password === confirmpassword && password !== "" && confirmpassword !== ""){
            try{
                const resetPassword = await axios.post(`${baseUrl.baseUrl}/alphaapi/auth/reset`,{
                    password:password,
                    confirmpassword:confirmpassword,
                    resetPasswordToken:id
                });
                if(resetPassword.status === 200){
                    setIsSubmitting(false);
                    setIsSuccessModalOpen(true);
                    setAlertText("Password Reset Successful");
                    setTimeout(()=>{
                        setIsSuccessModalOpen(false);
                    },3000)
                    navigate('/login');
                }
                else{
                    setIsSubmitting(false);
                    setIsSuccessModalOpen(true);
                    setTimeout(()=>{
                        setIsSuccessModalOpen(false);
                    },3000)
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
        else{
            setIsSubmitting(false);
            setIsSuccessModalOpen(true);
            setTimeout(()=>{
                setIsSuccessModalOpen(false);
            },3000)
            setAlertText("Password Does not match!!");
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
                                <form action="#" className="form" onClick={handleSubmit}>
                                    <label htmlFor="#">Enter New Password
                                        <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} required />
                                    </label>

                                    <label htmlFor="#">Confirm Password
                                        <input type="password" placeholder="Confirm Password" onChange={(e)=>{setConfirmPassword(e.target.value)}} required />
                                    </label>

                                    <label htmlFor="#">
                                        {isSubmitting ? (<Button btnText={'Processing...'} />) :(<Button btnText={'Reset'} />)}
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
 
export default Reset;