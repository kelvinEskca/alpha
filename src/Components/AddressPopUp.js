import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import CartContext from "../CartContext";
import baseUrl from "../config/config.js";

const AddressPopUp = ({addressPop,addressPopUp}) => {
    const {items,getTotalAmount,getShipping} = useContext(CartContext);
    axios.defaults.withCredentials = true;
    const [isChecked, setIsChecked] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));
    function handleToggle() {
        setIsChecked(!isChecked);
    }

    let totalAmount = 0;

    if(isChecked === true){
        totalAmount = 0;
    }
    else{
        totalAmount = getShipping() - getTotalAmount();
    }

    const makePayment = async () =>{
        
        try{
            const response = await axios.post(`${baseUrl.baseUrl}/alphaapi/pay/create-checkout-session`,{
                items:items,
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
        <section className={`section modal addresspop  ${addressPop ? ('modaloff') : ('')}`} >
        <div className="wrapper">
            <Link to={'/'}><img src={'images/logo.png'} alt="logo" className="logo" /></Link>
            <div className="boxes">
                <div className="box">
                    {items.length === 0 ? (
                        ""
                    ) : (
                        
                        <div className="border-container">
                            {items.map((item,i)=>{
                                return (
                                    <div className="border-box" key={i}>
                                        <div className="top">
                                            <div className="top-left">
                                                <h3 className="heading">${item.price}</h3>
                                            </div>

                                            <div className="top-right">
                                            { 'color' in item && item.color !== "" ? (
                                            <img src={`${item.color}`} alt={item.color} />
                                            ) : (
                                            <img src={`${item.colors}`} alt={item.colors} />
                                            )}
                                            <div class="rowright">
                                                <h3 className="heading">{item.name}</h3>
                                                <p className="paragraph">{item.size}</p>
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
                        </div>
                    )}
                    
                </div>

                <div className="box">
                    <form className="form">
                        <div className="toprow">
                            <h3 className="heading">Contact Information</h3>
                            {user === null ? (<span>Already have an account? <Link to={'/login'}>Login</Link></span>) : ("")}
                        </div>
                        
                        <label>
                            <input type="text" placeholder="Email" />
                        </label>

                        <div className="group">Shipping address 
                            <label>
                                <input type="text" placeholder="Country" />
                            </label>

                            <div className="labelrow">
                                <label>
                                    <input type="text" placeholder="First Name" />
                                </label>

                                <label>
                                    <input type="text" placeholder="Last Name" />
                                </label>
                            </div>

                            <label>
                                <input type="text" placeholder="Company (Optional) " />
                            </label>

                            <label>
                                <input type="text" placeholder="Address" />
                            </label>

                            <label>
                                <input type="text" placeholder="Appartment, suite, e.t.c (Optional)" />
                            </label>

                            <div className="labelrow">
                                <label>
                                    <input type="text" placeholder="City" />
                                </label>

                                <label>
                                    <input type="text" placeholder="State" />
                                </label>

                                <label>
                                    <input type="text" placeholder="Zip Code" />
                                </label>
                            </div>

                            <label>
                                <input type="phone" placeholder="Phone" />
                            </label>
                        </div>

                        <div className="popbottom">
                            <p className="paragraph" onClick={addressPopUp}>&#x2190; Return to cart</p>
                            <button onClick={makePayment}>Proceed To Payment</button>
                        </div>
                    </form>
                </div>

                
            </div>
        </div>
        </section>
    );
}
 
export default AddressPopUp;