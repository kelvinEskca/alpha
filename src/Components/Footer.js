import React,{useState} from "react";
import FooterBox from "./FooterBox";
import axios from "axios";
import baseUrl from "../config/config.js";
import AlertModal from "./AlertModal";
const Footer = ({search}) => {
    const [email,setEmail] = useState();
    const [response, setResponse] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [data,setData] = useState([]);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const handleSubmit = async (e)=>{
        setFetching(true);
        e.preventDefault();
        if(email !== ''){
            try{
                const news = await axios.post(`${baseUrl.baseUrl}/alphaapi/newsletter`,{
                    email:email
                });
                if(news.status === 200){
                    setResponse(true);
                    setFetching(false);
                    setData(news.data);
                    setIsSuccessModalOpen(true);
                    const switchResponse = () =>{
                        setResponse(false);
                        setIsSuccessModalOpen(false);
                    }
                    setInterval(switchResponse,3000);
                }
                else{
                    setResponse(true);
                    setFetching(false);
                    setData(news.data);
                    setIsSuccessModalOpen(true);
                    const switchResponse = () =>{
                        setResponse(false);
                        setIsSuccessModalOpen(false);
                    }
                    setInterval(switchResponse,3000);
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
        <footer className={`footer ${search ? ("footer-off"):("footer-on")}`}>
            <div className="rows">
                <div className="newsletter">
                    <h3 className="heading">SIGN UP FOR VELONTE NEWSLETTER</h3>
                    <form className="form" onSubmit={handleSubmit}>
                        <label htmlFor="#"><input type='email' placeholder='Your Email Address' onChange={(e)=>{setEmail(e.target.value)}} required/></label>
                        {fetching ? (<label htmlFor="#"><button>{'Loading.....'}</button></label>) : (<label htmlFor="#"><button>{'Sign Up'}</button></label>)}
                        
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
                    <FooterBox linkThree={'/track'} linkOne={'/help'} heading={'Support'} linkFour={'/return'} textOne={'Help Center'} textThree={'Track My Order'} textFour={'Return and Exchange'} />

                    <FooterBox linkThree={'/shipping'} linkTwo={'/contact'} linkOne={'/about'} heading={'Info'} textOne={'About Us'} textTwo={'Contact Us'} textThree={'Shipping Info'} />
                </div>
            </div>

            <div className="footer-span">
                <span className="holder">
                    <p className="paragraph">&copy; 2023</p>
                    <p className="paragraph">|</p>
                    <p className="paragraph">&copy;  VELONTE</p>
                    <p className="paragraph">|</p>
                    <p className="paragraph">All Rights Reserved</p>
                </span>

                <span className="holder"></span>

                <span className="holder">
                    <p className="paragraph">Privacy Policy</p>
                    <p className="paragraph">|</p>
                    <p className="paragraph">Terms of Service</p>
                    <p className="paragraph">|</p>
                    <p className="paragraph">MPDPA</p>
                </span>
            </div>

            {response ? (
                <AlertModal isOpen={isSuccessModalOpen} alertText={data} onClose={() => setIsSuccessModalOpen(false)} />
            ) : ("")}
        </footer>
    );
}
 
export default Footer;