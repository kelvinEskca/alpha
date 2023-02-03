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
import videos from "../videos";
import { useEffect } from "react";
import Loader from "../Components/Loader";
const Home = () => {
    const [toggleState, setToggleState] = useState(1);
    const [modal,setModal] = useState(false);
    const [mobile,setMobile] = useState(false);
    const [clip,setClip] = useState([]);
    const [loading,setLoading] = useState(true);

    const toggleTab = (index) =>{
        setToggleState(index);
    }
    
    const handleModal = () =>{
        setModal(!modal);
    }

    const handleMobile = () =>{
        setMobile(!mobile);
    }

    useEffect(()=>{
        setClip(videos)
        setLoading(false);
    },[]);

    if(loading) return <Loader />;
    return (
        <>
            <Header handleModal={handleModal} handleMobile={handleMobile}/>
            <main className="main">
                <section className="section visit hero">
                    <div className="wrapper">
                        <div className="boxes">
                            <VideoCard video={clip[0].video} heading={clip[0].heading} paragraph={clip[0].paragraph} btn={clip[0].btn} btnTwo={clip[0].btnTwo} />
                        </div>
                    </div>
                </section>

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
                    <section className="section visit">
                        <div className="wrapper">
                            <div className="boxes">
                                <div className="box cards">
                                    <img src="../images/0F6A0266_2.jpg" alt="0F6A0266_2" />
                                    <div className="text-box">
                                        <h3 className="heading">For Her</h3>
                                        <Button btnText={`Shop Bra's`} btntheme={'shorter'}/>
                                        <Button btnText={'Shop Leggings'} btntheme={'longer'}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section visit left">
                        <div className="wrapper">
                            <div className="boxes">
                                <div className="cards box">
                                    <img src="../images/Photo_Dec_15_2022_6_21_04_PM.jpg" alt="Photo_Dec_15_2022_6_21_04_PM" />
                                    <div className="text-box">
                                        <h3 className="heading">For Him</h3>
                                        <Button btnText={'Shop Tees'} btntheme={'shorter'}/>
                                        <Button btnText={'Shop Joggers'} btntheme={'longer'}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* <section className="section new">
                    <div className="wrapper">
                        <div className="area">
                            <p className="paragraph">Shop</p>
                            <h3 className="heading">Leggings</h3>
                        </div>
                        <div className="boxes">
                            <ImageCard />
                        </div>
                    </div>
                </section>

                <div className="row">
                    <section className="section shop">
                        <div className="wrapper">
                            <div className="boxes">
                                <div className="box">
                                    <img src="../images/Ozone_38.webp" alt="Ozone_38" />
                                    <div className="text-box">
                                        <h3 className="heading">Seamless to a tee</h3>
                                        <p className="paragraph">Explore your soon to be favs</p>
                                        <Button btnText={'Shop Amplify'} btntheme={'longer'} />
                                        <Button btnText={'Shop Now'} btntheme={'shorter'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section shop">
                        <div className="wrapper">
                            <div className="boxes">
                                <div className="box">
                                    <img src="../images/0F6A0266_2.jpg" alt="0F6A0266_2" />
                                    <div className="text-box">
                                        <h3 className="heading">Infinity</h3>
                                        <p className="paragraph">Leading the way in mordern aesthetics</p>
                                        <Button btnText={'Shop Women'} />
                                        <Button btnText={'Shop Men'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div> */}

                <section className="section visit hero">
                    <div className="wrapper">
                        <div className="boxes">
                            <VideoCard video={clip[1].video} heading={clip[1].heading} paragraph={clip[1].paragraph} btn={clip[1].btn} btnTwo={clip[1].btnTwo} />
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
 
export default Home;