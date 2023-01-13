import React, { useState } from "react";
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Input from "../Components/Input";
const Dashboard = () => {
    const [orders,setOrders] = useState(null);
    return (
        <>
            <Header />
            <main className="main">
                <section className="section latest">
                    <div className="wrapper">
                        <h3 className="heading">Latest Orders</h3>
                        <Input placeholder={'Search...'} type={'search'} />
                        <div className="btn-row">
                            <Button btnText={'Import'} />
                            <Button btnText={'Export'} />
                        </div>
                        <div className="boxes">
                            {orders === null ? (
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