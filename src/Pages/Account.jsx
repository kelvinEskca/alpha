import React from "react";
import { Link,useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import axios from 'axios'
const Account = () => {
    axios.defaults.withCredentials = true;
    const user = JSON.parse(localStorage.getItem('user'));
    const useraddress = JSON.parse(localStorage.getItem('address'));
    const navigate = useNavigate();
    const logout = () => {
        if(user){
            localStorage.removeItem(user);
            navigate('/login');
        }
        else{
            alert('User not logged in!!');
        }
    } 
    return (
        <>
            <Header />
            <main className="main">
                <section className="section welcome">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">Welcome Back, {user.fname}</h3>
                                <Link to='/login'><button onClick={logout}>Log Out</button></Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section orders">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box orders-box">
                                <h3 className="heading">NO PLACED ORDERS YET</h3>
                            </div>

                            <div className="box address">
                                <h3 className="heading">PRIMARY ADDRESS</h3>
                                <p className="paragraph">{useraddress ? (useraddress.fname + ' ' + useraddress.lname) : (user.fname + ' ' + user.lname)}</p>
                                {useraddress  ? (<p className="paragraph">{useraddress.country}</p>) : (<p className="paragraph">United States</p>)}
                                <Link to='/addresses'><Button btnText={'Edit Addresses'}/></Link>
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