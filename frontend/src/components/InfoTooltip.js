import registerTrue from '../images/register-ok.png'
import registerFalse from '../images/register-false.png'

const InfoTooltip = ({isOpen, onClose, name, isStatusRegister}) => {
    return (
        <div className={`popup popup_${name} ${isOpen ? ' popup_opened': ''}`}>
            <div className="popup__container popup__container_status">
                <img className="popup__status" src={isStatusRegister? registerTrue : registerFalse} alt=""/>
                <h2 className="popup__info">{isStatusRegister ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
                <button className="popup__close-btn" type="button" onClick={onClose}/>
            </div>
        </div>
    )
}

export default InfoTooltip;