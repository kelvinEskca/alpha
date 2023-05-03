import React,{useState} from "react";
import {Link,useNavigate} from 'react-router-dom';
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import axios from "axios";
import Loader from "../Components/Loader";
import baseUrl from "../config/config.js";
import AlertModal from "../Components/AlertModal";
const Login = () => {
    axios.defaults.withCredentials = true;
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [modal,setModal] = useState(false)
    const [mobile,setMobile] = useState(false)
    const [loading,setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [stats,setStats] = useState('');
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [alertText,setAlertText] = useState('');
    const handleModal = () =>{
        setModal(!modal);
    }

    const handleMobile = () =>{
        setMobile(!mobile);
    }
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsSubmitting(true)
        try{
            const loginUser = await axios.post(`${baseUrl.baseUrl}/alphaapi/auth/login`,{
                email:email,
                password:password
            });
            if(loginUser.status === 200){
                localStorage.setItem("token", loginUser.data.accessToken);
                localStorage.setItem("user",JSON.stringify(loginUser.data));
                setLoading(true);
                if(loginUser.data.isAdmin === false){
                    setLoading(false);
                    setIsSubmitting(false);
                    setIsSuccessModalOpen(true);
                    setAlertText("Login Successful");
                    setTimeout(()=>{
                        setIsSuccessModalOpen(false);
                    },3000)
                    navigate('/account');

                }
                else{
                    setLoading(false);
                    setIsSubmitting(false);
                    setIsSuccessModalOpen(true);
                    setAlertText("Login Successful");
                    setTimeout(()=>{
                        setIsSuccessModalOpen(false);
                    },3000)
                    navigate('/dashboard');
                }
            }
            else{
                setLoading(false);
                setIsSubmitting(false);
                setIsSuccessModalOpen(true);
                setAlertText(loginUser.statusText);
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
                setIsSuccessModalOpen(true);
                setAlertText(err.response.data);
                setTimeout(()=>{
                    setStats('');
                },3000)
            }
        }
    }
    if(loading) return <Loader />;
    return (
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile}/>
            <main className="main">
                <section className="section auth">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">Log Into My Account</h3>
                                <form action="#" className="form" onSubmit={handleSubmit}>
                                    <label htmlFor="#">Email Address
                                        <input type="email" name="email" id="email" required onChange={(e)=>{
                                            setEmail(e.target.value);
                                        }}/>
                                    </label>

                                    <label htmlFor="#">Password
                                        <input type="password" name="password" id="password" required onChange={(e)=>{
                                            setPassword(e.target.value);
                                        }}/>
                                    </label>

                                    <label htmlFor="#" className="center-label">
                                        <Link to='/forget'>Forgot Password?</Link>
                                    </label>

                                    <label htmlFor="#">
                                        {stats === '' ? (<Button btnText={isSubmitting ? 'Processing..' : 'Log In'}  />) : (<Button btnText={isSubmitting ? 'Processing..' : stats}  />)}
                                        
                                    </label>

                                    <label htmlFor="#" className="center-label">
                                        <span>New to Velonte <Link to='/register'>Create An Account</Link></span>
                                    </label>
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
 
export default Login;