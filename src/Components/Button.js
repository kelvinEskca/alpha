const Button = ({btnText,btntheme}) => {
    return (
        <button type="button" className={`button ${btntheme}`}>{btnText}</button>
    );
}
 
export default Button;