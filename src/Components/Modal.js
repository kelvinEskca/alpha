import { Link } from "react-router-dom";
import ImageCard from '../Components/ImageCard';
import Button from "./Button";
import { useContext } from "react";
import CartContext from "../CartContext";
const Modal = ({modal,handleModal}) => {
    const {items,increaseQuantity,reduceQuantity,removeFromCart,totalPrice} = useContext(CartContext);
    return (
        <section className={`section  ${modal ? ('modal') : ('off')}`}>
            <div className="wrapper">
                <div className="boxes">
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
                                                <p className="paragraph">{item.color}</p>
                                                <p className="paragraph">{item.size}</p>
                                                <h3 className="heading">${item.price}</h3>
                                            </div>

                                            <div className="top-right">
                                                <img src={item.imageOne} alt={item.name} />
                                            </div>
                                        </div>

                                        <div className="bottom">
                                            <div className="bottom-right">
                                                <div className="smaller" onClick={()=>removeFromCart(item.id)}>
                                                    <img src="../images/icons8-remove-24.png" alt="icons8-remove-24" />
                                                </div>

                                                <div className="smaller">
                                                    <div className="left"><h3 className="heading" onClick={()=>reduceQuantity(item.id)}>-</h3></div>
                                                    <div className="center"><h3 className="heading">{item.qty}</h3></div>
                                                    <div className="right" onClick={()=>increaseQuantity(item.id)}><h3 className="heading">+</h3></div>
                                                </div>

                                                <div className="smaller">
                                                    <h3 className="heading">{item.total}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="total-banner">
                                <span>
                                    <h3 className="heading">Total: ${totalPrice}</h3>
                                    {items.length > 1 ? (<h3 className="heading"> | {items.length} items</h3>) : (<h3 className="heading"> | {items.length} item</h3>)}
                                    
                                </span>
                                
                            </div>
                            <button>Checkout</button>
                            <button onClick={handleModal}>Cancel</button>
                        </div>
                        
                    )}
                    
                    <div className="box">
                        <h3 className="heading">Recommended Products</h3>
                        <div className="modal-box">
                            <ImageCard/>
                            <ImageCard/>
                            <ImageCard/>
                            <ImageCard/>
                            <ImageCard/>
                            <ImageCard/>
                            <ImageCard/>
                            <ImageCard/>
                            <ImageCard/>
                            <ImageCard/>
                            <ImageCard/>
                            <ImageCard/>
                            <ImageCard/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Modal;