import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import axios from 'axios'
import { useEffect } from "react";
import baseUrl from "../config/config.js";
import Search from "../Components/Search";
import Pagination from "../Components/Pagination";
const Account = () => {
    axios.defaults.withCredentials = true;
    const [modal,setModal] = useState(false);
    const [mobile,setMobile] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const [orders,setOrders] = useState([]);
    const token = localStorage.getItem('token');
    const [loading,setLoading] = useState(false);
    const [search,setSearch] = useState(false);
    const [address,setAddress] = useState([]);
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

    const searchToggle = () =>{
        setSearch(!search);
    };

    const email = user.email;
    useEffect(()=>{
        const grabOrders = async () =>{
            try{
                const order = await axios.get(`${baseUrl.baseUrl}/alphaapi/order/orderedUser/${email}`);
                setLoading(true);
                if(order.status === 200){
                    setLoading(false);
                    setOrders(order.data);
                }
            }
            catch(err){
                console.log(err.message);
            }
        }
        grabOrders()
    },[]);

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
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(1);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentOrders = orders.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile} searchToggle={searchToggle}/>
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

                <section className="section latest products-latest orders orders-latest">
                    <div className="wrapper">
                        <div className="boxes">
                            {currentOrders.length === 0 ? (
                                <div className="box orders-box">
                                    <h3 className="heading">NO PLACED ORDERS YET</h3>
                                </div>
                            ) : (

                                <div className="products-wrapper">
                                    {currentOrders.map((item,i)=>{
                                    return(
                                        <>
                                            <div className="products" key={i}>
                                                <div className="product-image">
                                                    <img src={item.products[0].images[0]} alt={item.products[0].images[0]} />
                                                </div>

                                                <div className="text">
                                                    <div className="column">
                                                        <h3 className="heading">Name: {item.products[0].name}</h3>
                                                    </div>

                                                    <div className="column">
                                                        <h3 className="heading">Price: ${item.products[0].price}</h3>
                                                    </div>
                                                </div>

                                                <div className="text">
                                                    <span><h3 className="heading">Quantity: {item.products[0].qty}</h3></span>
                                                    <span><h3 className="heading">Category: {item.products[0].category}</h3></span>
                                                </div>

                                                <div className="text">
                                                    <span><h3 className="heading">Subtotal: ${item.subTotal}</h3></span>
                                                    <span><h3 className="heading">Total: ${item.Total}</h3></span>
                                                </div>

                                                <div className="text">
                                                    <span><h3 className="heading">Size: {item.products[0].sizes}</h3></span>
                                                </div>   

                                                <div className="shipping-details">
                                                    <h3 className="heading">Customer Name: {item.address.name}</h3>

                                                    <h3 className="heading">Customer Email: {item.address.email}</h3>

                                                    <h3 className="heading">Customer Phone: {item.address.phone}</h3>

                                                    <h3 className="heading">Customer Id: {item.customerId}</h3>

                                                    <h3 className="heading">Delivery Status: {item.delivery_status}</h3>

                                                    <h3 className="heading">Payment Status: {item.payment_status}</h3>


                                                    <h3 className="heading">City: {item.address.address.city}</h3>

                                                    <h3 className="heading">Country: {item.address.address.country}</h3>

                                                    <h3 className="heading">Street: {item.address.address.line1}</h3>
                                                    
                                                </div>                                         
                                            </div>

                                            
                                        </>
                                    )
                                })}
                                <Pagination
                                    postsPerPage={postsPerPage}
                                    totalPosts={orders.length}
                                    paginate={paginate}
                                />
                                </div>
                                
                            )}
                            
                            {address !== null ? (
                                <div className="box address">
                                    <h3 className="heading">PRIMARY SHIPPING ADDRESS</h3>
                                    <p className="paragraph">{address.fname + ' ' + address.lname}</p>
                                    <p className="paragraph">{address.country}</p>
                                    <p className="paragraph">{address.phone}</p>
                                    <p className="paragraph">{address.addressOne}</p>
                                    <p className="paragraph">{address.country}</p>
                                    <p className="paragraph">{address.city}</p>
                                    <p className="paragraph">{address.province}</p>
                                    <p className="paragraph">{address.postalcode}</p>
                                    <Link to='/addresses'><button>{'Edit Addresses'}</button></Link>
                                </div>
                            ):(
                                <div className="box address">
                                    <h3 className="heading">PRIMARY SHIPPING ADDRESS</h3>
                                    <p className="paragraph">{user.fname + ' ' + user.lname}</p>
                                    <Link to='/addresses'><button>{'Edit Addresses'}</button></Link>
                                </div>
                            )}

                            
                        </div>
                    </div>
                </section>

                <Modal modal={modal} handleModal={handleModal} />

                <MobileNav mobile={mobile} handleMobile={handleMobile} />
                <Search search={search} searchToggle={searchToggle} />
            </main>
            <Footer />
        </>
    );
}
 
export default Account;