import { Link,useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from 'axios';
import Button from "./Button";
import CartContext from "../CartContext";
import baseUrl from "../config/config.js";
const Modal = ({modal,handleModal}) => {
    const {items,increaseQuantity,reduceQuantity,removeFromCart,getTotalAmount,getItemAmount,getShipping} = useContext(CartContext);
    const user = JSON.parse(localStorage.getItem('user'));
    axios.defaults.withCredentials = true;
    const individualTotalPrice = getItemAmount();
    const [isChecked, setIsChecked] = useState(true);
    let totalAmount = 0;
    const navigate = useNavigate();

    function handleToggle() {
        setIsChecked(!isChecked);
    }

    if(isChecked === true){
        totalAmount = 0;
        console.log(totalAmount);
    }
    else{
        totalAmount = getShipping() - getTotalAmount();
    }

    const handleSectionClick = (e) => {
        if (e.target === e.currentTarget) {
          handleModal();
        }
    }

    const handlelink = () =>{
        navigate('/login');
    }
    
    const makePayment = async () =>{
        
        try{
            const response = await axios.post(`${baseUrl.baseUrl}/alphaapi/pay/create-checkout-session`,{
                items:items,
                userId:user._id,
                email:user.email,
                total:totalAmount

            })
            if(response.data.url){
                window.location.href = response.data.url;
            }
        }
        catch(error){
            console.log(error);
        }
    }
    return (
        <section className={`section modal  ${modal ? ('modaloff') : ('')}`} >
            <div className="wrapper">
                <div className="boxes" onClick={handleSectionClick}>
                    <>
                    {items.length === 0 ? (
                        <div className="box">
                            <h3 className="heading">Give Your Bag Some Love</h3>
                            <div className="btn-column">
                                <Link to='/women'><Button btnText={`Women's Top Pick`} /></Link>
                                <Link to='/men'><Button btnText={`Men's Top Pick`} /></Link>
                                <button onClick={handleModal}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        
                        <div className="border-container">
                            {items.map((item,i)=>{
                                return (
                                    <div className="border-box" key={i}>
                                        <div className="top">
                                            <div className="top-left">
                                                <h3 className="heading">{item.name}</h3>
                                                <p className="paragraph">{item.category}</p>
                                                <p className="paragraph">{item.colorName}</p>
                                                <p className="paragraph">{item.size}</p>
                                                <h3 className="heading">${item.price}</h3>
                                            </div>

                                            <div className="top-right">
                                            { 'color' in item && item.color !== "" ? (
                                            <img src={`${item.color}`} alt={item.color} />
                                            ) : (
                                            <img src={`${item.image[0].url}`} alt={item.image[0]} />
                                            )}
                                            </div>
                                        </div>

                                        <div className="bottom">
                                            <div className="bottom-right">
                                                <div className="smaller" onClick={()=>removeFromCart(item._id,item.color,item.size)}>
                                                    <img src="../images/icons8-remove-24.png" alt="icons8-remove-24" />
                                                </div>

                                                <div className="smaller">
                                                    <div className="left" onClick={()=>reduceQuantity(item._id,item.color,item.size)}><h3 className="heading">-</h3></div>
                                                    <div className="center"><h3 className="heading">{item.qty}</h3></div>
                                                    <div className="right" onClick={()=>increaseQuantity(item._id,item.color,item.size)}><h3 className="heading">+</h3></div>
                                                </div>

                                                <div className="smaller">
                                                    <h3 className="heading">${individualTotalPrice[i]}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            
                        </div>
                        
                    )}
                    {items.length === 0 ? (
                        ""
                    ):(
                        <div className="info-container">
                            <div className="rowOne">
                                <div className="total-banner">
                                    <span>
                                        {items.length > 1 ? (<h3 className="heading">Item Total: <span>{items.length}</span></h3>) : (<h3 className="heading">Item Total: <span>{items.length}</span></h3>)}
                                    </span>
                                    <span>
                                        <h3 className="heading">Shipping:<span>{isChecked ? ("Free"):(<>
                                        ${getShipping() - getTotalAmount()}</>)}</span></h3>
                                    </span>
                                    
                                </div>
                                <div className="total-banner">
                                    <span>
                                        <h3 className="small-heading">SubTotal: <span>${getTotalAmount()}</span></h3>
                                        
                                    </span>
                                    <span>
                                        <h3 className="heading">Total: <span>{isChecked ? (`$${getTotalAmount()}`):(`$${getShipping()}`)}</span></h3>
                                    </span>
                                </div>
                            </div>
                            <div className={`rowMajor majorFirst ${isChecked ? ' checked' : ''}`}>
                                <span className={`note-span check-span `}>
                                    <input type="checkbox" checked={isChecked} onChange={handleToggle} />
                                    <small>Free shipping</small>
                                </span>
                            </div>
                            <div className={`rowMajor ${isChecked ? 'off' : ''}`}>
                                <span className="note-span">
                                    <small>$25 for items greater than 10</small>
                                    <small>$15 for items less than 10</small>
                                </span>
                            </div>
                            
                            {user === null ? (
                                <Link to='/login' className="widelogin"><button className="loginbtn" onClick={handlelink}>Login to checkout</button></Link>
                            ) : (
                                <button onClick={makePayment}>Checkout</button>
                            )}
                            <button onClick={handleModal}>Cancel</button>
                        </div>
                    )}
                    
                    </>
                    
                </div>
            </div>
        </section>
    );
}
 
export default Modal;