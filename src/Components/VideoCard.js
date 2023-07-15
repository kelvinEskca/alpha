import React from "react";
import Button from "./Button";
import {Link} from "react-router-dom";
const Video = ({btn,btnTwo,video,heading,cardDirection,paragraph,cat,link}) => {
    return (
        <div className={`cards ${cardDirection}`}>
            <img src={video} alt={heading} />
            <div className="text-box">
                <h3 className="heading">{heading}</h3>
                <p className="paragraph">{paragraph}</p>
                <>  
                    {btnTwo === '' ? (
                        <Link to={`/${link}`}><Button btnText={btn} /></Link>
                    ) : (

                        <>
                        <Link to={`/${link}`}><Button btnText={btn} /></Link>
                        <Link to={`/${link}`}><Button btnText={btnTwo} /></Link>
                        </>
                    )}
                </>
                
            </div>
        </div>
    );
}
 
export default Video;