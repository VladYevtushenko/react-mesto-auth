import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/Mesto.svg';
import closeBtn from '../../images/Close-Icon.svg';
import burgerBtn from '../../images/burger.svg';

function Header ({ loggedIn, email, onSignOut }) {
    const [isInvisible, setIsInvisible] = useState(true);
    const mobileBtn = isInvisible ? burgerBtn : closeBtn;

    function handleBurgerBtnClick() {
        isInvisible ? setIsInvisible(false) : setIsInvisible(true);
    }

    useEffect(() => {
        if (!loggedIn) setIsInvisible(true);
    }, [loggedIn]);

    return (
        <header className="header page__header">
            <img src={logo} alt="лого сервиса Mesto" className="header__logo" />
            <button 
                className={`header__burger-btn header__burger-btn${loggedIn ? '' : '_invisible'}`}
                type='button'
                style={{ backgroundImage: `url(${loggedIn ? mobileBtn : '' })`}}
                onMouseDown={handleBurgerBtnClick}
            ></button>
            <div className={`header__auth-container 
                header__auth-container${isInvisible &&  loggedIn ? '_hidden' : ''}
                header__auth-container${loggedIn ? '_logged' : ''}`}
            >
                <p className="header__email">{email}</p>
                <button 
                    onMouseDown={onSignOut}
                    className={`header__logout header__logout${loggedIn ? '_active' : ''}`}
                >
                    Выйти
                </button>
                <nav className={`header__nav header__nav${!loggedIn ? '_active' : ''}`}>
                    <NavLink 
                        to="/sing-up" 
                        activeClassName="header__link" 
                        className="header__link_active"
                    >
                        Регистрация
                    </NavLink>
                    <NavLink 
                        to="/sign-in"
                        activeClassName="header__link"
                        className="header__link_visible"
                    >
                        Войти
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}

export default Header;
