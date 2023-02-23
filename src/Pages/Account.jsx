import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import axios from 'axios'
import { useEffect } from "react";
import Loader from "../Components/Loader";
const Account = () => {
    axios.defaults.withCredentials = true;
    const [modal,setModal] = useState(false);
    const [mobile,setMobile] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const useraddress = JSON.parse(localStorage.getItem('address'));
    const [orders,setOrders] = useState([]);
    const token = localStorage.getItem('token');
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const logout = () => {
        if(user){
            localStorage.removeItem("user");
            navigate('/login');
        }
        else{
            alert('User not logged in!!');
        }
    } 
    const handleModal = () =>{
        setModal(!modal);
    }

    const handleMobile = () =>{
        setMobile(!mobile);
    }

    useEffect(()=>{
        const id = user._id;
        const grabOrders = async () =>{
            try{
                const order = await axios.get(`http://localhost:5000/alphaapi/order/${id}`,{headers:{token:token}});
                setLoading(true);
                if(order.status === 200){
                    setLoading(false);
                    setOrders(order.data);
                }
            }
            catch(err){
                console.log(err);
            }
        }
        grabOrders()
    },[token,user]);
    if(loading) return <Loader />;
    return (
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile}/>
            <main className="main">
                <section className="section welcome">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">Welcome Back, {user.fname}</h3>
                                <button onClick={logout}>Log Out</button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section latest products-latest orders">
                    <div className="wrapper">
                        <div className="boxes">
                            {orders.length === 0 ? (
                                <div className="box orders-box">
                                    <h3 className="heading">NO PLACED ORDERS YET</h3>
                                </div>
                            ) : (

                                <div className="products-wrapper">
                                    {orders.map((item,i)=>{
                                    return(
                                        <>
                                            <div className="products" key={i}>
                                                <div className="product-image">
                                                    <img src={`../images/${item.products[0].images[0]}`} alt={item.products[0].images[0]} />
                                                </div>

                                                <div className="text">
                                                    <div className="column">
                                                        <h3 className="heading">Name:</h3>
                                                        <h3 className="heading">{item.products[0].name}</h3>
                                                    </div>

                                                    <div className="column">
                                                        <h3 className="heading">Price:</h3>
                                                        <h3 className="heading">${item.products[0].price}</h3>
                                                    </div>
                                                </div>

                                                <div className="text">
                                                    <span><h3 className="heading">Quantity:{item.products[0].qty}</h3></span>
                                                    <span><h3 className="heading">Category:{item.products[0].category}</h3></span>
                                                </div>

                                                <div className="text">
                                                    <span><h3 className="heading">Subtotal:${item.subTotal}</h3></span>
                                                    <span><h3 className="heading">Total:${item.Total}</h3></span>
                                                </div>

                                                <div className="text">
                                                    <span><h3 className="heading">Size:{item.products[0].sizes}</h3></span>
                                                </div>   

                                                <div className="shipping-details">
                                                    <h3 className="heading">Customer Name:{item.address.name}</h3>

                                                    <h3 className="heading">Customer Email:{item.address.email}</h3>

                                                    <h3 className="heading">Customer Phone:{item.address.phone}</h3>

                                                    <h3 className="heading">Customer Id:{item.customerId}</h3>

                                                    <h3 className="heading">Delivery Status:{item.delivery_status}</h3>

                                                    <h3 className="heading">Payment Status:{item.payment_status}</h3>


                                                    <h3 className="heading">City:{item.address.address.city}</h3>

                                                    <h3 className="heading">Country:{item.address.address.country}</h3>

                                                    <h3 className="heading">Street:{item.address.address.line1}</h3>
                                                    
                                                </div>                                         
                                            </div>

                                            
                                        </>
                                    )
                                })}
                                </div>
                                
                            )}
                            

                            <div className="box address">
                                <h3 className="heading">PRIMARY ADDRESS</h3>
                                <p className="paragraph">{useraddress ? (useraddress.fname + ' ' + useraddress.lname) : (user.fname + ' ' + user.lname)}</p>
                                {useraddress  ? (<p className="paragraph">{useraddress.country}</p>) : (<p className="paragraph">United States</p>)}
                                <Link to='/addresses'><Button btnText={'Edit Addresses'}/></Link>
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
 
export default Account;