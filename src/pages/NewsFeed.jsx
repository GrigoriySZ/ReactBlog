import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ARTICLE_DATA = [
    {
        id: 'future-of-js', 
        title: 'Статья 1', 
        description: 'Описание статьи 1',
        authorId: 'system',
        authorName: 'Редакция'
    }, {
        id: 'css-modules', 
        title: 'Статья 2', 
        description: 'Описание статьи 2',
        authorId: 'system',
        authorName: 'Редакция'
    }, {
        id: 'react-router-v6', 
        title: 'Статья 3', 
        description: 'Описание статьи 3',
        authorId: 'system',
        authorName: 'Рудакция'
    }
];

function NewsFeed() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const savedArticles = localStorage.getItem('blog_articles');
        if (savedArticles) {
            setArticles(JSON.parse(savedArticles));
        } else {
            localStorage.setItem('blog_articles', JSON.stringify(ARTICLE_DATA));
        };
    }, []);
    
    return (
        <>
            <h1>Лента свежих новостей</h1>
            <div>
                {ARTICLE_DATA.map((article) => (
                    <article key={article.id}>
                        <h2>{article.title}</h2>
                        <h2>{article.description}</h2>
                        <Link to={`/news/${article.id}`}>
                            Читать полностью
                        </Link>
                    </article>
                ))}
            </div>
        </>
    );
}; 

export default NewsFeed;