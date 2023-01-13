import React from "react";
import Button from "./Button";
const Cards = ({btn,image,heading,cardDirection}) => {
    return (
        <div className={`cards ${cardDirection}`}>
            <img src={image} alt={image} />
            <div className="text-box">
                <h3 className="heading">{heading}</h3>
                <Button btnText={btn} />
            </div>
        </div>
    );
}
 
export default Cards;