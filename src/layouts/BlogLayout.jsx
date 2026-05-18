import { NavLink, Link, Outlet } from "react-router-dom";
import './BlogLayout.css';

function BlogLayout() {
    const setActiverClass = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link';

    return (
        <>
            <header>
                <div>
                    <Link to={{ pathname: '/news' }}>IT-NEWS-BLOG</Link>
                    <nav>
                        <NavLink to="/news" className={setActiverClass}>Лента </NavLink>
                        <NavLink to="/about" className={setActiverClass}>О нас </NavLink>
                        <NavLink to="/dashboard/profile" className={setActiverClass}>
                            Кабинет автора 
                        </NavLink>
                    </nav>
                </div>
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