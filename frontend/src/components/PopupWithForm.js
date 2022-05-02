function PopupWithForm({name, title, btnText="Сохранить", isOpen, onClose, children, onSubmit, isLoading}){
    return(
        <div className={`popup popup_${name} ${isOpen ? ' popup_opened': ''}`}>
            <div className="popup__container">
                <h2 className="popup__title">{title}</h2>
                <form name={name} action="#" className="popup__form popup__form_name_edit" onSubmit={onSubmit}>
                    {children}
                    <button className="popup__submit-btn" type="submit">{isLoading ? 'Сохранение...' : btnText}</button>
                </form>
                <button className="popup__close-btn" type="button" onClick={onClose}/>
            </div>
        </div>
    )
}

export default PopupWithForm;