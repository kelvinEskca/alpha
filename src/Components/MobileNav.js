import { Link } from "react-router-dom";

const MobileNav = ({handleMobile,mobile}) => {
    return (
        <div className={`${mobile ? ("mobile-footer") : ("mobile-off")}`} onClick={handleMobile}>
            <div className="mobile-inner">
                <div className="top">
                    <Link to="/women">Women</Link>
                    <Link to="/men">Men</Link>
                </div>

                <div className="center">
                    <h3 className="heading">Welcome Back, Kelvin!</h3>

                    <ul className="list">
                        <li><Link to='/account'>My Account</Link></li>
                        <li><Link to='/help'>Help Center</Link></li>
                        <li><Link to='/shipping'>Shipping Info</Link></li>
                        <li><Link to='/orders'>Track My Order</Link></li>
                        <li><Link to='/support'>Returns & Exchange</Link></li>
                        <li><Link to='/about'>About Us</Link></li>
                    </ul>
                </div>

                <div className="bottom">
                    <div className="social-wrapper">
                        <img src="../images/icons8-instagram-30.png" alt="icons8-instagram-30" />
                        <img src="../images/icons8-tiktok-30.png" alt="icons8-tiktok-30" />
                        <img src="../images/icons8-facebook-30.png" alt="icons8-facebook-30-30" />
                        <img src="../images/icons8-twitter-30.png" alt="icons8-twitter-30" />
                        <img src="../images/icons8-youtube-30.png" alt="icons8-youtube-30" />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default MobileNav;