import {useState} from "react";
import {Link, withRouter} from "react-router-dom";

const Register = ({onRegister}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function editEmail(e) {
        setEmail(e.target.value);
    }

    function editPassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(email, password);
    }


    return (
        <section className="login">
            <h2 className="login__title">Регистрация</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <input className="login__input" type="email" placeholder="Почта" value={email} onChange={editEmail}
                       required/>
                <input className="login__input" type="password" placeholder="Ваш пароль" value={password}
                       onChange={editPassword} required/>
                <button className="login__btn" type="submit">Зарегистрироваться</button>
            </form>
            <p className="login__text">Уже зарегистрированы? <Link to="/sign-in" className="login__link">Войти</Link>
            </p>
        </section>
    )
}

export default Register;