import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import axios from "axios";
import HeroModal from "../Components/HeroModal";
import FooterModal from "../Components/FooterModal";
import CardModal from "../Components/CardModal";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import Loader from "../Components/Loader";
const Settings = () => {
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem('token');
    const [cards,setCards] = useState([]);
    const [hero,setHero] = useState([]);
    const [footer,setFooter] = useState([]);
    const [loading,setLoading] = useState(true);
    const [heroModal,setHeroModal] = useState(false);
    const [footerModal,setFooterModal] = useState(false);
    const [cardModal,setCardModal] = useState(false);
    
    const navigate = useNavigate();

    const openModal = () =>{
        setHeroModal(!heroModal);
    }

    const openCard = () => {
        setCardModal(!cardModal);
    }

    const openFooterCard = () => {
        setFooterModal(!footerModal);
    }

    useEffect(()=>{
        const getCards = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/alphaapi/card')
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
                const res = await axios.get('http://localhost:5000/alphaapi/hero')
                setHero(res.data);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getHero();

        const getFooter = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/alphaapi/footer')
                setFooter(res.data);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getFooter();
    },[]);

    const handleDelete = async (i) =>{
        const id = i._id;
        try{
            const res = await axios.post(`http://localhost:5000/alphaapi/card/delete/${id}`,{
                id:id
            },{ headers:{token:token} });
            if(res.status === 200){
                alert(res.statusText);
                navigate('/settings');
            }
            else{
                alert(res.statusText);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const handleShow = async (i) =>{
        const id = i._id;
        try{
            const res = await axios.post(`http://localhost:5000/alphaapi/card/edit/${id}`,{
                active:true
            },{ headers:{token:token} });
            if(res.status === 200){
                alert(res.statusText);
                navigate('/settings');
            }
            else{
                alert(res.statusText);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const handleDeleteHero = async (i) =>{
        const id = i._id;
        try{
            const res = await axios.post(`http://localhost:5000/alphaapi/hero/delete/${id}`,{
                id:id
            },{ headers:{token:token} });
            if(res.status === 200){
                alert(res.statusText);
                navigate('/settings');
            }
            else{
                alert(res.statusText);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const handleShowHero = async (i) =>{
        const id = i._id;
        try{
            const res = await axios.post(`http://localhost:5000/alphaapi/hero/edit/${id}`,{
                active:true
            },{ headers:{token:token} });
            if(res.status === 200){
                alert(res.statusText);
                navigate('/settings');
            }
            else{
                alert(res.statusText);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const handleDeleteFooter = async (i) =>{
        const id = i._id;
        try{
            const res = await axios.post(`http://localhost:5000/alphaapi/footer/delete/${id}`,{
                id:id
            },{ headers:{token:token} });
            if(res.status === 200){
                alert(res.statusText);
                navigate('/settings');
            }
            else{
                alert(res.statusText);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const handleShowFooter = async (i) =>{
        const id = i._id;
        try{
            const res = await axios.post(`http://localhost:5000/alphaapi/footer/edit/${id}`,{
                active:true
            },{ headers:{token:token} });
            if(res.status === 200){
                alert(res.statusText);
                navigate('/settings');
            }
            else{
                alert(res.statusText);
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

    if(loading) return <Loader />;
    return (
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile}/>
            <main className="main">
                <section className="section latest cards-latest">
                    <div className="wrapper">
                        <div className="top">
                            <h3 className="heading">Hero Settings</h3>
                            <button onClick={openModal}>Add Banner +</button>
                        </div>
                         
                        <div className="boxes">
                            {hero && hero.length === 0 ? (
                                <div className="table">
                                    <p className="paragraph">No data</p>
                                </div>
                            ) : (
                                hero.map((item,i)=>{
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

                                            <button onClick={()=>handleDeleteHero(item)}>Delete Hero</button>
                                            <button onClick={()=>handleShowHero(item)}>Show/Hide Hero</button>
                                        </div>
                                        
                                    )
                                })
                            )}
                            
                        </div>
                    </div>

                    <div className="wrapper">
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
                    </div>

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
                                            <Link to={`/details/${item._id}`}>
                                                <div className="product-image">
                                                    <img src={`${item.image[0].url}`} alt={item.image[0]} />
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

                                            <button onClick={()=>handleDelete(item)}>Delete Card</button>
                                            <button onClick={()=>handleShow(item)}>Show/Hide Card</button>
                                        </div>
                                        
                                    )
                                })
                            )}
                            
                        </div>
                    </div>
                </section>

                <HeroModal openModal={openModal} heroModal={heroModal} />
                <FooterModal openFooterCard={openFooterCard} footerModal={footerModal} />
                <CardModal openCard={openCard} cardModal={cardModal} />
                <Modal modal={modal} handleModal={handleModal} />
                <MobileNav mobile={mobile} handleMobile={handleMobile} />
            </main>
            <Footer />
        </>
    );
}
 
export default Settings;