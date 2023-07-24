import React from "react";
import VideoCard from '../Components/VideoCard';
import ImageCard from '../Components/ImageCard';
import Button from "../Components/Button";
import CategoryToggle from "../Components/CategoryToggle";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import MobileNav from "../Components/MobileNav";
import { useState } from "react";
import Modal from "../Components/Modal";
import { useEffect } from "react";

import Search from "../Components/Search";
import baseUrl from "../config/config.js";
import axios from "axios";
import SkeletonCardLoader from "../Components/SkeletonCardLoader";
import SkeletonHeroLoader from "../Components/SkeletonHeroLoader";
const Home = () => {
    const [toggleState, setToggleState] = useState(1);
    const [modal,setModal] = useState(false);
    const [mobile,setMobile] = useState(false);
    const [search,setSearch] = useState(false);
    const [loading,setLoading] = useState(true);
    const [cards,setCards] = useState([]);
    const [hero,setHero] = useState([]);

    const toggleTab = (index) =>{
        setToggleState(index);
    }
    
    const handleModal = () =>{
        setModal(!modal);
    }

    const handleMobile = () =>{
        setMobile(!mobile);
    };

    const searchToggle = () =>{
        setSearch(!search);
    };

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
                console.log(res);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getHero();
    },[]);

    return (
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile} searchToggle={searchToggle}/>
            <main className="main">
                {loading ? (<SkeletonHeroLoader cards={1}/>) : (
                    hero.map((item,i)=>{
                        if(item.active === true && item.category === "Home"){
                            return(
                                <section className="section visit hero">
                                    <div className="wrapper">
                                        <div className="boxes">
                                            <VideoCard video={item.image[0].url} heading={item.title} paragraph={item.subtitle} btn={item.cta} btnTwo={item.ctatwo} cat={item.category} link={item.link} />
                                        </div>
                                    </div>
                                </section>
                            )
                        }
                        return null
                    })
                )}
                {hero.some(item => item.active === true) ? null : <div></div>}
                

                <section className="section new">
                    <div className="wrapper">
                        <div className="area">
                            <p className="paragraph">Shop</p>
                            <h3 className="heading">New Arrivals</h3>
                            <CategoryToggle toggleState={toggleState} toggleTab={toggleTab} />
                        </div>
                        <div className="boxes">
                            <ImageCard toggleState={toggleState} toggleTab={toggleTab}/>
                        </div>
                    </div>
                </section>

                <div className="row">
                
                {loading ? (
                    <SkeletonCardLoader cards={2}/>
                ) : (
                    cards.map((item, i) => {
                        if (item.active === true) {
                        return (
                            <>
                            <section className="section visit">
                                <div className="wrapper">
                                <div className="boxes">
                                    <div className="box cards">
                                    <img src={`${item.image[0].url}`} alt={item.image[0]} />
                                    <div className="text-box">
                                        <h3 className="heading">{item.title}</h3>
                                        
                                        <a href={`/${item.link}`}><Button btnText={item.cta} btntheme={"shorter"} /></a>
                                        {item.ctatwo !== "" ? (<Button btnText={item.cta} btntheme={"longer"} />) :("")}
                                        
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </section>
                            </>
                        );
                        }
                        return null;
                    })
                    )}
                    {cards.some(item => item.active === true) ? null : <div></div>}
                    
                </div>

                <Modal modal={modal} handleModal={handleModal} />
                <MobileNav mobile={mobile} handleMobile={handleMobile} />
                <Search search={search} searchToggle={searchToggle} />
            </main>
            <Footer search={search} />
        </>
    );
}
 
export default Home;