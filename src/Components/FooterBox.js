import { Link } from "react-router-dom";

const FooterBox = ({heading,linkOne,linkTwo,linkThree,linkFour,textOne,textTwo,textThree,textFour}) => {
    return (
        <div className="box">
            <h3 className="heading">{heading}</h3>
            <ul>
                <li><Link to={linkOne}>{textOne}</Link></li>
                <li><Link to={linkTwo}>{textTwo}</Link></li>
                <li><Link to={linkThree}>{textThree}</Link></li>
                <li><Link to={linkFour}>{textFour}</Link></li>
            </ul>
        </div>
    );
}
 
export default FooterBox;