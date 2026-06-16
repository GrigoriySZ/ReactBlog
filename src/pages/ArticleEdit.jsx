import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ArticleForm() {
    const { currentUser } = useAuth();
    const { articleId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const [error, setError] = useState('');

    const isEditMode = Boolean(articleId);

    useEffect(() => {
        if (isEditMode) {
            const articles = JSON.parse(localStorage.getItem('blog_articles') || '[]');
            const articleEdit = articles.find(a => a.id === articleId);
            if (!articleEdit) {
                setError('Статья не найдена');
                return;
            };
            // ЖЕСТКАЯ ПРОВЕРКА: именно автор пытается редактировать
            if (articleEdit.authorId !== currentUser.id) {
                alert('ВЫ МОЖЕТЕ РЕДАКТИРОВАТЬ ТОЛЬКО СВОИ СТАТЬИ');
                navigate('/news');
                return;
            }
            setTitle(articleEdit.title);
            setCategory(articleEdit.category);
            setDescription(articleEdit.description);
        }
    }, [articleId, currentUser, isEditMode, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!title.trim() || !category.trim() || !description.trim()) {
            setError('Пожалуйста, заполните все поля');
            return;
        }
        const articles = JSON.parse(localStorage.getItem('blog_articles') || '[]');
        if (isEditMode) {
            const updateArticle = articles.map(a => {
                if (a.id === articleId) {
                    return {
                        ...a,
                        title,
                        category,
                        description
                    };
                }
                return a;
            });
            localStorage.setItem('blog_articles', JSON.stringify(updateArticle));
        } else {
            const newArticle = {
                id: Date.now().toString(),
                title,
                category,
                description,
                authorId: currentUser.id,
                authorName: currentUser.username
            };
            articles.unshift(newArticle);
            localStorage.setItem('blog_articles', JSON.stringify(articles));
        };
        navigate('/news');
    };

    const handleDelete = () => {
        setError('');
        // Проверяем на факт редактирования статьи
        if (!isEditMode) return;

        const articles = JSON.parse(localStorage.getItem('blog_articles') || '[]');
        const articleDelete = articles.find(a => a.id === articleId);

        if (!articleDelete) {
            setError('Статья не найдена');
            navigate('/news');
            return;
        };

        // ЖЕСТКАЯ ПРОВЕРКА: именно автор пытается редактировать
        if (articleDelete.authorId !== currentUser.id) {
            alert('ВЫ МОЖЕТЕ РЕДАКТИРОВАТЬ ТОЛЬКО СВОИ СТАТЬИ');
            navigate('/news');
            return;
        }

        if (confirm(`Вы действительно хотите удалить статью "${articleDelete.title}"`)) {
            // Отсортировываем список статей без удаленной
            const newArticlesList = articles.filter((article) => article.id !== articleDelete.id);

            // Передаем новый набор статей в localStorage
            localStorage.setItem('blog_articles', JSON.stringify(newArticlesList));
            alert(`Статья "${articleDelete.title}" успешно удалена`);
            navigate('/news');
            return;
        }

        // Сообщение в случае отмены или перезагрузки статьи
        alert('Удаление статьи отменено');
    };

    return(
        <div>
            <h2>
                { isEditMode ? "Редактировать статью" : "Создать статью"}
            </h2>
            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Введите заголовок"
                />
                <input 
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Введите категорию"
                />
                <textarea
                    rows='10'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Введите текст статьи"
                />
                <button type="submit">Сохранить</button>
                <button 
                    type="button"
                    onClick={handleDelete}
                >
                    Удалить
                </button>
                <button
                    type="button"
                    onClick={() =>
                        navigate(-1)
                    }
                >
                    Отмена
                </button>
            </form>
        </div>
    );
}

export default ArticleForm;