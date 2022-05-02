import {useContext} from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function Main({onEditProfile, onEditAvatar, onAddPlace, onCardClick, onLikeCard,onCardDelete, cards}) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <button className="profile__avatar-btn" onClick={onEditAvatar}>
                    <img className="profile__avatar" src={currentUser.avatar} alt="Ваша аватарка"/>
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button" className="profile__edit-btn" onClick={onEditProfile}></button>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-btn" onClick={onAddPlace}></button>
            </section>
            <section className="places">
                <ul className="places__block">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            // link={card.link}
                            // name={card.name}
                            // likes={card.likes.length}
                            onCardClick={onCardClick}
                            onLikeCard={onLikeCard}
                            onCardDelete={onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;