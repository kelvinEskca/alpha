import React,{useState} from "react";
import {Link,useNavigate} from 'react-router-dom';
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import axios from 'axios';
const Register = () => {
    axios.defaults.withCredentials = true;
    const [firstname,setFirstname] = useState('');
    const [lastname,setLastname] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
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
                const userSubmit = await axios.post('http://localhost:5000/alphaapi/auth/register',{
                    email:email,
                    fname:firstname,
                    lname:firstname,
                    password:password,
                });
                console.log(userSubmit);
                navigate('/login');
            }
            catch(err){
                console.log(err);
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
            </main>

            <Footer />
        </>
        
    );
}
 
export default Register;