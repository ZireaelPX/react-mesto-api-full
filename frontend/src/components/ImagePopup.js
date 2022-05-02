function ImagePopup(props){
    return(
        <div className={`popup popup_img-show ${props.card ? ' popup_opened' : ''}`}>
            <figure className="popup__block">
                <img className="popup__image" src={`${props.card ? props.card.link : ''}`}
                     alt={`${props.card ? props.card.name : ''}`}/>
                <figcaption className="popup__caption">{`${props.card ? props.card.name : ''}`}</figcaption>
                <button className="popup__close-btn" type="button" onClick={props.onClose}/>
            </figure>
        </div>
    );
}

export default ImagePopup;