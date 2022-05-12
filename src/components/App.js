import React, { useEffect, useState } from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
// import PopupWithForm from './popup-components/PopupWithForm';
import EditAvatarPopup from './popup-components/EditAvatarPopup';
import EditProfilePopup from "./popup-components/EditProfilePopup";
import ImagePopup from './popup-components/ImagePopup';
import ConfirmPopup from './popup-components/ConfirmPopup';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from '../utils/Api';

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	// const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [slectedCard, setSelectedCard] = useState(null);
	const [cards, setCards] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
	const [cardDelete, setCardDelete] = useState();
	const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	};

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	};

	// function handleAddPlaceClick() {
	// 	setIsAddPlacePopupOpen(true);
	// };

	function handleConfirmDelete(card) {
		setIsConfirmPopupOpen(true);
		setCardDelete(card);
	}

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		// setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsConfirmPopupOpen(false);
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

	function handleCardDelete() {
		api.deleteCard(cardDelete._id)
		.then(() => {
			setCards((state) => state.filter((c) => c._id !== cardDelete._id));
			closeAllPopups();
		})
	}

	useEffect(() => {
		Promise.all([api.getProfile(), api.getInitialCards()])
			.then((res) => {
				const [userData, cards] = res;
				setCurrentUser(userData);
				setCards(cards);
			})
			.catch((err) => console.log(err));
	}, []);

	function handleEditAvatar({avatar}) {
		api.editAvatar(avatar)
			.then(user => {
				setCurrentUser(user);
				closeAllPopups();
			})
			.catch((err) => console.log(err));
	}

	function handleEditUser(userData) {
		api.editProfile(userData)
			.then(userData => {
				setCurrentUser(userData);
				closeAllPopups();
			})
			.catch((err) => console.log(err));
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div>
				<Header />
				<Main
					cards={cards}
					onEditProfile={handleEditProfileClick}
					// onAddPlace={handleAddPlaceClick}
					onEditAvatar={handleEditAvatarClick}
					onCardClick={handleCardClick}
					onCardLike={handleCardLike}
					onCardDelete={handleConfirmDelete}
				/>
				<Footer />

				<EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onEditAvatar={handleEditAvatar} />

				<EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onEditUser={handleEditUser} />

				{/* <PopupWithForm name="card" title="Новое место"  btnName="Добавить" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
					<input type="text" className="popup__input" placeholder="Название" id="popupCardName" name="cardName" minLength="2" maxLength="30" required />
					<span className="popup__error popupCardName-error"></span>
					<input type="url" className="popup__input" placeholder="Ссылка на картинку" id="popupImageLink" name="cardLink" required />
					<span className="popup__error popupImageLink-error"></span>
				</PopupWithForm> */}

				<ConfirmPopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete} />

				<ImagePopup card={slectedCard} onClose={closeAllPopups} />

			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
