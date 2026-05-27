import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import './BlogLayout.css';

function BlogLayout() {
    const setActiverClass = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link';

    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        logout();
        navigate('/news');
    };

    return (
        <>
            <header>
                <div>
                    <Link to={{ pathname: '/news' }}>IT-NEWS-BLOG</Link>
                </div>
                <nav>
                    <NavLink to="/news" className={setActiverClass}>Лента </NavLink>
                    <NavLink to="/about" className={setActiverClass}>О нас </NavLink>
                    <NavLink to="/dashboard/profile" className={setActiverClass}>
                        Кабинет автора 
                    </NavLink>
                    {/* БЛОК АВТОРИЗАЦИИ */}
                    <div>
                        { currentUser ? (
                            <>
                                <span>Привет, {currentUser.username}</span>
                                <button onClick={handleLogoutClick}>Выйти</button>
                            </>
                        ) : (
                            <Link to='/Login'>Войти</Link>
                        )};
                    </div>
                </nav>
            </header>
            <main>
                {/* Указывает React роутеру куда именно внутри макета нужно 
                    вставлять дочерние компоненты 
                */}
                <Outlet />
            </main>
            <footer>
                <p>&copy; 2026 Все права защищены</p>
            </footer>
        </>
    );
};

export default BlogLayout;