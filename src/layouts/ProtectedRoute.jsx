import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {

    // Записываем, откуда пришел пользователья
    const location = useLocation();  
    const { currentUser } = useAuth();

    // ЕСЛИ ПОЛЬЗОВАТЕЛЬ НЕ АВТОРИЗОАН
    if (!currentUser) {
        // state-сохраняет текущий адрес, чтобы после логина вернуть юзера назад
        return <Navigate to='/login' state={{ from: location}} replace />
    }
    // ЕСЛИ ПОЛЬЗОВАТЛЬ АВТОРИЗОВАН
    // Возвращаем дочерний компонент (dashboard)
    return children;
};

export default ProtectedRoute;