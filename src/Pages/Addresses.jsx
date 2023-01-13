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
                            <Link to='/account'><Button btnText={' < Back To Account'}/></Link>
                            <div className="box">
                                <h3 className="heading">MY ADDRESSES</h3>
                                <Button btnText={'Add A New Address'}/>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section orders default">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <div className="text">
                                    <h3 className="heading">Default Address</h3>
                                    <p className="paragraph">Kelvin Eskca</p>
                                    <p className="paragraph">United States</p>
                                </div>

                                <div className="btn-row">
                                    <Button btnText={'Edit'} />
                                </div>
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