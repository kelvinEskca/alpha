import React,{useState} from "react";
import {Link} from 'react-router-dom';
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import AddressModal from "../Components/AddressModal";
const Account = () => {
    const [addressModal,setAddressModal] = useState(false);
    const openModal = () =>{
        setAddressModal(!addressModal);
    }
    const user = JSON.parse(localStorage.getItem('user'));
    const useraddress = JSON.parse(localStorage.getItem('address'));
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
                                <button  onClick={openModal}>Add A NEW ADDRESS</button>
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
                                    <p className="paragraph">{useraddress ? (useraddress.fname + ' ' + useraddress.lname) : (user.fname + ' ' + user.lname)}</p>
                                    {useraddress  ? (<p className="paragraph">{useraddress.country}</p>) : (<p className="paragraph">United States</p>)}
                                </div>

                                <div className="btn-row">
                                    <button onClick={openModal}>Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <AddressModal openModal={openModal} addressModal={addressModal} />
            </main>
            <Footer />
        </>
    );
}
 
export default Account;