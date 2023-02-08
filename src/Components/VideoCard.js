import React from "react";
import Button from "./Button";
import {Link} from "react-router-dom";
const Video = ({btn,btnTwo,video,heading,cardDirection,paragraph,category}) => {
    return (
        <div className={`cards ${cardDirection}`}>
            <img src={video} alt={heading} />
            <div className="text-box">
                <h3 className="heading">{heading}</h3>
                <p className="paragraph">{paragraph}</p>
                {category === "Male" ? (
                    <>
                        <Link to="/men"><Button btnText={btn} /></Link>
                        <Link to="/men"><Button btnText={btnTwo} /></Link>
                    </>
                ) : (
                    <>
                        <Link to="/women"><Button btnText={btn} /></Link>
                        <Link to="/women"><Button btnText={btnTwo} /></Link>
                    </>
                )}
                
                
            </div>
        </div>
    );
}
 
export default Video;