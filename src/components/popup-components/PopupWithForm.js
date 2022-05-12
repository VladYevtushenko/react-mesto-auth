import React from 'react';

function PopupWithForm ({name, title, children, isOpen, onClose, onSubmit}) {
    function closeByOverlay(evt) {
        if (evt.target === evt.currentTarget) {
            onClose();
        }
    }

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onMouseDown={closeByOverlay}>
            <div className="popup__container">
                <h2 className="popup__heading">{title}</h2>
                <form className={`popup__form popup__form_type_${name}`} method="get" name={name} noValidate onSubmit={onSubmit}>
                    {children}
                </form>
                <button className="popup__close-button popup__close-button_type_profile" aria-label="close-button" type="button" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default PopupWithForm;