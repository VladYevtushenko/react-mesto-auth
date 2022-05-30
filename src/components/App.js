import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import EditAvatarPopup from './popup-components/EditAvatarPopup';
import EditProfilePopup from "./popup-components/EditProfilePopup";
import ImagePopup from './popup-components/ImagePopup';
import ConfirmPopup from './popup-components/ConfirmPopup';
import AddPlacePopup from './popup-components/AddPlacePopup';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from '../utils/Api';

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isImagePopupOpen, setImagePopupOpen] = useState(false);
	const [slectedCard, setSelectedCard] = useState(null);
	const [cards, setCards] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
	const [cardDelete, setCardDelete] = useState(null);
	const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
	const [changeAvaButtonName, setChangeAvaButtonName] = useState('Сохранить');
	const [changeProfileEditButtonName, setChangeProfileEditButtonName] = useState('Сохранить');
	const [changeAddPlaceButtonName, setChangeAddPlaceButtonName] = useState('Создать');
	const [changeDelButtonName, setChangeDelButtonName] = useState('Да');
	
	const [loggedIn, setLoggedIn] = useState(false);
	const [email, setEmail] = useState('');
	const [isSignUp, setIsSingUp] = useState(false);
	const [signUpError, setSingUpError] = useState('');
	const history = useHistory();
	

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	};

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	};

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	};

	function handleConfirmDelete(card) {
		setIsConfirmPopupOpen(true);
		setCardDelete(card);
	}

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsConfirmPopupOpen(false);
		setImagePopupOpen(false);
		setSelectedCard(null);
	};

	function handleCardClick(card) {
		setSelectedCard(card);
		setImagePopupOpen(true);
	};

	function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
			.catch((err) => console.log(err));
    }

	function handleCardDelete() {
		setChangeDelButtonName('Удаление...');
		api.deleteCard(cardDelete._id)
			.then(() => {
				setCards((state) => state.filter((c) => c._id !== cardDelete._id));
				closeAllPopups();
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setChangeDelButtonName('Да')
			});
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
		setChangeAvaButtonName('Сохраняю...');
		api.editAvatar(avatar)
			.then(user => {
				setCurrentUser(user);
				closeAllPopups();
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setChangeAvaButtonName('Сохранить')
			});
	}

	function handleEditUser(userData) {
		setChangeProfileEditButtonName('Сохраняю...');
		api.editProfile(userData)
			.then(userData => {
				setCurrentUser(userData);
				closeAllPopups();
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setChangeProfileEditButtonName('Сохранить')
			});
	}

	function handleAddPlace(card) {
		setChangeAddPlaceButtonName('Создание...');
		api.postCard(card)
			.then(newCard => {
				setCards([newCard, ...cards]);
				closeAllPopups();
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setChangeAddPlaceButtonName('Создать')
			});			
	}

	useEffect(() => {
		function closeByEsc(evt) {
			if (evt.key === 'Escape') {
				evt.preventDefault();
				closeAllPopups();
			}
		}
		document.addEventListener('keydown', closeByEsc);
		return () => document.removeEventListener('keydown', closeByEsc)
	}, []);

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div>
				<Header 
					loggedIn={loggedIn}
					email={email}
					// onSignOut={handleSingOut}
				/>

				<Switch>
					<ProtectedRoute exact path="/" loggedIn={loggedIn}>
						<Main
							cards={cards}
							onEditProfile={handleEditProfileClick}
							onAddPlace={handleAddPlaceClick}
							onEditAvatar={handleEditAvatarClick}
							onCardClick={handleCardClick}
							onCardLike={handleCardLike}
							onCardDelete={handleConfirmDelete}
						/>
					</ProtectedRoute>

					<Route path="/sign-up">

					</Route>

					<Route path="/sign-in">

					</Route>
				</Switch>
				
				<Footer />

				<EditAvatarPopup 
					isOpen={isEditAvatarPopupOpen} 
					onClose={closeAllPopups} 
					onEditAvatar={handleEditAvatar}
					buttonText={changeAvaButtonName}
				/>

				<EditProfilePopup 
					isOpen={isEditProfilePopupOpen} 
					onClose={closeAllPopups} 
					onEditUser={handleEditUser}
					buttonText={changeProfileEditButtonName}
				/>

				<AddPlacePopup 
					isOpen={isAddPlacePopupOpen} 
					onClose={closeAllPopups} 
					onAddPlace={handleAddPlace}
					buttonText={changeAddPlaceButtonName}
				/>

				<ConfirmPopup 
					isOpen={isConfirmPopupOpen} 
					onClose={closeAllPopups} 
					onCardDelete={handleCardDelete}
					buttonText={changeDelButtonName}
				/>

				<ImagePopup 
					card={slectedCard} 
					isOpen={isImagePopupOpen} 
					onClose={closeAllPopups} 
				/>

			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
