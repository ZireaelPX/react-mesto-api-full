import {Link} from "react-router-dom";

function Menu({email, isToggleMenu, onClick}) {
    return (
        <div className={`menu-mobile ${isToggleMenu ? 'menu-mobile_active' : ''}`}>
            <span className="header__email">{email}</span>
            <Link className="header__link" to={"/sign-in"} onClick={onClick}>Выйти</Link>
        </div>
    )
}

export default Menu;