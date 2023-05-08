
import { Link } from "react-router-dom";
import CartContext from "../CartContext";
import { useContext,useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import baseUrl from "../config/config.js";
import axios from "axios";
import Loader from "./Loader";
const Header = ({handleModal,handleMobile,searchToggle}) => {
    const {items} = useContext(CartContext);
    const user = JSON.parse(localStorage.getItem('user'));
    const [bottomHeight,setBottomHeight] = useState(false);
    const [loading,setLoading] = useState(true);
    const [men,setMen] = useState('');
    const [women,setWomen] = useState('');
    const [linkContent,setLinkContent] = useState([]);
    
    let location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    const handleMouseOver = (e) =>{
        if(e.target.text === "Women"){
            setLinkContent(women)
        }
        else if(e.target.text === "Men"){
            setLinkContent(men)
        }
        setBottomHeight(true)
    }

    const handleMouseLeave = () =>{
        setBottomHeight(false)
    }

    useEffect(()=>{
        const getMen = async ()=>{
            const gender = 'Male';
            try{
                const res = await axios.get(`${baseUrl.baseUrl}/alphaapi/product/male/${gender}`)
                setMen(res.data);
                setLoading(false);
            }
            catch(err){
                setLoading(false);
                console.log(err);
            }
        }
        getMen();
        const getWomen = async ()=>{
            const gender = 'Female';
            try{
                const res = await axios.get(`${baseUrl.baseUrl}/alphaapi/product/female/${gender}`)
                setWomen(res.data);
                setLoading(false);
            }
            catch(err){
                setLoading(false);
                console.log(err);
            }
        }
        getWomen();
        
   },[]);
  
   if(loading) return <Loader />;
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

                                <div className="right longer-right">
                                    <ul>
                                        <li><Link to='/products'>Products</Link></li>
                                        <li><Link to='/category'>Category</Link></li>
                                        <li><Link to='/customers'>Customers</Link></li>
                                        <li><Link to='/orders'>Orders</Link></li>
                                        <li><Link to='/dashboard'>Account</Link></li>
                                        <li><Link to='/settings'>Settings</Link></li>
                                    </ul>
                                </div>
                            </nav>

                            <nav className="bottom mobile-bottom">
                                <Link to='/'><img src='../images/logo2.png' alt='logo'  className="logo"/></Link>
                                <div className="bottom-right">
                                    <div className="small"><img src="../images/icons8-search-30.png" alt="icons8-search-30" onClick={searchToggle}/></div>
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

                                <div className="right small-right">
                                    <ul>
                                        <li><Link to='/account'>Account</Link></li>
                                        <li><Link to='/addresses'>Address</Link></li>
                                    </ul>
                                </div>
                            </nav>

                            <nav className={`bottom ${bottomHeight ? ("longer") : ("")}`}>
                                <div className="bottomTop">
                                    <Link to='/'><img src='../images/logo2.png' alt='logo'  className="logo"/></Link>
                                    <div className="center">
                                        <Link to='/women' onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave}>Women</Link>
                                        <Link to='/men' onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave}>Men</Link>
                                    </div>

                                    <div className="bottom-right">
                                        <div className="small"><img src="../images/icons8-search-30.png" alt="icons8-search-30" onClick={searchToggle}/></div>
                                        <div className="small" onClick={handleMobile}><img src="../images/icons8-menu-rounded-30.png" alt="icons8-menu-rounded-30" className="menu"  /></div>
                                        <div className="small" onClick={handleModal}><img src="../images/icons8-shopping-bag-30.png" alt="icons8-shopping-bag-30" />
                                        <div className="badge"><p className="count">{items.length}</p></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bottomBottom" onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave}>
                                    {linkContent && linkContent.map((item,i)=>{
                                        if(item.category === "Male"){
                                            return( 
                                                <ul key={item.id}>
                                                    <h3 className="heading">{item.subcategory}</h3>
                                                    <li><Link to='/men'>{item.name}</Link></li>
                                                </ul>
                                            )
                                        }
                                        else{
                                            return (
                                                <ul key={item.id}>
                                                    
                                                    <h3 className="heading">{item.subcategory}</h3>
                                                    <li><Link to='/women'>{item.name}</Link></li>
                                                </ul>
                                            )
                                        }
                                    })}
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

                    <div className="right small-right">
                        <ul>
                            <li><Link to='/register'>Register</Link></li>
                            <li><Link to='/login'>Login</Link></li>
                        </ul>
                    </div>
                </nav>

                <nav className={`bottom ${bottomHeight ? ("longer") : ("")}`}>
                    <div className="bottomTop">
                        <Link to='/'><img src='../images/logo2.png' alt='logo'  className="logo"/></Link>
                        <div className="center">
                            <Link to='/women' onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave}>Women</Link>
                            <Link to='/men' onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave}>Men</Link>
                        </div>

                        <div className="bottom-right">
                            <div className="small"><img src="../images/icons8-search-30.png" alt="icons8-search-30" onClick={searchToggle}/></div>
                            <div className="small" onClick={handleMobile}><img src="../images/icons8-menu-rounded-30.png" alt="icons8-menu-rounded-30" className="menu"  /></div>
                            <div className="small" onClick={handleModal}><img src="../images/icons8-shopping-bag-30.png" alt="icons8-shopping-bag-30" />
                            <div className="badge"><p className="count">{items.length}</p></div>
                            </div>
                        </div>
                    </div>

                    <div className="bottomBottom" onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave}>
                        {linkContent && linkContent.map((item,i)=>{
                            if(item.category === "Male"){
                                return( 
                                    <ul key={item.id}>
                                        <h3 className="heading">{item.subcategory}</h3>
                                        <li><Link to='/men'>{item.name}</Link></li>
                                    </ul>
                                )
                            }
                            else{
                                return (
                                    <ul key={item.id}>
                                        
                                        <h3 className="heading">{item.subcategory}</h3>
                                        <li><Link to='/women'>{item.name}</Link></li>
                                    </ul>
                                )
                            }
                        })}
                    </div>
                </nav>
            </header>
          </> 
        )
        
    );
}
 
export default Header;