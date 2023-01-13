import React, { useState } from "react";
import {Link} from 'react-router-dom';
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
const Dashboard = () => {
    const [users,setUsers] = useState(null);
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

                <section className="section orders default dash-default">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <div className="text">
                                    <h3 className="heading">Customers</h3>
                                    <p className="paragraph">0</p>
                                    <p className="paragraph">Date</p>
                                </div>

                                <img src="../images/icons8-people-30.png" alt="icons8-people-30" />
                            </div>

                            <div className="box">
                                <div className="text">
                                    <h3 className="heading">Products</h3>
                                    <p className="paragraph">0</p>
                                    <p className="paragraph">Date</p>
                                </div>

                                <img src="../images/icons8-fast-moving-consumer-goods-30.png" alt="icons8-fast-moving-consumer-goods-30" />
                            </div>

                            <div className="box">
                                <div className="text">
                                    <h3 className="heading">Orders</h3>
                                    <p className="paragraph">0</p>
                                    <p className="paragraph">Date</p>
                                </div>

                                <img src="../images/icons8-shopping-cart-30.png" alt="icons8-shopping-cart-30" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section latest">
                    <div className="wrapper">
                        <h3 className="heading">Latest Customers</h3>
                        <div className="boxes">
                            {users === null ? (
                                <div className="table">
                                    <p className="paragraph">No data</p>
                                </div>
                            ) : (
                                <div className="table">
                                    <div className="table-top">
                                        <div className="inner"><h3 className="heading">Table</h3></div>
                                        <div className="inner"><h3 className="heading">Table</h3></div>
                                        <div className="inner"><h3 className="heading">Table</h3></div>
                                        <div className="inner"><h3 className="heading">Table</h3></div>
                                    </div>

                                    <div className="table-bottom">
                                        <div className="inner"><h3 className="heading">Table</h3></div>
                                        <div className="inner"><h3 className="heading">Table</h3></div>
                                        <div className="inner"><h3 className="heading">Table</h3></div>
                                        <div className="inner"><h3 className="heading">Table</h3></div>
                                    </div>
                                </div>
                            )}
                            
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
 
export default Dashboard;