import React,{useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import axios from 'axios';
import AlertModal from "../Components/AlertModal";
import baseUrl from "../config/config.js";
import Search from "../Components/Search";
const AdminRegister = () => {
    axios.defaults.withCredentials = true;
    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [alertText,setAlertText] = useState('');
    const [stats,setStats] = useState('');
    const [search,setSearch] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        if(email === ''  || firstname === '' || lastname === ''  || password === ''){
            alert('Please ensure all fields are filled');
        }
        else if(password.length <= 4){
            alert('Please make sure passwords is greater than 4 characters');
        }
        else{
            setIsSubmitting(true)
            try{
                const userSubmit = await axios.post(`${baseUrl.baseUrl}/alphaapi/auth/adminRegister`,{
                    email:email,
                    fname:firstname,
                    lname:firstname,
                    password:password,
                    isAdmin:true,
                });
                setLoading(true);
                
                if(userSubmit.status === 201){
                    setIsSuccessModalOpen(true);
                    setAlertText("Admin Registration Successful!");
                    setLoading(false);
                    setIsSubmitting(false);
                    setTimeout(()=>{
                        setIsSuccessModalOpen(false);
                    },3000)
                    navigate('/dashboard');
                }
                else{
                    setLoading(false);
                    setIsSuccessModalOpen(true);
                    setAlertText("Admin Registration Failed!");
                    setTimeout(()=>{
                        setIsSuccessModalOpen(false);
                    },3000)
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

    const [modal,setModal] = useState(false)
    const [mobile,setMobile] = useState(false)
    const handleModal = () =>{
        setModal(!modal);
    }

    const handleMobile = () =>{
        setMobile(!mobile);
    }

    const searchToggle = () =>{
        setSearch(!search);
    };

    return (
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile} searchToggle={searchToggle} />
            <main className="main">
                <section className="section auth">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">Register</h3>
                                <form action="#" className="form" onSubmit={handleSubmit}>
                                    <label htmlFor="#">First Name
                                        <input type='text' placeholder='First Name' onChange={(e)=>{
                                        setFirstname(e.target.value);
                                    }} required/>
                                    </label>

                                    <label htmlFor="#">Last Name
                                        <input type='text' placeholder='Last Name' onChange={(e)=>{
                                        setLastname(e.target.value);
                                    }} required/>
                                    </label>

                                    <label htmlFor="#">Email Address
                                        <input type='email' placeholder='Email' onChange={(e)=>{
                                        setEmail(e.target.value);
                                    }} required/>
                                    </label>

                                    <label htmlFor="#">Password
                                        <input type='password' placeholder='Password' onChange={(e)=>{
                                        setPassword(e.target.value);
                                    }} required/>
                                    </label>

                                    <label htmlFor="#">
                                    {stats === '' ? (<button>{isSubmitting ? 'Processing..' : 'Create Admin Account'}</button>) : (<button>{isSubmitting ? 'Processing..' : stats}</button>)}
                                    </label>

                                    <label htmlFor="#" className="center-label">
                                        <span><Link to='/'>Return to Store</Link></span>
                                    </label>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <Modal modal={modal} handleModal={handleModal} />

                <MobileNav mobile={mobile} handleMobile={handleMobile} />

                <AlertModal isOpen={isSuccessModalOpen} alertText={alertText} onClose={() => setIsSuccessModalOpen(false)} />

                <Search search={search} searchToggle={searchToggle} />
            </main>

            <Footer />
        </>
        
    );
}
 
export default AdminRegister;