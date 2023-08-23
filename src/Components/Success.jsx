import React,{useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Modal from "./Modal";
import MobileNav from "./MobileNav";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import baseUrl from "../config/config";
const Success = () => {
    axios.defaults.withCredentials = true;
    const [modal,setModal] = useState(false);
    const [mobile,setMobile] = useState(false);
    const [orders, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const [location,setLocation] = useState("");


    const key = 'AIzaSyAmZ7YI2sfCyl2ALCs2rQZ5_BY0-AYGw3g';

    const address = `https://www.google.com/maps/embed/v1/place?key=${key}
    &q=${location}`
    
    const { id } = useParams();
    const handleModal = () =>{
        setModal(!modal);
    }

    const handleMobile = () =>{
        setMobile(!mobile);
    }

    const getOrders = async () => {
        try {
          const res = await axios.get(
            `${baseUrl.baseUrl}/alphaapi/order/success/${id}`
          );
          setOrder(res.data);
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
    };

    const grabLocation = () =>{
        orders.forEach((order) => {
            setLocation(order.address.address.city);
        });
    };

    useEffect(() => {
        getOrders();
        grabLocation();
    },[orders]);

    return (
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile}/>
            <main className="main successmain">
                <section className="section order-summary">
                    <div className="wrapper">
                        <div className="top-title">
                            <h3 className="heading">Velonte</h3>
                        </div>
                        <div className="boxes">
                            <div className="box">
                                <div className="map" style={{marginBottom: "1rem"}}>
                                    <iframe
                                        title="usermap"
                                        style={{width:"100%",height:"300px",border:"0"}}
                                        loading="lazy"
                                        allowfullscreen
                                        referrerpolicy="no-referrer-when-downgrade"
                                        src={address}>
                                    </iframe>
                                </div>
                                <div className="order-confirmation">
                                    <div className="order-text">
                                        <h3 className="heading">Your order is confirmed</h3>
                                        <p className="paragraph">We've accepted your order, and we are getting it ready. A confirmation email has been sent to your mail.</p>
                                    </div>
                                </div>
                                <div className="customer-info">
                                    <h3 className="heading">Customer Information</h3>

                                    <div className="info-grid">

                                        {orders.map((order,j)=>{
                                            return(
                                                
                                                <div className="grid-one">
                                                    <h3 className="heading">Shipping address</h3>
                                                    <p className="paragraph">{order.address.address.city}, {order.address.address.country}, {order.address.address.state}</p>
                                                    
                                                </div>
                                                   
                                            )
                                        })
                                        }
                                        
                                        {orders.map((order,j)=>{
                                            return(
                                                <div className="grid-one">
                                                    <h3 className="heading">Billing address</h3>
                                                    <p className="paragraph">{order.address.address.city}, {order.address.address.country}, {order.address.address.state}</p>
                                                </div>
                                            )
                                        })
                                        }

                                        <div className="grid-one">
                                            <h3 className="heading">Shipping method</h3>
                                            <p className="paragraph">USPS</p>
                                        </div>

                                        <div className="grid-one">
                                            <h3 className="heading">Payment method</h3>
                                            <p className="paragraph">Card</p>
                                        </div>
                                    </div>
                                </div>
                                <span className="help">
                                    <p className="paragraph">Need help? <Link to="/contact" style={{color:"#fff"}}>Contact Us</Link></p>

                                    <Link to="/"><button>Continue shopping</button></Link>
                                </span>
                            </div>
                            <div className="box">
                                {orders.map((order,j)=>{
                                    return(
                                        order.products.map((product,i)=>{
                                            return(
                                                <div className="top" key={i}>
                                                    <div className="image-box">
                                                        <div className="boxed-image">
                                                            <img src={product.images[0]} alt={product.name} />
                                                        </div>
                                                        <div className="image-text">
                                                            <h3 className="heading">{product.name}</h3>
                                                            <p className="paragraph">{product.sizes}</p>
                                                        </div>
                                                    </div>
        
                                                    <p className="paragraph">$ {product.price}</p>
                                                </div>
                                            )
                                        })
                                    )
                                })
                                }
                                
                                <div className="center">
                                    <span><small>Subtotal</small> <b>$ {orders.map((order,j)=>{
                                        return(order.subTotal)
                                    })}</b></span>
                                    <span><small>Shipping</small> <b>Free</b></span>
                                    <span><small>Taxes</small> <b>Free</b></span>
                                </div>
                                <div className="bottom">
                                    <h3 className="heading">Total</h3>
                                    <span><small></small><b>$ {orders.map((order,j)=>{
                                        return(order.Total)
                                    })}</b></span>
                                </div>
                            </div>
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
 
export default Success;