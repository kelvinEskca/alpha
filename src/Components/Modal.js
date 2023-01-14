import { Link } from "react-router-dom";
import ImageCard from '../Components/ImageCard';
import Button from "./Button";

const Modal = ({modal,handleModal}) => {
    return (
        <section className={`section  ${modal ? ('modal') : ('off')}`}>
            <div className="wrapper">
                <div className="boxes" onClick={handleModal}>
                    <div className="box">
                        <h3 className="heading">Give Your Bag Some Love</h3>
                        <div className="btn-column">
                            <Link to='/women'><Button btnText={`Women's Top Pick`} /></Link>
                            <Link to='/men'><Button btnText={`Men's Top Pick`} /></Link>
                        </div>
                    </div>
                    <div className="box">
                        <h3 className="heading">Recommended Products</h3>
                        <div className="modal-box">
                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />
                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />
                            <ImageCard imageOne={'../images/ManifestedTeeWhite3_400x.webp'} imageTwo={'../images/ManifestedTeeWhite1_400x.jpg'} />
                            <ImageCard imageOne={'../images/WhiteCapitolCropHoodie2_400x.jpg'} imageTwo={'../images/WhiteCapitolCropHoodie3_400x.jpg'} />
                            <ImageCard imageOne={'../images/WhiteCapitolCropHoodie2_400x.jpg'} imageTwo={'../images/WhiteCapitolCropHoodie3_400x.jpg'} />
                            <ImageCard imageOne={'../images/WhiteCapitolCropHoodie2_400x.jpg'} imageTwo={'../images/WhiteCapitolCropHoodie3_400x.jpg'} />
                            <ImageCard imageOne={'../images/WhiteCapitolCropHoodie2_400x.jpg'} imageTwo={'../images/WhiteCapitolCropHoodie3_400x.jpg'} />
                            <ImageCard imageOne={'../images/WhiteCapitolCropHoodie2_400x.jpg'} imageTwo={'../images/WhiteCapitolCropHoodie3_400x.jpg'} />
                            <ImageCard imageOne={'../images/WhiteCapitolCropHoodie2_400x.jpg'} imageTwo={'../images/WhiteCapitolCropHoodie3_400x.jpg'} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Modal;