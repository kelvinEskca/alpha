import React from "react";
import Button from "./Button";
const Video = ({btn,btnTwo,video,heading,cardDirection,paragraph}) => {
    return (
        <div className={`cards ${cardDirection}`}>
            <img src={video} alt={heading} />
            <div className="text-box">
                <h3 className="heading">{heading}</h3>
                <p className="paragraph">{paragraph}</p>
                <Button btnText={btn} />
                <Button btnText={btnTwo} />
            </div>
        </div>
    );
}
 
export default Video;