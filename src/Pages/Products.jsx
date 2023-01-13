import React, { useState } from "react";
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Input from "../Components/Input";
const Dashboard = () => {
    const [products,setProducts] = useState(null);
    return (
        <>
            <Header />
            <main className="main">
                <section className="section latest products-latest">
                    <div className="wrapper">
                        <div className="top">
                            <h3 className="heading">Available Products</h3>
                            <Button btnText={'Add Products'} />
                        </div>
                         
                        <div className="boxes">
                            {products === null ? (
                                <div className="table">
                                    <p className="paragraph">No data</p>
                                </div>
                            ) : (
                                <div className="products">
                                    <div className="product-image">
                                        <img src="../images/WhiteCapitolCropHoodie3_400x.jpg" alt="WhiteCapitolCropHoodie3_400x" />
                                    </div>

                                    <div className="text">
                                        <div className="column">
                                            <h3 className="heading">Name</h3>
                                            <h3 className="heading">Name</h3>
                                        </div>

                                        <div className="column">
                                            <h3 className="heading">Price</h3>
                                        </div>
                                    </div>

                                    <div className="text">
                                        <span><h3 className="heading">Quantity:</h3></span>
                                        <span><h3 className="heading">Category:</h3></span>
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