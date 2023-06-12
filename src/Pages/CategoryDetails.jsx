import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import axios from "axios";
import baseUrl from "../config/config.js";
import Search from "../Components/Search";
const CategoryDetails = () => {
  axios.defaults.withCredentials = true;
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [search,setSearch] = useState(false);
 
 
  const { id } = useParams();
  useEffect(() => {
    const getproducts = async () => {
      try {
        const res = await axios.get(
          `${baseUrl.baseUrl}/alphaapi/category/${id}`
        );
        setCategory([res.data]);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getproducts();
    }, [id]);

    console.log(category);

    const handleModal = () =>{
        setModal(!modal);
    }
    const handleMobile = () =>{
        setMobile(!mobile);
    }
    const searchToggle = () =>{
        setSearch(!search);
    };

  return(
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile} searchToggle={searchToggle}/>
            <main className="main">
                <section className="section latest dash-latest">
                    <div className="wrapper">
                        <h3 className="heading">Categories And Subcategories</h3>
                        <div className="boxes">
                            {category.length === 0 ? (
                                <div className="table">
                                    <p className="paragraph">No data</p>
                                </div>
                            ) : (
                                <div className="table">
                                    <div className="table-top">
                                        <div className="inner"><h3 className="heading">Category</h3></div>
                                        <div className="inner"><h3 className="heading">Subcategory</h3></div>
                                        <div className="inner"><h3 className="heading">Description</h3></div>
                                        <div className="inner"><h3 className="heading">Date</h3></div>
                                    </div>


                                    {category.map((customer,i)=>{
                                        return(
                                            customer.subcategories.map((sub,j)=>{
                                                  return(
                                                    <div className="table-bottom" key={customer._id}>
                                                        <div className="inner"><h3 className="heading">{customer.name}</h3></div>
                                                        
                                                        <div className="inner"><h3 className="heading">{sub.subcategoryname}</h3></div>
                                                        <div className="inner"><h3 className="heading">{sub.description}</h3></div>
                                                        <div className="inner"><h3 className="heading">{customer.createdAt}</h3></div>
                                                    </div>
                                                  )  
                                            })
                                            
                                        )
                                    })}

                                    
                                </div>
                            )}
                            
                        </div>
                    </div>
                </section>
                <MobileNav mobile={mobile} handleMobile={handleMobile} />
                <Search search={search} searchToggle={searchToggle} />
            </main>
            <Footer />
        </>
  )

}
export default CategoryDetails;