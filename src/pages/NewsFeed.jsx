import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
// http:localhost/news?search=react&category=frontend
import { useAuth } from '../context/AuthContext';

// https:localhost/news?search=react&category=frontend
const ARTICLES_DATA = [
    {
        id: 'future-of-js', 
        title: 'Статья 1', 
        category: 'javascript',
        description: 'Описание статьи 1',
        authorId: 'system',
        authorName: 'Редакция'
    }, {
        id: 'css-modules', 
        title: 'Статья 2', 
        category: 'css',
        description: 'Описание статьи 2',
        authorId: 'system',
        authorName: 'Редакция'
    }, {
        id: 'react-router-v6', 
        title: 'Статья 3', 
        category: 'react',
        description: 'Описание статьи 3',
        authorId: 'system',
        authorName: 'Редакция'
    }
];

function NewsFeed() {
    const { currentUser } = useAuth();
    const [articles, setArticles] = useState([]);
    
    useEffect(() => {
        const savedArticles = localStorage.getItem('blog_articles');
        if (savedArticles) {
            setArticles(JSON.parse(savedArticles));
        } else {
            localStorage.setItem('blog_articles', JSON.stringify(ARTICLES_DATA));
        };
    }, []);
    
    // useSearchParams позволяет доставать параметры URL
    const [searchParams, setSearchParams] = useSearchParams();
    // Достаем текущее значение фильтров
    const searchQuery = searchParams.get('search') || '';
    const categoryQuery = searchParams.get('category') || '';

    const hendleSearchChange = (event) => {
        const text = event.target.value;
        // Создаем копию параметров, чтобы не повредить изначальные данные
        const newParams = new URLSearchParams(searchParams);
        
        if (text) {
            // Добавляем текст поиска в URL
            newParams.set('search', text);
        } else {
            // На случай очищения поля
            newParams.delete('search');
        }
        // Обновляем URL адрес
        setSearchParams(newParams);
    }

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        const newParams = new URLSearchParams(searchParams);

        if (category) {
            // Добавляем категорию в URL
            newParams.set('category', category);
        } else {
            // Удаляем параметры при удалении
            newParams.delete('category');
        }
        // Обновляем параметры
        setSearchParams(newParams);
    }

    // ФИЛЬТРАЦИЯ НА ОСНОВЕ ПОЛУЧЕННЫХ ЗНАЧЕНИЙ
    const filteredArticles = articles.filter((article) => {
        // в нижнем регистре, в описании или названии 
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) 
            || article.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = categoryQuery === '' || article.category === categoryQuery;
        return matchesSearch && matchesCategory;
    });

    const handleResetFilters = () => {
        // Сбрасываем фильтры URL
        // Передаем пустой объект, URL становится /news
        setSearchParams({});
    }

    return (
        <>
            <h1>Лента свежих новостей</h1>
            {/* КНОПКА ДОБАВЛЕНИЯ, ЕСЛИ ПОЛЬЗОВАТЕЛЬ АВТОРИЗОВАН */}
            { currentUser && (
                <Link to='/dashboard/create-article'>
                    + Создать сатью
                </Link>
            )}

            {/* БЛОК ФИЛЬТРОВ И ПОИСКА */}
            <div style={{
                display: 'flex',
                gap: '15px',
                alignItems: 'center'
            }}>
                {/* ПОЛЕ ПОИСКА ТЕКСТОВОЕ */}
                <div>
                    <label htmlFor="search-input">Поиск по тексту</label>
                    <input 
                        type="text"
                        id="search-input"
                        value={searchQuery}
                        onInput={hendleSearchChange}
                    />
                </div>
                {/* ВЫПАДАЮЩИЙ СПИСОК КАТЕГОРИЙ */}
                <div>
                    <label htmlFor="category-select">Категории</label>
                    <select
                        id="category-select"
                        value={categoryQuery}
                        onChange={handleCategoryChange}
                    >
                        <option value="">Все категории</option>
                        <option value="javascript">Java Script</option>
                        <option value="css">CSS</option>
                        <option value="react">React</option>
                    </select>
                </div>
                {/* КНОПКА СБРОСА ПАРАМЕТРОВ */}
                {(searchQuery || categoryQuery) && (
                    <button onClick={handleResetFilters}>
                        Сбросить фильтры
                    </button>
                )}
            </div>
            <div>
                { filteredArticles.length > 0 ? (
                    filteredArticles.map((a) => (
                        <article key={a.id}>
                            <span>{a.authorName}</span>
                            <h2>{a.title}</h2>
                            <h2>{a.description}</h2>
                            <span>{a.category.toUpperCase()}</span>
                            <Link to={`/news/${a.id}`}>
                                Читать полностью
                            </Link>
                            { currentUser && currentUser.id === a.authorId && (
                                <Link to={`/dashboard/edit-article/${a.id}`}>
                                    Редактировать
                                </Link>
                            )}
                        </article>
                    ))
                ) : (
                    <p>По вашему запросу ничего не найдено</p>
                )}
                {/* 
                    {ARTICLES_DATA.map((article) => (
                    <article key={article.id}>
                        <h2>{article.title}</h2>
                        <h2>{article.description}</h2>
                        <Link to={`/news/${article.id}`}>
                            Читать полностью
                        </Link>
                    </article>
                ))} 
                 */}
            </div>
        </>
    );
}; 

export default NewsFeed;