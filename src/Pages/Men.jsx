import React from "react";
import ImageCard from '../Components/ImageCard';
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
const Men = () => {
    return (
        <>
            <Header />
            <main className="main">
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

                <section className="section new gallery">
                    <div className="wrapper">
                        <div className="boxes">
                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />
                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />
                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />
                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />

                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />
                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />
                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />
                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />

                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />
                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />
                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />
                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />

                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />
                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />
                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />
                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />

                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
 
export default Men;