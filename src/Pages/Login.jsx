import React from "react";
import {Link} from 'react-router-dom';
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Input from "../Components/Input";
const Login = () => {
    return (
        <>
            <Header />
            <main className="main">
                <section className="section auth">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">Log Into My Account</h3>
                                <form action="#" className="form">
                                    <label htmlFor="#">Email Address
                                        <Input type={'email'} placeholder={'Email'} />
                                    </label>

                                    <label htmlFor="#">Password
                                        <Input type={'password'} placeholder={'Password'} />
                                    </label>

                                    <label htmlFor="#" className="center-label">
                                        <Link to='/forget'>Forgot Password?</Link>
                                    </label>

                                    <label htmlFor="#">
                                        <Button btnText={'Log In'} />
                                    </label>

                                    <label htmlFor="#" className="center-label">
                                        <span>New to Alphalete <Link to='/register'>Create An Account</Link></span>
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
 
export default Login;