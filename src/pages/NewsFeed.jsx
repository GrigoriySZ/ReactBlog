import { Link, useSearchParams } from 'react-router-dom';

// https:localhost/news?search=react&category=frontend
const ARTICLE_DATA = [
    {
        id: 'future-of-js', 
        title: 'Статья 1', 
        description: 'Описание статьи 1',
        category: 'javascript'
    }, {
        id: 'css-modules', 
        title: 'Статья 2', 
        description: 'Описание статьи 2',
        category: 'css'
    }, {
        id: 'react-router-v6', 
        title: 'Статья 3', 
        description: 'Описание статьи 3',
        category: 'react'
    }
];

function NewsFeed() {
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
            newParams.delete;
        }
        // Обновляем параметры
        setSearchParams(newParams);
    }

    // ФИЛЬТРАЦИЯ НА ОСНОВЕ ПОЛУЧЕННЫХ ЗНАЧЕНИЙ
    const filteredArticles = ARTICLE_DATA.filter((article) => {
        // в нижнем регистре, в описании или названии 
        const matchesSearch = 
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.description.toLowerCase().includes(searchQuery.toLowerCase());

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
                        <option value="javascript">JavaScript</option>
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
                {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                        <article key={article.id}>
                            <h2>{article.title}</h2>
                            <h2>{article.description}</h2>
                            <span>{article.category.toUpperCase()}</span>
                            <Link to={`/news/${article.id}`}>
                                Читать полностью
                            </Link>
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