import React, { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Card({ card, onCardClick }) {
    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
    );

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `...`;


    function handleCardClick() {
        onCardClick(card);
    }

    return (
        <li className="elements__card">
            <img className="elements__photo" src={card.link} alt={card.name} onClick={handleCardClick} />
            <button className="elements__delete-button" type="button" eria-label="delete-button"></button>
            <div className="elements__info">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__like-area">
                    <button className="elements__like-button" type="button" aria-label="like-button"></button>
                    <span className="elements__like-counter">{card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}

export default Card;