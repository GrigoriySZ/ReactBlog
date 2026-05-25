import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext'

function Login() {
    // Создаем хуки состояний 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Проверям изначальную локацию пользователя
    // Если шел в кабинет после авторизации - вернум в кабинет;
    // Если зашел на страницу логина сам - перенаправим на страницу news
    const fromPage = location.state?.from?.pathname || '/news';

    const handlerSubmit = (e) => {
        e.prevenDefault();
        setError('');  // Сброс старых ошибок

        if (!username.trim() || !password.trim()) {
            setError('Все поля должны быть заполнены');
            return;
        }
        
        const result = login(username, password);
        
        // Проверка логирования
        if (result.success) {
            // Перенаправляме туда, куда шел изначально
            navigate(fromPage, { replace: true });
        } else {
            setError(result.message);
        }
    };

    return (
        <div style={{ 
            maxWidth: '400px', 
            margin: '50px auto'
        }}>
            <h2>Войти в аккаунт</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handlerSubmit}>
                <input 
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">
                    Войти
                </button>
            </form>
            <p>
                Ещё нет аккаунте? 
                <Link to='/register'>Зарегестрироваться</Link>
            </p>
        </div>
    );
}

export default Login;