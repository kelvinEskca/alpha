import React,{useState,useEffect} from "react";
import {Link} from 'react-router-dom';
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import axios from "axios";
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
                                <p className="paragraph">At VELONTÉ, we are driven by a shared passion for fitness and a desire to create the ultimate gym clothing brand. Founded by three motivated individuals, Adrian, Dzenis, and Sammy, who live and breathe an active lifestyle, our goal is to provide athletes and fitness enthusiasts with high-quality, stylish, and functional apparel that truly supports their fitness journey.</p>
                                <p className="paragraph">
                                Our team is determined to revolutionize the fitness industry by offering cutting-edge designs and utilizing innovative materials that enhance performance and comfort. With our expertise in both fashion and fitness, we are dedicated to creating garments that not only look good but are also optimized for the movements and rigors of any workout.</p>
                                <p className="paragraph">We believe in inclusivity and cater to individuals of all shapes, sizes, and fitness levels. Our commitment to excellent customer service ensures that we listen to our customers, understand their needs, and continuously improve our products to meet their expectations.</p>
                            </div>

                            <div className="box">
                                <img src="../images/070A4425.jpg" alt="images" />
                            </div>
                        </div>

                        <div className="boxes">
                            <div className="box">
                                <p className="paragraph">Being gym-goers ourselves, we understand the importance of confidence and motivation while pursuing fitness goals. That's why we are committed to empowering individuals through our clothing, helping them feel inspired, motivated, and ready to conquer any challenge they face in and outside the gym.</p>
                                <p className="paragraph">Join us on this exciting journey as we build a brand that not only embraces the fitness community, but also inspires and motivates individuals to reach new heights in their fitness endeavors. Together, let's redefine what it means to look and feel great while pursuing a healthy and active lifestyle.</p>
                            </div>

                            <div className="box">
                                <img src="../images/12227FB3-7FB7-43A9-AE8B-DFFD27293359.webp" alt="images" />
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