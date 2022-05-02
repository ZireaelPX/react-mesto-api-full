import {useEffect, useState} from "react";

import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({isOpen, onClose, onAddNewCard}) {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        setTitle('');
        setLink('');
        setIsLoading(false);
    }, [isOpen]);

    function editTitle(e) {
        setTitle(e.target.value);
    }

    function editLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        setIsLoading(true);
        onAddNewCard({
            title,
            link
        });
    }

    return (
        <PopupWithForm
            name={"card-add"}
            title={"Новое место"}
            btnText={"Создать"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        >
            <input type="text" className="popup__input popup__input_value_card-name" name="title" id="title"
                   placeholder="Название" required minLength="2" autoComplete="off" value={title} onChange={editTitle}/>
            <span className="popup__error" id="title-error"/>
            <input type="url" className="popup__input popup__input_value_card-link" name="link" id="link"
                   placeholder="Ссылка на изображение" required value={link} onChange={editLink}/>
            <span className="popup__error" id="link-error"/>
        </PopupWithForm>

    )
}

export default EditProfilePopup;