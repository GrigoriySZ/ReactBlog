import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
// http:localhost/news?search=react&category=frontend
import { useAuth } from '../context/AuthContext';

// https:localhost/news?search=react&category=frontend
const ARTICLE_DATA = [
    {
        id: 'future-of-js', 
        title: 'Статья 1', 
        description: 'Описание статьи 1',
        authorId: 'system',
        authorName: 'Редакция',
        category: 'javascript'
    }, {
        id: 'css-modules', 
        title: 'Статья 2', 
        description: 'Описание статьи 2',
        authorId: 'system',
        authorName: 'Редакция',
        category: 'css'
    }, {
        id: 'react-router-v6', 
        title: 'Статья 3', 
        description: 'Описание статьи 3',
        authorId: 'system',
        authorName: 'Редакция',
        category: 'react'
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
            localStorage.setItem('blog_articles', JSON.stringify(ARTICLE_DATA));
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
                {/* ВЫПАДАЮЩИЙ СПИСОК КАТЕГОРИИ */}
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
                    filteredArticles.map((article) => (
                        <article key={article.id}>
                            <span>{article.authorName}</span>
                            <h2>{article.title}</h2>
                            <h2>{article.description}</h2>
                            <span>{article.category}</span>
                            <Link to={`/news/${article.id}`}>
                                Читать полностью
                            </Link>
                            { currentUser && currentUser.id === article.authorId && (
                                <Link to={`/dashboard/edit-article/${article.id}`}>
                                    Редактировать
                                </Link>
                            )}
                        </article>
                    ))
                ) : (
                    <p>По вашему запросу ничего не найдено</p>
                )}
                {/* 
                    {ARTICLE_DATA.map((article) => (
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