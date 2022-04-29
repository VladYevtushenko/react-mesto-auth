import React from 'react';
import logo from '../../images/Mesto.svg';

function Header () {
    return (
        <header className="header page__header">
            <img src={logo} alt="лого сервиса Mesto" class="header__logo" />
        </header>
    );
}

export default Header;
