import {useState} from "react";

const Login = ({onLogin}) => {
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
        onLogin(email, password);
    }

    return (
        <section className="login">
            <h2 className="login__title">Вход</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <input className="login__input" type="email" placeholder="Почта" value={email} onChange={editEmail}
                       required/>
                <input className="login__input" type="password" placeholder="Ваш пароль" value={password}
                       onChange={editPassword} autoComplete="on" required/>
                <button className="login__btn" type="submit">Войти</button>
            </form>
        </section>
    )
}

export default Login;