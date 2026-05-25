import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext'

function Register() {
    // Создаем хуки состояний 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');  // Сброс старых ошибок
        setMessage('');

        if (!username.trim() || !password.trim()) {
            setError('Все поля должны быть заполнены');
            return;
        }
        
        const result = register(username, password);
        
        // Проверка регистрации
        if (result.success) {
            setMessage(result.message);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } else {
            setError(result.message);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto' }}>
            <h2>Регистрация</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}
            <form onSubmit={handleSubmit}>
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
                    Зарегестрироваться
                </button>
            </form>
            <p>
                Есть аккаунт? 
                <Link to='/login'>Войти в аккаунт</Link>
            </p>
        </div>
    );
}

export default Register;