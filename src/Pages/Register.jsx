import React from "react";
import {Link} from 'react-router-dom';
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Input from "../Components/Input";
const Register = () => {
    return (
        <>
            <Header />
            <main className="main">
                <section className="section auth">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">Register</h3>
                                <form action="#" className="form">
                                    <label htmlFor="#">First Name
                                        <Input type={'text'} placeholder={'First name'} />
                                    </label>

                                    <label htmlFor="#">Last Name
                                        <Input type={'text'} placeholder={'Last name'} />
                                    </label>

                                    <label htmlFor="#">Email Address
                                        <Input type={'email'} placeholder={'Email'} />
                                    </label>

                                    <label htmlFor="#">Password
                                        <Input type={'password'} placeholder={'Password'} />
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