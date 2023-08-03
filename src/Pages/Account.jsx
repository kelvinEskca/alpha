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
    },[email]);

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
    const [postsPerPage] = useState(10);

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

                <section className="section latest products-latest customers-latest">
                    <div className="wrapper">
                        <h3 className="heading">Latest Orders</h3>
                        <div className="boxes">
                            {currentOrders.length === 0 ? (
                                <div className="table">
                                    <p className="paragraph">No data</p>
                                </div>
                            ) : (
                                <div className="table">
                                    <div className="table-top">
                                        <div className="inner"><h3 className="heading">Customer Id</h3></div>
                                        <div className="inner"><h3 className="heading">Customer Name</h3></div>
                                        <div className="inner"><h3 className="heading">Customer Email</h3></div>
                                        <div className="inner"><h3 className="heading">View More</h3></div>
                                        <div className="inner"><h3 className="heading">Date</h3></div>
                                    </div>


                                    {currentOrders.map((item,i)=>{    
                                        return(
                                            <>
                                            <div className="table-bottom" key={item._id}>
                                                <div className="inner"><h3 className="heading">{item.customerId}</h3></div>
                                                <div className="inner"><h3 className="heading">{item.address.name}</h3></div>
                                                <div className="inner"><h3 className="heading">{item.address.email}</h3></div>
                                                <div className="inner"><a href={`/userorderDetails/${item._id}`}>View More</a></div>
                                                <div className="inner"><h3 className="heading">{item.createdAt}</h3></div>
                                            </div>
                                            </>
                                        )   
                                    })}

                                    
                                </div>
                            )}
                            
                        </div>

                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={orders.length}
                            paginate={paginate}
                        />
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