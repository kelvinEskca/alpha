import React, { useState,useEffect } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import axios from "axios";
import HeroModal from "../Components/HeroModal";
//import FooterModal from "../Components/FooterModal";
import CardModal from "../Components/CardModal";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import AlertModal from "../Components/AlertModal";
import baseUrl from "../config/config.js";
import { useNavigate } from "react-router-dom";
import Search from "../Components/Search";
import Pagination from "../Components/Pagination";
const Settings = () => {
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem('token');
    const [cards,setCards] = useState([]);
    const [hero,setHero] = useState([]);
    const [loading,setLoading] = useState(true);
    const [heroModal,setHeroModal] = useState(false);
    const [cardModal,setCardModal] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [alertText,setAlertText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [search,setSearch] = useState(false);


    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentHero = hero.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const navigate = useNavigate();

    const openModal = () =>{
        setHeroModal(!heroModal);
    }

    const openCard = () => {
        setCardModal(!cardModal);
    }

    useEffect(()=>{
        const getCards = async ()=>{
            try{
                const res = await axios.get(`${baseUrl.baseUrl}/alphaapi/card`)
                setCards(res.data);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getCards();

        const getHero = async ()=>{
            try{
                const res = await axios.get(`${baseUrl.baseUrl}/alphaapi/hero`)
                setHero(res.data);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getHero();
    },[]);

    const handleDelete = async (i) =>{
        const id = i._id;
        setIsSubmitting(true);
        try{
            const res = await axios.post(`${baseUrl.baseUrl}/alphaapi/card/delete/${id}`,{
                id:id
            },{ headers:{token:token} });
            if(res.status === 200){
                setIsSuccessModalOpen(true);
                setAlertText("Card Deleted Successfully!");
                setIsSubmitting(false);
                setTimeout(() => {
                    setIsSuccessModalOpen(false);
                  }, 5000);
                setCards(cards.filter(card => card._id !== id));
            }
            else{
                setIsSuccessModalOpen(true);
                setAlertText("Card Not Deleted Successfully!");
                setIsSubmitting(false);
                setTimeout(() => {
                    setIsSuccessModalOpen(false);
                }, 5000);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const handleShow = async (i) =>{
        const id = i._id;
        setIsSubmitting(true);
        try{
            const res = await axios.post(`${baseUrl.baseUrl}/alphaapi/card/edit/${id}`,{
                active:true
            },{ headers:{token:token} });
            if(res.status === 200){
                const newProduct = res.data;
                setCards([...cards, newProduct]);
                setIsSuccessModalOpen(true);
                setTimeout(() => {
                    setIsSuccessModalOpen(false);
                  }, 5000);
                setAlertText("Card Toggle Successful!");
                setIsSubmitting(false);
            }
            else{
                setIsSuccessModalOpen(true);
                setAlertText("Card Toggle Failed!");
                setIsSubmitting(false);
                setTimeout(() => {
                    setIsSuccessModalOpen(false);
                  }, 5000);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const handleDeleteHero = async (i) =>{
        const id = i._id;
        setIsSubmitting(true);
        try{
            const res = await axios.post(`${baseUrl.baseUrl}/alphaapi/hero/delete/${id}`,{
                id:id
            },{ headers:{token:token} });
            if(res.status === 200){
                setIsSuccessModalOpen(true);
                setAlertText("Card Deleted Successfully!");
                setIsSubmitting(false);
                setHero(hero.filter(item => item._id !== id));
                setTimeout(() => {
                    setIsSuccessModalOpen(false);
                  }, 5000);
            }
            else{
                setIsSuccessModalOpen(true);
                setAlertText("Card Not Deleted Successfully!");
                setIsSubmitting(false);
                setTimeout(() => {
                    setIsSuccessModalOpen(false);
                  }, 5000);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const handleShowHero = async (i) =>{
        const id = i._id;
        setIsSubmitting(true);
        try{
            const res = await axios.post(`${baseUrl.baseUrl}/alphaapi/hero/edit/${id}`,{
                active:true
            },{ headers:{token:token} });
            if(res.status === 200){
                const newProduct = res.data;
                setHero(prevHero => {
                    const updatedHero = prevHero.map(item => {
                      if (item._id === id) {
                        return newProduct;
                      }
                      return item;
                    });
                    return updatedHero;
                });
                setIsSuccessModalOpen(true);
                setAlertText("Hero Toggled Successfully!");
                setIsSubmitting(false);
                setTimeout(() => {
                    setIsSuccessModalOpen(false);
                  }, 5000);
                  navigate('/settings');
            }
            else{
                setIsSuccessModalOpen(true);
                setAlertText("Hero Toggle Failed!");
                setIsSubmitting(true);
                setTimeout(() => {
                    setIsSuccessModalOpen(false);
                  }, 5000);
            }
        }
        catch(err){
            console.log(err);
        }
    }

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
    return (
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile} searchToggle={searchToggle}/>
            <main className="main">
                <section className="section latest cards-latest">
                    <div className="wrapper">
                        <div className="top">
                            <h3 className="heading">Hero Settings</h3>
                            <button onClick={openModal}>Add Banner +</button>
                        </div>
                         
                        <div className="boxes">
                            {currentHero && currentHero.length === 0 ? (
                                <div className="table">
                                    <p className="paragraph">No data</p>
                                </div>
                            ) : (
                                currentHero.map((item,i)=>{
                                    return(
                                        
                                        <div className="cards" key={i}>
                                           
                                            <div className="product-image">
                                                <img src={`${item.image[0] && item.image[0].url}`} alt={item.image[0]} />
                                            </div>
                                            
                                            <div className="text">
                                                <div className="column">
                                                    <h3 className="heading">Display Section:</h3>
                                                    <h3 className="heading">{item.category} Section</h3>
                                                </div>

                                                <div className="column">
                                                    <h3 className="heading">Title:</h3>
                                                    <h3 className="heading">{item.title}</h3>
                                                </div>

                                                <div className="column">
                                                    <h3 className="heading">Subtitle:</h3>
                                                    <h3 className="heading">{item.subtitle}</h3>
                                                </div>

                                                <div className="column">
                                                    <h3 className="heading">CTA:</h3>
                                                    <h3 className="heading">{item.cta}</h3>
                                                </div>

                                                <div className="column">
                                                    <h3 className="heading">Link:</h3>
                                                    <h3 className="heading">{item.link}</h3>
                                                </div>

                                                <div className="column">
                                                    <h3 className="heading">Visibility:</h3>
                                                    <h3 className="heading">{item.active ? "Active" : "Inactive"}</h3>
                                                </div>
                                            </div>

                                            {item.active ? (
                                                <button onClick={()=>handleDeleteHero(item)}>{isSubmitting ? 'Deleting..' : 'Delete Card'}</button>
                                            ) : (
                                                <>
                                                    <button type="button" onClick={()=>handleDeleteHero(item)}>{isSubmitting ? 'Deleting..' : 'Delete Card'}</button>
                                                    <button type="button" onClick={()=>handleShowHero(item)} style={{backgroundColor:'#fefefe', color:"#000"}}>{isSubmitting ? 'Processing..' : 'Show Card'}</button>
                                                </>
                                            )}

                                            
                                            
                                        </div>
                                        
                                    )
                                })
                            )}
                            
                        </div>
                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={hero.length}
                            paginate={paginate}
                        />
                    </div>

                    {/* <div className="wrapper">
                        <div className="top">
                            <h3 className="heading">Footer Settings</h3>
                            <button onClick={openFooterCard}>Add Banner +</button>
                        </div>
                         
                        <div className="boxes">
                            {footer && footer.length === 0 ? (
                                <div className="table">
                                    <p className="paragraph">No data</p>
                                </div>
                            ) : (
                                footer.map((item,i)=>{
                                    return(
                                        
                                        <div className="cards" key={i}>
                                            <Link to={`/details/${item._id}`}>
                                                <div className="product-image">
                                                    <img src={`${item.video[0].url}`} alt={item.video[0]} />
                                                </div>
                                            </Link>

                                            <div className="text">
                                                <div className="column">
                                                    <h3 className="heading">Title:</h3>
                                                    <h3 className="heading">{item.title}</h3>
                                                </div>

                                                <div className="column">
                                                    <h3 className="heading">Subtitle:</h3>
                                                    <h3 className="heading">{item.subtitle}</h3>
                                                </div>
                                            </div>

                                            <button onClick={()=>handleDeleteFooter(item)}>Delete Footer</button>
                                            <button onClick={()=>handleShowFooter(item)}>Show/Hide Footer</button>
                                        </div>
                                        
                                    )
                                })
                            )}
                            
                        </div>
                    </div> */}

                    <div className="wrapper">
                        <div className="top">
                            <h3 className="heading">Card Settings</h3>
                            <button onClick={openCard}>Add Banner +</button>
                        </div>
                         
                        <div className="boxes">
                            {cards && cards.length === 0 ? (
                                <div className="table">
                                    <p className="paragraph">No data</p>
                                </div>
                            ) : (
                                cards.map((item,i)=>{
                                    return(
                                        
                                        <div className="cards" key={i}>
                                        
                                            <div className="product-image">
                                                <img src={`${item.image[0].url}`} alt={item.image[0]} />
                                            </div>
                                            
                                            <div className="text">
                                                <div className="column">
                                                    <h3 className="heading">Title:</h3>
                                                    <h3 className="heading">{item.title}</h3>
                                                </div>

                                                <div className="column">
                                                    <h3 className="heading">Subtitle:</h3>
                                                    <h3 className="heading">{item.subtitle}</h3>
                                                </div>

                                                <div className="column">
                                                    <h3 className="heading">CTA:</h3>
                                                    <h3 className="heading">{item.cta}</h3>
                                                </div>

                                                <div className="column">
                                                    <h3 className="heading">Visibility:</h3>
                                                    <h3 className="heading">{item.active ? "Active" : "Inactive"}</h3>
                                                </div>
                                            </div>

                                            {item.active ? (
                                                <button onClick={()=>handleDelete(item)}>Delete Card</button>
                                            ) : (
                                                <>
                                                    <button onClick={()=>handleDelete(item)}>Delete Card</button>
                                                    <button onClick={()=>handleShow(item)}>Show Card</button>
                                                </>
                                            )}
                                        </div>
                                        
                                    )
                                })
                            )}
                            
                        </div>
                    </div>
                </section>

                <HeroModal openModal={openModal} heroModal={heroModal} hero={hero} setHero={setHero} />
                {/* <FooterModal openFooterCard={openFooterCard} footerModal={footerModal} /> */}
                <CardModal openCard={openCard} cardModal={cardModal} cards={cards} setCards={setCards} />
                <Modal modal={modal} handleModal={handleModal} />
                <MobileNav mobile={mobile} handleMobile={handleMobile} />
                <AlertModal isOpen={isSuccessModalOpen} alertText={alertText} onClose={() => setIsSuccessModalOpen(false)} />
                <Search search={search} searchToggle={searchToggle} />
            </main>
            <Footer />
        </>
    );
}
 
export default Settings;