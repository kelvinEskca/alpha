import React from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
const Summer = () => {
    return (
        <section className="section summer">
            <div className="wrapper">
                <div className="boxes">
                    <div className="box">
                        <h3 className="heading">Summer Shredding</h3>
                        <p className="paragraph">Website is currently under maintenance</p>

                        <form action="#">
                            <label htmlFor="#">
                                <Input type={'email'} placeholder={'Your email address here'}/>
                            </label>

                            <label htmlFor="#">
                                <Button btnText={"Notify Me"} btntheme={'white'}/>
                            </label>
                        </form>

                        <div className="social-box">
                            <img src="../images/icons8-instagram-60.png" alt="icons8-instagram-60" />
                            <img src="../images/icons8-youtube-60.png" alt="icons8-youtube-60" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Summer;