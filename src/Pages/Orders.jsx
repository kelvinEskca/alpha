import React, { useState,useEffect } from "react";
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Input from "../Components/Input";
import axios from "axios";
const Dashboard = () => {
    axios.defaults.withCredentials = true;
    const [orders,setOrders] = useState(null);
    const auth = localStorage.getItem('token');
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const getOrders = async ()=>{
            try{
                const res = await axios.get('https://alphaapi-production.up.railway.app/alphaapi/order/',{headers:{token:auth}});
                setOrders(res.data);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getOrders();
    },[auth]);

    if(loading) return <h1>Loading</h1>;
    return (
        <>
            <Header />
            <main className="main">
                <section className="section latest products-latest">
                    <div className="wrapper">
                        <h3 className="heading">Latest Orders</h3>
                        <Input placeholder={'Search...'} type={'search'} />
                        <div className="btn-row">
                            <Button btnText={'Import'} />
                            <Button btnText={'Export'} />
                        </div>
                        <div className="boxes">
                            {orders.length === 0 ? (
                                <div className="table">
                                    <p className="paragraph">No data</p>
                                </div>
                            ) : (
                                orders.map((item)=>{
                                    return(
                                        <div className="products" key={item.id}>
                                            <div className="product-image">
                                                <img src="../images/WhiteCapitolCropHoodie3_400x.jpg" alt="WhiteCapitolCropHoodie3_400x" />
                                            </div>

                                            <div className="text">
                                                <div className="column">
                                                    <h3 className="heading">Name</h3>
                                                    <h3 className="heading">{item.title}</h3>
                                                </div>

                                                <div className="column">
                                                    <h3 className="heading">Price</h3>
                                                    <h3 className="heading">${item.price}</h3>
                                                </div>
                                            </div>

                                            <div className="text">
                                                <span><h3 className="heading">Quantity:{item.quantity}</h3></span>
                                                <span><h3 className="heading">Category:{item.category[0]}</h3></span>
                                            </div>
                                        </div>
                                    )
                                })
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