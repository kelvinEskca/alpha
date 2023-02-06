import React,{useState} from "react";
import {Link,useNavigate} from 'react-router-dom';
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import axios from 'axios';
import Loader from "../Components/Loader";
const Register = () => {
    axios.defaults.withCredentials = true;
    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(email,firstname,lastname,password);
        if(email === ''  || firstname === '' || lastname === ''  || password === ''){
            alert('Please ensure all fields are filled');
        }
        else if(password.length <= 4){
            alert('Please make sure passwords is greater than 4 characters');
        }
        else{
            try{
                const userSubmit = await axios.post('https://alphaapi-production.up.railway.app/alphaapi/auth/register',{
                    email:email,
                    fname:firstname,
                    lname:firstname,
                    password:password,
                });
                setLoading(true);
                if(userSubmit.status === 201){
                    alert("Success");
                    setLoading(false);
                    navigate('/login');
                }
                else{
                    setLoading(false);
                    alert(userSubmit.statusText)
                }
            }
            catch(err){
                console.log(err);
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
    if(loading) return <Loader />;
    return (
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile} />
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
                                    }}/>
                                    </label>

                                    <label htmlFor="#">Last Name
                                        <input type='text' placeholder='Last Name' onChange={(e)=>{
                                        setLastname(e.target.value);
                                    }}/>
                                    </label>

                                    <label htmlFor="#">Email Address
                                        <input type='email' placeholder='Email' onChange={(e)=>{
                                        setEmail(e.target.value);
                                    }}/>
                                    </label>

                                    <label htmlFor="#">Password
                                        <input type='password' placeholder='Password' onChange={(e)=>{
                                        setPassword(e.target.value);
                                    }}/>
                                    </label>

                                    <label htmlFor="#">
                                        <Button btnText={'Create My Account'} />
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
            </main>

            <Footer />
        </>
        
    );
}
 
export default Register;