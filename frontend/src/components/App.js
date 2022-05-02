import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import {useState, useEffect} from "react";
import ImagePopup from "./ImagePopup";

import {CurrentUserContext} from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

import * as mestoAuth from "../utils/mestoAuth";
import InfoTooltip from "./InfoTooltip";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isInfoTooltip, setIsInfoTooltip] = useState(false);

    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);

    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");

    const [isStatusRegister, setIsStatusRegister] = useState(null);

    let history = useHistory();


    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            mestoAuth.getToken(jwt)
                .then(res => {
                    setLoggedIn(true);
                    setEmail(res.data.email)
                    history.push('/');
                })
                .catch((err) => {
                    console.log(err + ': ошибка авторизации')
                });
        }
    }, []);

    useEffect((() => {
        if(loggedIn){
            console.log('Получение данных')
            Promise.all([api.getInitialCards(), api.getUserInfo()])
                .then(([card, userInfo]) => {
                    setCards(card);
                    setCurrentUser(userInfo);
                })
                .catch((err) => {
                    console.error("Что-то пошло не так: " + err);
                });
        }
    }), [loggedIn]);

    function onRegister(email, password) {
        mestoAuth.register(email, password)
            .then(res => {
                setIsStatusRegister(true);
                history.push('/sign-in');
            })
            .catch(err => {
                setIsStatusRegister(false);
                console.log(err + ': ошибка регистрации')
            })
            .finally(handleInfoTooltip)
    }

    function onLogin(email, password) {
        mestoAuth.login(email, password)
            .then(res => {
                localStorage.setItem("jwt", res.token);
                setLoggedIn(true);
                setEmail(email);
                history.push('/');
            })
            .catch(err => {
                setIsStatusRegister(false);
                handleInfoTooltip();
                console.log(err + ': ошибка авторизации')
            })
    }


    function onOut() {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        setEmail("");
        history.push("/sign-in");
    }

    function handleUpdateUser(data) {
        api.updateUserInfo(data)
            .then((newInfoUser) => {
                setCurrentUser(newInfoUser);
                closeAllPopups();
            })
            .catch((err) => {
                console.error("Ошибка обновления данных о пользователе: " + err)
            })
    }

    function handleUpdateAvatar(data) {
        console.log(data)

        api.updateUserAvatar(data)
            .then((newInfoUser) => {
                setCurrentUser(newInfoUser);
                closeAllPopups();
            })
            .catch((err) => {
                console.error("Ошибка обновления данных о пользователе: " + err)
            })
    }

    function handleNewCard(data) {
        api.addNewCard(data)
            .then((res) => {
                setCards([res, ...cards,]);
                closeAllPopups();
            })
            .catch(err => {
                console.error('Ошибка добавления новой карточки: ' + err)
            })
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        if (!isLiked) {
            api.addCardLike(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch(err => {
                    console.error('Ошибка установки лайка: ' + err)
                })
        } else {
            api.deleteCardLike(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch(err => {
                    console.error('Ошибка установки лайка: ' + err)
                })
        }
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id));
            })
            .catch((err) => {
                console.error("Ошибка удаления карточки " + err);
            });
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleInfoTooltip() {
        setIsInfoTooltip(true);
    }

    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsInfoTooltip(false);
        setSelectedCard(null);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="root__block">
                <Switch>
                    <Route path="/sign-in">
                        <Header route="sign-up" nameLink="Регистрация"/>
                        <Login onLogin={onLogin}/>
                    </Route>
                    <Route path="/sign-up">
                        <Header route="sign-in" nameLink="Авторизация"/>
                        <Register onRegister={onRegister}/>
                    </Route>
                    <Route exact path="/">
                        <Header onOut={onOut} email={email} nameLink="Выход" isLogin={loggedIn}/>

                        <ProtectedRoute
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            onLikeCard={handleCardLike}
                            onCardDelete={handleCardDelete}
                            cards={cards}
                            loggedIn={loggedIn}
                            component={Main}
                        />
                        <Footer/>
                    </Route>
                    <Route exact path="*">
                        {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
                    </Route>
                </Switch>


            </div>

            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}/>
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}/>
            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddNewCard={handleNewCard}/>
            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
            />
            <InfoTooltip
                name="status"
                isOpen={isInfoTooltip}
                onClose={closeAllPopups}
                isStatusRegister={isStatusRegister}
            />


            <div className="popup popup_card-delete">
                <div className="popup__container">
                    <h2 className="popup__title">Вы уверены?</h2>
                    <form name="profile-form" action="#" className="popup__form">
                        <button className="popup__submit-btn popup__delete-btn" type="submit">Да</button>
                    </form>
                    <button className="popup__close-btn" type="button"/>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;

