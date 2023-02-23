import React,{useState} from "react";
import {Link,useNavigate} from 'react-router-dom';
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import axios from "axios";
import Loader from "../Components/Loader";
const Admin = () => {
    axios.defaults.withCredentials = true;
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [modal,setModal] = useState(false)
    const [mobile,setMobile] = useState(false)
    const [loading,setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
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
            const loginUser = await axios.post('http://localhost:5000/alphaapi/auth/admin',{
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
                    navigate('/account');
                }
                else{
                    setLoading(false);
                    navigate('/dashboard');
                }
            }
            else{
                alert(loginUser.statusText);
                console.log(loginUser.message);
            }
        }
        catch(err){
            console.log(err);
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
                                <h3 className="heading">Log In As Admin</h3>
                                <form action="#" className="form" onSubmit={handleSubmit}>
                                    <label htmlFor="#">Email Address
                                        <input type="email" name="email" id="email" onChange={(e)=>{
                                            setEmail(e.target.value);
                                        }}/>
                                    </label>

                                    <label htmlFor="#">Password
                                        <input type="password" name="password" id="password" onChange={(e)=>{
                                            setPassword(e.target.value);
                                        }}/>
                                    </label>

                                    <label htmlFor="#" className="center-label">
                                        <Link to='/forget'>Forgot Password?</Link>
                                    </label>

                                    <label htmlFor="#">
                                        <Button btnText={isSubmitting ? 'Processing..' : 'Log In'}  />
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
            </main>

            <Footer />
        </>
        
    );
}
 
export default Admin;