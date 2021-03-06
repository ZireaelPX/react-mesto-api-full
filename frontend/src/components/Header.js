import {Link} from "react-router-dom";
import Menu from "./Menu";
import {useState} from "react";
import Audio from "./Audio";

function Header({nameLink, route = "", onOut, email = "", isLogin}) {
    const [isMobileMenu, setIsMobileMenu] = useState(false);

    function handleMenuMobileClick() {
        setIsMobileMenu(!isMobileMenu);
    }

    return (
        <>
            {
                isLogin ? <Menu isToggleMenu={isMobileMenu} email={email} onClick={onOut}/> : null
            }

            <header className="header">
                <h1 className="header__logo"><span>Space</span> <Audio/></h1>
                <nav className={`header__links ${isLogin ? 'header__links_none' : ''}`}>
                    <p className="header__email">{email}</p>
                    <Link className="header__link" to={route} onClick={onOut}>{nameLink}</Link>
                </nav>
                {
                    isLogin ?
                        <button className={`header__menu ${isMobileMenu ? 'header__menu_active' : ''}`} onClick={handleMenuMobileClick}>
                            <span/>
                        </button>
                        : null
                }
            </header>
        </>

    );
}


export default Header;