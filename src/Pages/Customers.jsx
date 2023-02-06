import React, { useState,useEffect } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import axios from "axios";
import Loader from "../Components/Loader";
const Customers = () => {
    axios.defaults.withCredentials = true;
    const auth = localStorage.getItem('token');
    const [customers,setCustomers] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const getcustomers = async ()=>{
            try{
                const res = await axios.get('https://alphaapi-production.up.railway.app/alphaapi/users',{headers:{token:auth}});
                setCustomers(res.data);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getcustomers();
    },[auth]);

    const [modal,setModal] = useState(false);
    const [mobile,setMobile] = useState(false);
    const handleModal = () =>{
        setModal(!modal);
    }
    const handleMobile = () =>{
        setMobile(!mobile);
    }

    if(loading) return <Loader />;
    return (
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile}/>
            <main className="main">
                <section className="section latest customers-latest">
                    <div className="wrapper">
                        <h3 className="heading">Latest Customers</h3>
                        <div className="boxes">
                            {customers === null ? (
                                <div className="table">
                                    <p className="paragraph">No data</p>
                                </div>
                            ) : (
                                <div className="table">
                                    <div className="table-top">
                                        <div className="inner"><h3 className="heading">First Name</h3></div>
                                        <div className="inner"><h3 className="heading">Last Name</h3></div>
                                        <div className="inner"><h3 className="heading">Email</h3></div>
                                        <div className="inner"><h3 className="heading">Date</h3></div>
                                    </div>


                                    {customers.map((customer,i)=>{
                                        return(
                                            <div className="table-bottom" key={customer._id}>
                                                <div className="inner"><h3 className="heading">{customer.fname}</h3></div>
                                                <div className="inner"><h3 className="heading">{customer.lname}</h3></div>
                                                <div className="inner"><h3 className="heading">{customer.email}</h3></div>
                                                <div className="inner"><h3 className="heading">{customer.createdAt}</h3></div>
                                            </div>
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
 
export default Customers;