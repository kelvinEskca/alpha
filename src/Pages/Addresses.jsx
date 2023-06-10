import React,{useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import AddressModal from "../Components/AddressModal";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import Search from "../Components/Search";
import AlertModal from "../Components/AlertModal";
import baseUrl from "../config/config.js";
import axios from "axios";
const Account = () => {
    const [addressModal,setAddressModal] = useState(false);
    const openModal = () =>{
        setAddressModal(!addressModal);
    }
    const user = JSON.parse(localStorage.getItem('user'));
    const [modal,setModal] = useState(false);
    const [mobile,setMobile] = useState(false);
    const [search,setSearch] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [alertText,setAlertText] = useState('');
    const [loading,setLoading] = useState(false);
    const token = localStorage.getItem('token');
    const [address,setAddress] = useState([]);
    const handleModal = () =>{
        setModal(!modal);
    }

    const handleMobile = () =>{
        setMobile(!mobile);
    }

    const searchToggle = () =>{
        setSearch(!search);
    };

    
    const getaddress = async ()=>{
        const id = user._id;
        try{
            const res = await axios.get(`${baseUrl.baseUrl}/alphaapi/address/${id}`,{headers:{token:token}})
            setAddress(res.data);
            setLoading(false);
        }
        catch(err){
            console.log(err);
        }
    }
    
    useEffect(()=>{
        getaddress();
    },[])

    return (
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile} searchToggle={searchToggle}/>
            <main className="main">
                <section className="section welcome">
                    <div className="wrapper">
                        <div className="boxes">
                            <Link to='/account'><Button btnText={' < Back To Account'}/></Link>
                            <div className="box">
                                <h3 className="heading">MY SHIPPING ADDRESSES</h3>
                                <button  onClick={openModal}>Add A NEW SHIPPING ADDRESS</button>
                            </div>
                        </div>
                    </div>
                </section>

                {address !== null ? (
                    <section className="section orders default">
                        <div className="wrapper">
                            <div className="boxes">
                                <div className="box">
                                    <div className="text">
                                        <h3 className="heading">Default Shipping Address</h3>
                                        <p className="paragraph">{address.fname + ' ' + address.lname}</p>
                                        <p className="paragraph">{address.phone}</p>
                                        <p className="paragraph">{address.addressOne}</p>
                                        <p className="paragraph">{address.country}</p>
                                        <p className="paragraph">{address.city}</p>
                                        <p className="paragraph">{address.province}</p>
                                        <p className="paragraph">{address.postalcode}</p>
                                    </div>

                                    <div className="btn-row">
                                        <button onClick={openModal}>Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className="section orders default">
                        <div className="wrapper">
                            <div className="boxes">
                                <div className="box">
                                    <div className="text">
                                        <h3 className="heading">Default Shipping Address</h3>
                                        <p className="paragraph">{user.fname + ' ' + user.lname}</p>
                                        {<p className="paragraph">United States</p>}
                                    </div>

                                    <div className="btn-row">
                                        <button onClick={openModal}>Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                

                <AddressModal openModal={openModal} addressModal={addressModal} setAlertText={setAlertText} setIsSuccessModalOpen={setIsSuccessModalOpen} />

                <Modal modal={modal} handleModal={handleModal} />

                <MobileNav mobile={mobile} handleMobile={handleMobile} />
                <Search search={search} searchToggle={searchToggle} />
                <AlertModal isOpen={isSuccessModalOpen} alertText={alertText} onClose={() => setIsSuccessModalOpen(false)} />
            </main>
            <Footer />
        </>
    );
}
 
export default Account;