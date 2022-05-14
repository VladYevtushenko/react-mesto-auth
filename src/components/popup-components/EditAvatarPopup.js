import React, { useRef, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ 
    isOpen, 
    onClose, 
    onEditAvatar,
    buttonText,
}) {
    const link = useRef();
    const [isLinkValid, setLinkValid] = useState(false);
    const [linkValidationMassage, setLinkValidationMessage] = useState('');

    function isAvaLinkValid(link) {
        if (!link.validity.valid) {
            setLinkValidationMessage(link.validationMessage);
            setLinkValid(false);
        } else {
            setLinkValid(true);
        }
    }

    useEffect(() => {
        link.current.value = '';
    }, [isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();
        onEditAvatar({
            avatar: link.current.value,
        });
    }

    return (
        <PopupWithForm 
            name="avatar" 
            title="Обновить аватар" 
            isOpen={isOpen} 
            onClose={onClose} 
            onSubmit={handleSubmit}
            buttonText={buttonText}
        >
            <input 
                type="url" 
                className="popup__input" 
                placeholder="Ссылка на картинку" 
                id="avatarLink" 
                name="avatarLink" 
                ref={link} 
                onChange={() => isAvaLinkValid(link.current)} 
                required 
            />
            <span 
                className={`popup__error avatarLink-error ${isLinkValid ? '' : 'popup__error_visible'}`}
            >
                {linkValidationMassage}
            </span>
            {/* <button className={`popup__save-button ${isLinkValid ? '' : 'popup__save-button_disabled'}`} type="submit">{buttonText}</button> */}
		</PopupWithForm>
    )
}

export default EditAvatarPopup;