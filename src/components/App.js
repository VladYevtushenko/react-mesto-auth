import React, { useEffect, useState } from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import PopupWithForm from './popup-components/PopupWithForm';
import ImagePopup from './popup-components/ImagePopup';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from '../utils/Api';

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [slectedCard, setSelectedCard] = useState(null);
	const [cards, setCards] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
	// const [cardDelete, setCardDelete] = useState();


	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	};

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	};

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	};

	// function handleConfirmDelete()

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setSelectedCard(null);
	};

	function handleCardClick(card) {
		setSelectedCard(card)
	};

	function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

	// function handleCardDelete() {
	// 	api.deleteCard(cardDelete._id)
	// 	then.(() => {
	// 		setCards((state) => state.filter((c) => c._id !== cardDelete._id));
	// 		closeAllPopups();
	// 	})
	// }

	useEffect(() => {
		api.getProfile()
			.then(user => setCurrentUser(user))
			.catch(err => console.log(err));

		api.getInitialCards()
			.then(card => {setCards(card)})
			.catch(err => console.log(err));
	}, []);

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div>
				<Header />
				<Main
					cards={cards}
					onEditProfile={handleEditProfileClick}
					onAddPlace={handleAddPlaceClick}
					onEditAvatar={handleEditAvatarClick}
					onCardClick={handleCardClick}
					onCardLike={handleCardLike}
				/>
				<Footer />

				<PopupWithForm name="avatar" title="Редактировать аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
					<input type="url" className="popup__input" placeholder="Ссылка на картинку" id="avatarLink" name="avatarLink" required />
					<span className="popup__error avatarLink-error"></span>
				</PopupWithForm>

				<PopupWithForm name="profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
					<input type="text" className="popup__input" placeholder="Имя" id="popupProfName" name="userName" minLength="2" maxLength="40" required />
					<span className="popup__error popupProfName-error"></span>
					<input type="text" className="popup__input" placeholder="О себе" id="popupProfAboutMe" name="aboutMe" minLength="2" maxLength="200" required />
					<span className="popup__error popupProfAboutMe-error"></span>
				</PopupWithForm>

				<PopupWithForm name="card" title="Новое место"  btnName="Добавить" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
					<input type="text" className="popup__input" placeholder="Название" id="popupCardName" name="cardName" minLength="2" maxLength="30" required />
					<span className="popup__error popupCardName-error"></span>
					<input type="url" className="popup__input" placeholder="Ссылка на картинку" id="popupImageLink" name="cardLink" required />
					<span className="popup__error popupImageLink-error"></span>
				</PopupWithForm>

				<PopupWithForm name="del-confirm" title="Вы уверены?" btnName="Да"></PopupWithForm>

				<ImagePopup card={slectedCard} onClose={closeAllPopups} />

			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
