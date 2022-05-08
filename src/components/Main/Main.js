import React, { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// import api from '../../utils/Api';
import Card from '../Card/Card';

function Main ({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {
    const currentUser = useContext(CurrentUserContext);
    // const [userAvatr, setUserAvatar] = useState('#');
    // const [userName, setUserName] = useState('...');
    // const [userDescription, setUserDescription] = useState('...');
    // const [cards, setCards] = useState([]);

    // useEffect(() => {
    //     Promise.all([api.getProfile(), api.getInitialCards()])
    //         .then(res => {
    //             const getProfile = res[0];
    //             const getInitialCards = res[1];

    //             setUserName(getProfile.name)
    //             setUserDescription(getProfile.about)
    //             setUserAvatar(getProfile.avatar)

    //             return getInitialCards;
    //         })
    //         .then(res => {
    //             setCards(res.map(item => item))
    //         })
    //         .catch(err => console.err(`Error: ${err}`))
    // }, [])

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__info">
                    <img src={currentUser.avatar} alt="аватар профиля" className="profile__avatar" />
                    <div className="profile__avatar-overlay">
                        <button className="profile__avatar-edit" type="button" aria-label="avatar-edit" onClick={onEditAvatar}></button>
                    </div>
                    <div className="profile__item">
                        <div className="profile__name-box">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button className="profile__edit-button" aria-label="edit-profile" type="button" onClick={onEditProfile}></button>
                        </div>
                        <p className="profile__about-me">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" aria-label="add-button" type="button" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />)}
                </ul>
            </section>
        </main>
    );
}

export default Main;