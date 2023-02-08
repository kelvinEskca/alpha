import React from "react";
import Button from "./Button";
import {Link} from "react-router-dom";
const Video = ({btn,btnTwo,video,heading,cardDirection,paragraph,cat}) => {
    return (
        <div className={`cards ${cardDirection}`}>
            <img src={video} alt={heading} />
            <div className="text-box">
                <h3 className="heading">{heading}</h3>
                <p className="paragraph">{paragraph}</p>
                {cat === "Male" ? (
                    <>
                        <Link to="/men"><Button btnText={btn} /></Link>
                        <Link to="/men"><Button btnText={btnTwo} /></Link>
                    </>
                ) : cat === "Female" ? (
                    <>
                        <Link to="/women"><Button btnText={btn} /></Link>
                        <Link to="/women"><Button btnText={btnTwo} /></Link>
                    </>
                ):(
                    <>
                        <Button btnText={btn} />
                        <Button btnText={btnTwo} />
                    </>
                )}
            </div>
        </div>
    );
}
 
export default Video;