import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import baseUrl from "../config/config.js";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import axios from "axios";
const OrderDetails = () => {
    const { id } = useParams();
    axios.defaults.withCredentials = true;
    const [orders,setOrders] = useState([]);
    const auth = localStorage.getItem('token');
    const [loading,setLoading] = useState(true);

    const [modal,setModal] = useState(false);
    const [mobile,setMobile] = useState(false);

    const handleModal = () =>{
        setModal(!modal);
    }
    const handleMobile = () =>{
        setMobile(!mobile);
    }
    useEffect(()=>{
        const getOrders = async ()=>{
            try{
                const res = await axios.get(`${baseUrl.baseUrl}/alphaapi/order/${id}`,{headers:{token:auth}});
                setOrders(res.data);
                setLoading(false);
                console.log(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        getOrders();
    },[auth,id]);
    return (
        <>
        <Header handleModal={handleModal} handleMobile={handleMobile}/>
        <main className="main">
            <section className="section latest products-latest customers-latest">
                <div className="wrapper">
                    <h3 className="heading">Your Orders</h3>
                    <div className="boxes">
                        {orders.length === 0 ? (
                            <div className="table">
                                <p className="paragraph">No data</p>
                            </div>
                        ) : (
                            <div className="table">
                                <div className="table-top">
                                    <div className="inner"><h3 className="heading">Customer Id</h3></div>
                                    <div className="inner"><h3 className="heading">Customer Name</h3></div>
                                    <div className="inner"><h3 className="heading">Customer Email</h3></div>
                                    <div className="inner"><h3 className="heading">Product Name</h3></div>
                                    <div className="inner"><h3 className="heading">Product Image</h3></div>
                                    <div className="inner"><h3 className="heading">Product Amount</h3></div>
                                    <div className="inner"><h3 className="heading">Product Qty</h3></div>
                                    <div className="inner"><h3 className="heading">Date</h3></div>
                                </div>


                                {orders.map((item,i)=>{
                                    return(
                                        
                                            item.products.map((pro,k)=>{
                                                return(
                                                    <>
                                                    <div className="table-bottom" key={item._id}>
                                                        <div className="inner" style={{height:"150px"}}><h3 className="heading">{item.customerId}</h3></div>
                                                        <div className="inner" style={{height:"150px"}}><h3 className="heading">{item.address.name}</h3></div>
                                                        <div className="inner" style={{height:"150px"}}><h3 className="heading">{item.address.email}</h3></div>
                                                        <div className="inner" style={{height:"150px"}}><h3 className="heading">{pro.name}</h3></div>
                                                        {pro.images.map((img,l)=>{
                                                            return(
                                                                <div className="inner image-inner" style={{height:"150px"}}><img src={img} alt={pro.name}/></div>
                                                            )
                                                        })}
                                                       
                                                        <div className="inner" style={{height:"150px"}}><h3 className="heading">${pro.price}</h3></div>
                                                        <div className="inner" style={{height:"150px"}}><h3 className="heading">{pro.qty}</h3></div>
                                                        <div className="inner" style={{height:"150px"}}><h3 className="heading">{item.createdAt}</h3></div>
                                                    </div>
                                                    </>
                                                )   
                                            })   
                                    )
                                })}

                                
                            </div>
                        )}
                        
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
 
export default OrderDetails;