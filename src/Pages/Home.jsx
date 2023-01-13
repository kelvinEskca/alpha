import React from "react";
import VideoCard from '../Components/VideoCard';
import ImageCard from '../Components/ImageCard';
import Button from "../Components/Button";
import CategoryToggle from "../Components/CategoryToggle";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
const Home = () => {
    return (
        <>
            <Header />
            <main className="main">
                <section className="section visit hero">
                    <div className="wrapper">
                        <div className="boxes">
                            <VideoCard video={'../images/homevid.mp4'} heading={'Alphalete X Manifested'} paragraph={'Manifest your dreams into reality'} btn={'Shop Now'} btnTwo={'btn'} />
                        </div>
                    </div>
                </section>

                <div className="row">
                    <section className="section shop">
                        <div className="wrapper">
                            <div className="boxes">
                                <div className="box">
                                    <img src="../images/0F6A0266_2.jpg" alt="0F6A0266_2" />
                                    <div className="text-box">
                                        <h3 className="heading">Shop For Her</h3>
                                        <Button btnText={'Shop Hoodies'} />
                                        <Button btnText={'Shop Joggers'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section shop left">
                        <div className="wrapper">
                            <div className="boxes">
                                <div className="box">
                                    <img src="../images/Photo_Dec_15_2022_6_21_04_PM.jpg" alt="Photo_Dec_15_2022_6_21_04_PM" />
                                    <div className="text-box">
                                        <h3 className="heading">Shop For Him</h3>
                                        <Button btnText={'Shop Hoodies'} />
                                        <Button btnText={'Shop Joggers'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <section className="section new">
                    <div className="wrapper">
                        <div className="area">
                            <p className="paragraph">Shop</p>
                            <h3 className="heading">New Arrivals</h3>
                            <CategoryToggle />
                        </div>
                        <div className="boxes">
                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />

                            <ImageCard imageOne={'../images/WhiteCapitolCropHoodie2_400x.jpg'} imageTwo={'../images/WhiteCapitolCropHoodie3_400x.jpg'} />

                            <ImageCard imageOne={'../images/WhiteCapitolCropHoodie2_400x.jpg'} imageTwo={'../images/WhiteCapitolCropHoodie3_400x.jpg'} />

                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />

                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />

                            <ImageCard imageOne={'../images/WhiteCapitolCropHoodie2_400x.jpg'} imageTwo={'../images/WhiteCapitolCropHoodie3_400x.jpg'} />

                            <ImageCard imageOne={'../images/WhiteCapitolCropHoodie2_400x.jpg'} imageTwo={'../images/WhiteCapitolCropHoodie3_400x.jpg'} />

                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />

                        </div>
                    </div>
                </section>

                <div className="column">
                        <section className="section shop">
                            <div className="wrapper">
                                <div className="boxes">
                                    <div className="box">
                                        <img src="../images/Ozone_38.webp" alt="Ozone_38" />
                                        <div className="text-box">
                                            <h3 className="heading">Seamless to a tee</h3>
                                            <p className="paragraph">Explore your soon to be favs</p>
                                            <Button btnText={'Shop Amplify'} />
                                            <Button btnText={'Shop Now'} />
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

                        <section className="section shop left second">
                            <div className="wrapper">
                                <div className="boxes">
                                    <div className="box">
                                        <img src="../images/Studio_Creative_76-port-2.webp" alt="Studio_Creative_76-port-2" />
                                        <div className="text-box">
                                            <h3 className="heading">Pump Covers</h3>
                                            <p className="paragraph">If you know,You know...</p>
                                            <Button btnText={'Shop Women'} />
                                            <Button btnText={'Shop Men'} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                </div>

                <section className="section new">
                    <div className="wrapper">
                        <div className="area">
                            <p className="paragraph">Shop</p>
                            <h3 className="heading">Leggings</h3>
                        </div>
                        <div className="boxes">
                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />

                            <ImageCard imageOne={'../images/WhiteCapitolCropHoodie2_400x.jpg'} imageTwo={'../images/WhiteCapitolCropHoodie3_400x.jpg'} />

                            <ImageCard imageOne={'../images/WhiteCapitolCropHoodie2_400x.jpg'} imageTwo={'../images/WhiteCapitolCropHoodie3_400x.jpg'} />

                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />

                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />

                            <ImageCard imageOne={'../images/WhiteCapitolCropHoodie2_400x.jpg'} imageTwo={'../images/WhiteCapitolCropHoodie3_400x.jpg'} />

                            <ImageCard imageOne={'../images/WhiteCapitolCropHoodie2_400x.jpg'} imageTwo={'../images/WhiteCapitolCropHoodie3_400x.jpg'} />

                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />

                        </div>
                    </div>
                </section>

                <section className="section visit">
                    <div className="wrapper">
                        <div className="boxes">
                            <VideoCard video={'../images/footervid.mp4'} heading={'Visit AlphaLand'} paragraph={'An oasis where individuals come to'} btn={'Learn More'} btnTwo={'Watch Video'} />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
 
export default Home;