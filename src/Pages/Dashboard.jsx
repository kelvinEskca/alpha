import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import axios from "axios";
import { useEffect } from "react";
import Loader from "../Components/Loader";
const Dashboard = () => {
    axios.defaults.withCredentials = true;
    const auth = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const [users,setUsers] = useState([]);
    const [customers,setCustomers] = useState([]);
    const [products,setProducts] = useState([]);
    const [orders,setOrders] = useState([]);
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();
    const logout = () => {
        if(user){
            localStorage.removeItem("user");
            navigate('/admin');
        }
        else{
            alert('User not logged in!!');
        }
    } 

    useEffect(()=>{
        const getusers = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/alphaapi/users/stats',{headers:{token:auth}});
                setUsers(res.data.users);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getusers();

        const getcustomers = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/alphaapi/users/',{headers:{token:auth}});
                console.log(res.data)
                setCustomers(res.data);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getcustomers();

        const getproducts = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/alphaapi/users/stats',{headers:{token:auth}});
                setProducts(res.data.products);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getproducts();

        const getorders = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/alphaapi/users/stats',{headers:{token:auth}});
                setOrders(res.data.orders);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getorders();
    },[auth])

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

                <section className="section orders default dash-default">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <div className="text">
                                    <h3 className="heading">Customers</h3>
                                    <p className="paragraph">{users}</p>
                                    <p className="paragraph">Date</p>
                                </div>

                                <img src="../images/icons8-people-30.png" alt="icons8-people-30" />
                            </div>

                            <div className="box">
                                <div className="text">
                                    <h3 className="heading">Products</h3>
                                    <p className="paragraph">{products}</p>
                                    <p className="paragraph">Date</p>
                                </div>

                                <img src="../images/icons8-fast-moving-consumer-goods-30.png" alt="icons8-fast-moving-consumer-goods-30" />
                            </div>

                            <div className="box">
                                <div className="text">
                                    <h3 className="heading">Orders</h3>
                                    <p className="paragraph">{orders}</p>
                                    <p className="paragraph">Date</p>
                                </div>

                                <img src="../images/icons8-shopping-cart-30.png" alt="icons8-shopping-cart-30" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section latest dash-latest">
                    <div className="wrapper">
                        <h3 className="heading">Latest Customers</h3>
                        <div className="boxes">
                            {customers.length === 0 ? (
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
 
export default Dashboard;