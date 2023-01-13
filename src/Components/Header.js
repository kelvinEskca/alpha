
import { Link } from "react-router-dom";
const Header = () => {
    return (
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
                    <img src="../images/icons8-search-30.png" alt="icons8-search-30" />
                    <img src="../images/icons8-menu-rounded-30.png" alt="icons8-menu-rounded-30" className="menu" />
                    <img src="../images/icons8-shopping-bag-30.png" alt="icons8-shopping-bag-30" />
                </div>
            </nav>
        </header>
    );
}
 
export default Header;