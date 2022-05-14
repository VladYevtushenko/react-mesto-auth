import React from 'react';

function Footer () {
    return (
        <footer className="footer page__footer">
            <p className="footer__copyright">&copy; {new Date().getFullYear()} Влад Евтушенко</p>
        </footer>
    );
}

export default Footer;