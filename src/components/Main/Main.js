import React from 'react';

function Main () {
    return (
        <main className="main page__main">
            <section className="profile">
                <div className="profile__info">
                    <img src="#" alt="фото профиля" className="profile__avatar" />
                    <div className="profile__avatar-overlay">
                        <button className="profile__avatar-edit" type="button" aria-label="avatar-edit"></button>
                    </div>
                    <div className="profile__item">
                        <div className="profile__name-box">
                            <h1 className="profile__name"></h1>
                            <button className="profile__edit-button" aria-label="edit-batton" type="button"></button>
                        </div>
                        <p className="profile__about-me"></p>
                    </div>
                </div>
                <button className="profile__add-button" aria-label="add-button" type="button"></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    <template id="element-template">
                        <li className="elements__card">
                            <img className="elements__photo" />
                            <button className="elements__delete-button" type="button" eria-label="delete-button"></button>
                            <div className="elements__info">
                                <h2 className="elements__title"></h2>
                                <div className="elements__like-area">
                                    <button className="elements__like-button" type="button" aria-label="like-button"></button>
                                    <span className="elements__like-counter"></span>
                                </div>
                            </div>
                        </li>
                    </template>
                </ul>
            </section>
        </main>
    );
}

export default Main;