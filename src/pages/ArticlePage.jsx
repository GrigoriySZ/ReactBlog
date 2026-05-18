import { useParams, useNavigate } from "react-router-dom";

function ArticlePage() {
    // В main.jsx взят из Route "news/:articleId"
    const { articleId } = useParams();
    // navigate возвращает функцию, которой можно программно менять URL
    const navigate = useNavigate();
    // Возвращает на 1 страницу назад (аналог кнопки "Назад")
    const handleGoBack = () => {
        navigate(-1);
    };
    // Возвращаент к новостям
    const handleGoHome = () => {
        navigate('/news')
    };

    return (
        <>
            <button onClick={handleGoBack}>⬅Назад в ленту</button>
            <div>
                <h1>Вы читаете сатаью {artickleId}</h1>
                <p>Здесь полноценный текст статьи</p>
            </div>
            <button onClick={handleGoHome}>⏹На главную ленту</button>
        </>
    );
};

export default ArticlePage;