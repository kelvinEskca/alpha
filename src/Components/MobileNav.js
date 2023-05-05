import { Link } from "react-router-dom";
const MobileNav = ({handleMobile,mobile}) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <div className={`${mobile ? ("mobile-footer") : ("mobile-off")}`} onClick={handleMobile}>
            <div className="mobile-inner">
                <div className="top">
                    <Link to="/women">Women</Link>
                    <Link to="/men">Men</Link>
                </div>

                {user  ? (
                    <div className="center">
                        <h3 className="heading">Welcome Back, {user.fname}!</h3>
                        <ul className="list">
                            {user.isAdmin ? (
                                <>
                                    <li><Link to='/dashboard'>Account</Link></li>
                                    <li><Link to='/products'>Products</Link></li>
                                    <li><Link to='/category'>Category</Link></li>
                                    <li><Link to='/customers'>Customers</Link></li>
                                    <li><Link to='/orders'>Orders</Link></li>
                                    <li><Link to='/dashboard'>Account</Link></li>
                                    <li><Link to='/settings'>Settings</Link></li>
                                </>
                            ) : (
                                <>
                                <li><Link to='/account'>Account</Link></li>
                                <li><Link to='/addresses'>Address</Link></li>
                                <li><Link to='/help'>Help Center</Link></li>
                                <li><Link to='/shipping'>Shipping Info</Link></li>
                                <li><Link to='/track'>Track My Order</Link></li>
                                <li><Link to='/support'>Returns & Exchange</Link></li>
                                <li><Link to='/about'>About Us</Link></li>
                                </>
                            )}
                            
                            
                        </ul>
                    </div>
                ) : (
                    <div className="center">
                        <h3 className="heading">Welcome To VELONTE</h3>
                        <ul className="list">
                            <li><Link to='/login'>Login</Link></li>
                            <li><Link to='/register'>Register</Link></li>
                            <li><Link to='/help'>Help Center</Link></li>
                            <li><Link to='/shipping'>Shipping Info</Link></li>
                            <li><Link to='/orders'>Track My Order</Link></li>
                            <li><Link to='/support'>Returns & Exchange</Link></li>
                            <li><Link to='/about'>About Us</Link></li>
                        </ul>
                    </div>

                )}
                
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