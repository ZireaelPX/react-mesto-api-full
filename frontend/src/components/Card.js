import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {useContext} from "react";

function Card({card, id, onCardClick, onLikeCard, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);


    const cardDeleteButtonClassName = (
        `place__delete-btn ${isOwn ? 'place__delete-btn_visible' : ''}`
    );
    const cardLikeButtonClassName = (
        `place__like-btn ${isLiked ? 'place__like-btn_active' : ''}`
    );


    function handleClick() {
        onCardClick(card);
    }
    function handleLikeClick(){
        onLikeCard(card);
    }
    function handleDeleteClick(){
        onCardDelete(card);
    }

    return (
        <li className="place">
            <img className="place__image" src={card.link} alt={card.name} onClick={handleClick}/>
            <div className="place__description">
                <h2 className="place__title">
                    {card.name}
                </h2>
                <div className="place__like-container">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}/>
                    <p className="place__like-count">{card.likes.length}</p>
                </div>

            </div>
            <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}/>
        </li>
    );
}

export default Card;