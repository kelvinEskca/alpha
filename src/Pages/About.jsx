import React,{useState,useEffect} from "react";
import {Link} from 'react-router-dom';
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import axios from "axios";
import Loader from "../Components/Loader";
import VideoCard from "../Components/VideoCard";
import baseUrl from "../config/config.js";
const About = () => {
    const [modal,setModal] = useState(false);
    const [mobile,setMobile] = useState(false);
    const [hero,setHero] = useState([]);
    const [loading,setLoading] = useState(true);
    const handleModal = () =>{
        setModal(!modal);
    }

    const handleMobile = () =>{
        setMobile(!mobile);
    }

    useEffect(()=>{
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
    if(loading) return <Loader />;
    return (
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile}/>
            <main className="main">
                {hero.map((item,i)=>{
                    if(item.active === true && item.category === 'Home'){
                        return(
                            <section className="section visit hero">
                                <div className="wrapper">
                                    <div className="boxes">
                                        <VideoCard video={item.image[0].url} heading={item.title} paragraph={item.subtitle} btn={item.cta} btnTwo={item.ctatwo} cat={item.category} />
                                    </div>
                                </div>
                            </section>
                        )
                    }
                    return null
                })}
                {hero.some(item => item.active === true) ? null : <div></div>}

                <section className="section how">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">HOW IT STARTED</h3>
                                <p className="paragraph">It all started around 2012 with my YouTube channel. I just wanted to help people out by sharing fitness and nutrition tips. Driven by my passion, what started as just a hobby, went from screen-printed shirts to custom-fitted shirts with a brand that captured everything I believed in. And thus, VELONTE was born.</p>

                                <Link to='#'><Button btnText={'Watch My Story'} /></Link>
                            </div>

                            <div className="box">
                                <img src="../images/070A4425.jpg" alt="images" />
                            </div>
                        </div>

                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">HOW IT STARTED</h3>
                                <p className="paragraph">It all started around 2012 with my YouTube channel. I just wanted to help people out by sharing fitness and nutrition tips. Driven by my passion, what started as just a hobby, went from screen-printed shirts to custom-fitted shirts with a brand that captured everything I believed in. And thus, VELONTE was born.</p>

                                <Link to='#'><Button btnText={'Watch My Story'} /></Link>
                            </div>

                            <div className="box">
                                <img src="../images/12227FB3-7FB7-43A9-AE8B-DFFD27293359.webp" alt="images" />
                            </div>
                        </div>

                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">HOW IT STARTED</h3>
                                <p className="paragraph">It all started around 2012 with my YouTube channel. I just wanted to help people out by sharing fitness and nutrition tips. Driven by my passion, what started as just a hobby, went from screen-printed shirts to custom-fitted shirts with a brand that captured everything I believed in. And thus, VELONTE was born.</p>

                                <Link to='#'><Button btnText={'Watch My Story'} /></Link>
                            </div>

                            <div className="box">
                                <img src="../images/Summer_Shredding_Crew_-_duotone.webp" alt="images" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section learn">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">THE L.D.B. PHILOSOPHY</h3>
                                <div className="image-box"></div>

                                <div className="text-row">
                                    <div className="text">
                                        <h3 className="heading">LEARN MORE</h3>
                                        <p className="paragraph">You can overcome anything. You can learn something new, make new habits, think new thoughts — all that matters is that you decide today and never look back.</p>
                                    </div>

                                    <div className="text">
                                        <h3 className="heading">DREAM MORE</h3>
                                        <p className="paragraph">Believe that your potential is infinite... your only limitations are the ones you set for yourself. Start where you are, use what you have, do what you can.</p>
                                    </div>

                                    <div className="text">
                                        <h3 className="heading">BE MORE</h3>
                                        <p className="paragraph">Your success isn’t determined by fame, it’s determined by the milestones you set and accomplish. Go with the option that scares you the most because that’s where you’ll grow.</p>
                                    </div>
                                </div>
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
 
export default About;