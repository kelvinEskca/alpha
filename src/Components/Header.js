
import { Link } from "react-router-dom";
import CartContext from "../CartContext";
import { useContext } from "react";
const Header = ({handleModal,handleMobile}) => {
    const {items} = useContext(CartContext);
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        user ? (
            <>
                <header className="header">
                    {user.isAdmin ? (
                        <>
                            <nav className="top">
                                <div className="left">
                                    <p className="paragraph">Free Domestic Shipping</p>
                                </div>

                                <div className="center">
                                    <p className="paragraph">Shop Women's top pick</p>
                                </div>

                                <div className="right">
                                    <ul>
                                        <li><Link to='/products'>Products</Link></li>
                                        <li><Link to='/customers'>Customers</Link></li>
                                        <li><Link to='/orders'>Orders</Link></li>
                                        <li><Link to='/dashboard'>Account</Link></li>
                                        <li><Link to='/settings'>Settings</Link></li>
                                    </ul>
                                </div>
                            </nav>

                            <nav className="bottom">
                                <Link to='/'><h3 className="logo">Alphalete</h3></Link>
                                <div className="bottom-right">
                                    <div className="small"><img src="../images/icons8-search-30.png" alt="icons8-search-30" /></div>
                                    <div className="small" onClick={handleMobile}><img src="../images/icons8-menu-rounded-30.png" alt="icons8-menu-rounded-30" className="menu"  /></div>
                                </div>
                            </nav>
                        </>
                    ) : (
                        <>
                            <nav className="top">
                                <div className="left">
                                    <p className="paragraph">Free Domestic Shipping</p>
                                </div>

                                <div className="center">
                                    <p className="paragraph">Shop Women's top pick</p>
                                </div>

                                <div className="right">
                                    <ul>
                                        <li><Link to='/account'>Account</Link></li>
                                        <li><Link to='/addresses'>Address</Link></li>
                                    </ul>
                                </div>
                            </nav>

                            <nav className="bottom">
                                <Link to='/'><h3 className="logo">Alphalete</h3></Link>
                                <div className="bottom-right">
                                    <div className="small"><img src="../images/icons8-search-30.png" alt="icons8-search-30" /></div>
                                    <div className="small" onClick={handleMobile}><img src="../images/icons8-menu-rounded-30.png" alt="icons8-menu-rounded-30" className="menu"  /></div>
                                    <div className="small" onClick={handleModal}><img src="../images/icons8-shopping-bag-30.png" alt="icons8-shopping-bag-30" />
                                    <div className="badge"><p className="count">{items.length}</p></div>
                                    </div>
                                </div>
                            </nav>
                        </>
                    )}
                    
                </header>
            </>
        ) : (
          <>
            <header className="header">
                <nav className="top">
                    <div className="left">
                        <p className="paragraph">Free Domestic Shipping</p>
                    </div>

                    <div className="center">
                        <p className="paragraph">Shop Women's top pick</p>
                    </div>

                    <div className="right">
                        <ul>
                            <li><Link to='/info'>Info</Link></li>
                            <li><Link to='/login'>Login</Link></li>
                        </ul>
                    </div>
                </nav>

                <nav className="bottom">
                    <Link to='/'><h3 className="logo">Alphalete</h3></Link>
                    <div className="center">
                        <Link to='/women'>Women</Link>
                        <Link to='/men'>Men</Link>
                    </div>

                    <div className="bottom-right">
                        <div className="small"><img src="../images/icons8-search-30.png" alt="icons8-search-30" /></div>
                        <div className="small" onClick={handleMobile}><img src="../images/icons8-menu-rounded-30.png" alt="icons8-menu-rounded-30" className="menu"  /></div>
                        <div className="small" onClick={handleModal}><img src="../images/icons8-shopping-bag-30.png" alt="icons8-shopping-bag-30" />
                        <div className="badge"><p className="count">{items.length}</p></div>
                        </div>
                    </div>
                </nav>
            </header>
          </> 
        )
        
    );
}
 
export default Header;