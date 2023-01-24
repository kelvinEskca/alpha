import React,{useState} from "react";
import Button from "./Button";
import FooterBox from "./FooterBox";
import axios from "axios";

const Footer = () => {
    const [email,setEmail] = useState();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(email !== ''){
            try{
                const news = await axios.post('https://api-production-f7f8.up.railway.app/alphaapi/newsletter',{
                    email:email
                });
                if(news.status === 200){
                    alert("Success")
                }
                else{
                    alert(news.statusText);
                }

            }
            catch(err){
                console.log(err);
            }
        }
        else{
            alert('Please ensure all fields are filled');
        }
    }
    return (
        <footer className="footer">
            <div className="rows">
                <div className="newsletter">
                    <h3 className="heading">SIGN UP FOR ALPHALETE NEWSLETTER</h3>
                    <form action="#" className="form" onSubmit={handleSubmit}>
                        <label htmlFor="#"><input type='email' placeholder='Your Email Address' onChange={(e)=>{setEmail(e.target.value)}}/></label>
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
                    <FooterBox linkThree={'/track'} linkTwo={'/summer'} linkOne={'/help'} heading={'Support'} textOne={'Help Center'} textTwo={'Summer'} textThree={'Track My Order'} />

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