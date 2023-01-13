import React from "react";
import {Link} from 'react-router-dom';
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
const Account = () => {
    return (
        <>
            <Header />
            <main className="main">
                <section className="section welcome">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">Welcome Back, Eskca</h3>
                                <Link to='/'><Button btnText={'Logout'}/></Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section orders">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box orders-box">
                                <h3 className="heading">NO PLACED ORDERS YET</h3>
                            </div>

                            <div className="box address">
                                <h3 className="heading">PRIMARY ADDRESS</h3>
                                <p className="paragraph">Kelvin Eskca</p>
                                <p className="paragraph">United States</p>
                                <Link to='/addresses'><Button btnText={'Edit Addresses'}/></Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
 
export default Account;