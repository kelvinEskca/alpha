import React, { useState,useEffect } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import axios from "axios";
import baseUrl from "../config/config.js";
import Pagination from "../Components/Pagination";
import AlertModal from "../Components/AlertModal";
const Dashboard = () => {
    axios.defaults.withCredentials = true;
    const [orders,setOrders] = useState([]);
    const auth = localStorage.getItem('token');
    const [loading,setLoading] = useState(true);
    const [deletingId,setDeletingId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [alertText,setAlertText] = useState('');

    useEffect(()=>{
        const getOrders = async ()=>{
            try{
                const res = await axios.get(`${baseUrl.baseUrl}/alphaapi/order/`,{headers:{token:auth}});
                setOrders(res.data);
                setLoading(false);
                console.log(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        getOrders();
    },[auth]);

    const [modal,setModal] = useState(false);
    const [mobile,setMobile] = useState(false);
    const handleModal = () =>{
        setModal(!modal);
    }
    const handleMobile = () =>{
        setMobile(!mobile);
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(4);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentOrders = orders.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleDelete = async (i) =>{
        const id = i._id;
        setDeletingId(id); 
        setIsSubmitting(true);
        try{
            const res = await axios.delete(`${baseUrl.baseUrl}/alphaapi/order/${id}`,{ headers:{token:auth} });
            if(res.status === 200){
                setIsSuccessModalOpen(true);
                setAlertText("Order Deleted Successfully!");
                setOrders(orders.filter(order => order._id !== id));
                setTimeout(() => {
                    setIsSuccessModalOpen(false);
                }, 5000);
                setIsSubmitting(false);
            }
            else{
                setIsSuccessModalOpen(true);
                setAlertText("Error Deleting Order!");
                setTimeout(() => {
                    setIsSuccessModalOpen(false);
                }, 5000);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile}/>
            <main className="main">
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
                                        <div className="inner"><h3 className="heading">Delete</h3></div>
                                        <div className="inner"><h3 className="heading">Date</h3></div>
                                    </div>


                                    {currentOrders.map((item,i)=>{    
                                        return(
                                            <>
                                            <div className="table-bottom" key={item._id}>
                                                <div className="inner"><h3 className="heading">{item.customerId}</h3></div>
                                                <div className="inner"><h3 className="heading">{item.address.name}</h3></div>
                                                <div className="inner"><h3 className="heading">{item.address.email}</h3></div>
                                                <div className="inner"><a href={`/orderDetails/${item._id}`}>View More</a></div>
                                                <div className="inner"><button style={{backgroundColor:"#730606", color:"#fff", width:"7rem"}} onClick={()=>handleDelete(item)}>{deletingId === item._id ? (isSubmitting ? 'Deleting..' : 'Delete Order') : 'Delete Order'}</button></div>
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
                <AlertModal isOpen={isSuccessModalOpen} alertText={alertText} onClose={() => setIsSuccessModalOpen(false)} />
            </main>
            <Footer />
        </>
    );
}
 
export default Dashboard;