import React from 'react';

function Card({ card, onCardClick }) {
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