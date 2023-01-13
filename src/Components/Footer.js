import Button from "./Button";
import FooterBox from "./FooterBox";
import Input from "./Input";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="rows">
                <div className="newsletter">
                    <h3 className="heading">SIGN UP FOR ALPHALETE NEWSLETTER</h3>
                    <form action="#" className="form">
                        <label htmlFor="#"><Input type={'email'} placeholder={'Your Email Address'} /></label>
                        <label htmlFor="#"><Button btnText={'Sign Up'}/></label>
                    </form>

                    <div className="social-wrapper">
                        <img src="../images/icons8-instagram-30.png" alt="icons8-instagram-30" />
                        <img src="../images/icons8-tiktok-30.png" alt="icons8-tiktok-30" />
                        <img src="../images/icons8-facebook-30.png" alt="icons8-facebook-30-30" />
                        <img src="../images/icons8-twitter-30.png" alt="icons8-twitter-30" />
                        <img src="../images/icons8-youtube-30.png" alt="icons8-youtube-30" />
                    </div>
                </div>

                <div className="two">
                    <FooterBox linkThree={'/support'} linkTwo={'/summer'} linkOne={'/help'} heading={'Support'} textOne={'Help Center'} textTwo={'Summer'} textThree={'Track My Order'} />

                    <FooterBox linkThree={'/shipping'} linkTwo={'/contact'} linkOne={'/about'} heading={'Info'} textOne={'About Us'} textTwo={'Contact Us'} textThree={'Shipping Info'} />
                </div>
            </div>

            <div className="footer-span">
                <span className="holder">
                    <p className="paragraph">&copy; 2023</p>
                    <p className="paragraph">|</p>
                    <p className="paragraph">&copy;  Alphalete Athletics LLC</p>
                    <p className="paragraph">|</p>
                    <p className="paragraph">All Rights Reserved</p>
                </span>

                <span className="holder">
                    <p className="paragraph">Learn More</p>
                    <p className="paragraph">|</p>
                    <p className="paragraph">Dream More</p>
                    <p className="paragraph">|</p>
                    <p className="paragraph">Be More</p>
                </span>

                <span className="holder">
                    <p className="paragraph">Privacy Policy</p>
                    <p className="paragraph">|</p>
                    <p className="paragraph">Terms of Service</p>
                    <p className="paragraph">|</p>
                    <p className="paragraph">CCPA</p>
                </span>
            </div>
        </footer>
    );
}
 
export default Footer;