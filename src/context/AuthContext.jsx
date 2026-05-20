import { createContext, useContext, useState, useEffect } from 'react';

// Контектс - это "коробка" в которой будут лежать данные об авторизации
const AuthContext = createContext(null);

function AuthProvider( {childred} ) {

    // Для хранения текущего вошедшего пользователя
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem('active_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const register = (username, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists =  users.some(u => u.username === username);
        if (userExists) {
            return {success: false, message: 'Пользователь с таким именем уже существует'};
        } 
        // Создаем объект нового пользователя
        const newUser = {
            id: Date.now().toString(),
            username,
            password
        }; 
        // Добавляем нового пользователя в список пользователей
        users.push(newUser);
        // Перезаписываем список пользователей
        localStorage.setItem('users', JSON.stringify(users));
        return {success: true, message: 'Регистрация успешна'};
    };

    const login = (username, password) => {
        const activeUsers = JSON.parse(localStorage.getItem('active_user') || '[]');
        const activeUser = activeUsers.find(
            u => u.username === username && 
            u.password === password
        );
        if (activeUser) {
            setCurrentUser(activeUser);
            localStorage.setItem('active_user', JSON.stringify(user));
            return{success: true, message: 'Вы успешно вошли'};
        } else {
            return {
                success: false, 
                message: 'Такого пользователя не существуе или пароль неверный'
            };
        };
        
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('active_user');
    };

    // Добавить проброс
}; 

// Создаем собственный хук для удобного использования контекста в 
// других компонентах
function useAuth() {
    return useContext(AuthContext);
}

export default useAuth;