const ImageCard = ({imageOne,imageTwo,tag}) => {
    return (
        <div className="box">
            <div className="tag"><small>{tag}</small></div>
            <div className="image-box">
                <img src={imageOne} alt={imageOne} className="imageOne" />
                <img src={imageTwo} alt={imageTwo} className="imageTwo" />
            </div>
            <div className="text">
                <h3 className="heading">Manifested Tee</h3>
                <p className="paragraph">White</p>
                <p className="paragraph">$40.00</p>
            </div>
        </div>
    );
}
 
export default ImageCard;