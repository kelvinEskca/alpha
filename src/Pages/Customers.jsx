import React, { useState,useEffect } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import axios from "axios";
import baseUrl from "../config/config.js";
import Search from "../Components/Search";
import Pagination from "../Components/Pagination";
const Customers = () => {
    axios.defaults.withCredentials = true;
    const auth = localStorage.getItem('token');
    const [customers,setCustomers] = useState([]);
    const [loading,setLoading] = useState(true);
    const [search,setSearch] = useState(false);

    useEffect(()=>{
        const getcustomers = async ()=>{
            try{
                const res = await axios.get(`${baseUrl.baseUrl}/alphaapi/users`,{headers:{token:auth}});
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
    const searchToggle = () =>{
        setSearch(!search);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentCustomers = customers.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile} searchToggle={searchToggle}/>
            <main className="main">
                <section className="section latest customers-latest">
                    <div className="wrapper">
                        <h3 className="heading">Latest Customers</h3>
                        <div className="boxes">
                            {currentCustomers === null ? (
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


                                    {currentCustomers.map((customer,i)=>{
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
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={customers.length}
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
 
export default Customers;