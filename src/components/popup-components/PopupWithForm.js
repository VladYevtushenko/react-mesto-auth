import React from 'react';

function PopupWithForm ({name, title, children, btnAriaLable="save changes", btnName="Сохранить", isOpen, onClose}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <h2 className="popup__heading">{title}</h2>
                <form className={`popup__form popup__form_type_${name}`} method="get" name={name} noValidate>
                    {children}
                    <button className="popup__save-button popup__save-button_type_profile" type="submit" aria-label={btnAriaLable}>{btnName}</button>
                </form>
                <button className="popup__close-button popup__close-button_type_profile" aria-label="close-button" type="button" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default PopupWithForm;