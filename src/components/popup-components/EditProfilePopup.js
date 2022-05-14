import React, { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup ({ 
    isOpen, 
    onClose, 
    onEditUser,
    buttonText,
}) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isNameValid, setNameValid] = useState(true);
    const [isDescriptionValid, setDescriptionValid] = useState(true);
    const [nameValidationMessage, setNameValidationMessage] = useState('');
    const [descriptionValidationMessage, setDescriptionValidationMessage] = useState('');
    const [isFormValid, setFormValid] = useState(false);
    // const [buttonText, setButtonText] = useState('Сохранить');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
        setNameValid(true);
        setDescriptionValid(true);
        setFormValid(true);
        setNameValidationMessage('');
        setDescriptionValidationMessage('');
        // setButtonText('Сохранить');
    }, [currentUser, isOpen]);

    useEffect(() => {
        if (isNameValid && isDescriptionValid) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [isNameValid, isDescriptionValid]);

    function handleChange(evt) {
        switch (evt.target.name) {
            case 'userName':
                setName(evt.target.value);
                setNameValidationMessage(evt.target.validationMessage);
                setNameValid(evt.target.validity.valid);
            break;
            case 'aboutMe':
                setDescription(evt.target.value);
                setDescriptionValidationMessage(evt.target.validationMessage);
                setDescriptionValid(evt.target.validity.valid);
            break;
        }
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        // setButtonText('Сохранение...');
        onEditUser({ 
            name, 
            about: description,
        });
    }
    return (
        <PopupWithForm 
            name="profile" 
            title="Редактировать профиль" 
            isOpen={isOpen} 
            onClose={onClose} 
            onSubmit={handleSubmit}
            buttonText={buttonText}
        >
                <input 
                    type="text"  
                    className="popup__input" 
                    placeholder="Имя" 
                    id="popupProfName" 
                    name="userName" 
                    minLength="2" 
                    maxLength="40" 
                    value={name || ''} 
                    onChange={handleChange} 
                    required 
                />
                <span 
                    className={`popup__error ${isNameValid ? '' : 'popup__error_visible'}`}
                >
                    {nameValidationMessage}
                </span>
                <input 
                    type="text" 
                    className="popup__input" 
                    placeholder="О себе" 
                    id="popupProfAboutMe" 
                    name="aboutMe" 
                    minLength="2" 
                    maxLength="200" 
                    value={description || ''} 
                    onChange={handleChange} 
                    required 
                />
                <span 
                    className={`popup__error ${isDescriptionValid ? '' : 'popup__error_visible'}`}
                >
                    {descriptionValidationMessage}
                </span>
                {/* <button 
                    className={`popup__save-button ${isFormValid ? '' : 'popup__save-button_disabled'}`} 
                    type="submit"
                    >
                        {buttonText}
                    </button> */}
            </PopupWithForm>
    );
}

export default EditProfilePopup;

