import { useState, useRef } from "react";

function Login({ title, onLogin, isValid, buttonText}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const authRef = useRef();

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleFocus(e) {
        e.target.select();
    }

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(password, email);
    }

    return (
        <div className="auth">
            <form 
                ref={authRef}
                className="auth__form"
                noValidate
                name="login"
                action="#"
                id="login"
                onSubmit={handleSubmit}
            >
                <h2 className="auth__title">{title}</h2>
                <input 
                    className="auth__input auth__input_type_email"
                    value={email}
                    type="email"
                    required
                    onFocus={handleFocus}
                    name="email"
                    placeholder="Email"
                    onChange={handleEmail}
                />
                <input 
                    className="auth__input auth__input_type_password"
                    value={password}
                    type="password"
                    required
                    minLength="4"
                    maxLength="20"
                    onFocus={handleFocus}
                    name="password"
                    placeholder="Password"
                    onChange={handlePassword}
                />
                <button 
                    className="auth__submit-btn"
                    type="submit"
                    form="register"
                >
                    {buttonText}
                </button>
            </form>
        </div>
    )
}

export default Login;