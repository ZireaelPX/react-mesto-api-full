import {createRef, useEffect, useState} from "react";

import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({isOpen, onClose, onUpdateAvatar}) {

    const avatar = createRef();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        avatar.current.value = '';
        setIsLoading(false);
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        setIsLoading(true);

        onUpdateAvatar({
            avatar: avatar.current.value,
        })

    }

    return (
        <PopupWithForm
            name={"avatar-edit"}
            title={"Обновить аватарку"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        >
            <input type="url" className="popup__input popup__input_value_avatar-link" name="avatar"
                   id="avatar" ref={avatar}
                   placeholder="Ссылка на изображение" required/>
            <span className="popup__error" id="avatar-error"/>
        </PopupWithForm>
    )
}

export default EditProfilePopup;