import registerTrue from '../images/register-ok.png'
import registerFalse from '../images/register-false.png'

const InfoTooltip = ({isOpen, onClose, name, isStatusInfoToolTip, isStatusInfoToolTipText}) => {
    return (
        <div className={`popup popup_${name} ${isOpen ? ' popup_opened': ''}`}>
            <div className="popup__container popup__container_status">
                <img className="popup__status" src={isStatusInfoToolTip? registerTrue : registerFalse} alt=""/>
                <h2 className="popup__info">{isStatusInfoToolTipText}</h2>
                <button className="popup__close-btn" type="button" onClick={onClose}/>
            </div>
        </div>
    )
}

export default InfoTooltip;