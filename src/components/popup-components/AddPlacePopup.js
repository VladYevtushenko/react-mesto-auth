import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup ({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [isNameValid, setNameValid] = useState(false);
    const [isLinkValid, setLinkValid] = useState(false);
    const [nameValidationMessage, setNameValidationMessage] = useState('');
    const [linkValidationMassage, setLinkValidationMessage] = useState('');
    const [isFormValid, setFormValid] = useState(false);
    const [buttonText, setButtonText] = useState('Добавить');

    useEffect(() => {
        setName('');
        setLink('');
        setNameValid(false);
        setLinkValid(false);
        setFormValid(false);
        setNameValidationMessage('');
        setLinkValidationMessage('');
        setButtonText('Добавить');
    }, [isOpen]);

    useEffect (() => {
        if (isNameValid && isLinkValid) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [isNameValid, isLinkValid]);
    
    function handleChange(evt) {
        switch (evt.target.name) {
            case 'cardName':
                setName(evt.target.value);
                setNameValidationMessage(evt.target.validationMessage);
                setNameValid(evt.target.validity.valid);
            break;
            case 'cardLink':
                setLink(evt.target.value);
                setLinkValidationMessage(evt.target.validationMessage);
                setLinkValid(evt.target.validity.valid);
            break;
        }
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        setButtonText('Добавление...');
        onAddPlace({
            name,
            link,
        });
    }

    return(
        <PopupWithForm name="card" title="Новое место"  isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input type="text" className="popup__input" placeholder="Название" id="popupCardName" name="cardName" minLength="2" maxLength="30" value={name || ''} onChange={handleChange} required />
            <span className={`popup__error ${isNameValid ? '' : 'popup__error_visisble'}`}>{nameValidationMessage}</span>
            <input type="url" className="popup__input" placeholder="Ссылка на картинку" id="popupImageLink" name="cardLink" value={link || ''} onChange={handleChange} required />
            <span className={`popup__error ${isLinkValid ? '' : 'popup__error_visible'}`}>{linkValidationMassage}</span>
            <button className={`popup__save-button ${isFormValid ? '' : 'popup__save-button_disabled'}`} type="submit">{buttonText}</button>
        </PopupWithForm>
    );
}

export default AddPlacePopup;