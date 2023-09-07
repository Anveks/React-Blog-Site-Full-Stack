import { useEffect, useState } from "react";
import { ArticleModel } from "../../../Models/ArticleModel";
import "./Home.css";
import articleService from "../../../Services/ArticlesService";
import ArticleCard from "../../ArticleArea/ArticleCard/ArticleCard";

function Home(): JSX.Element {

    const [articles, setArticles] = useState<ArticleModel[]>([]);

    useEffect(() => {
        articleService.getAllArticles()
            .then((data) => {
                setArticles(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <div className="Home">
            {/* SLIDER COMPONENT */}

            {articles.map((article) => <ArticleCard {...article} key={article.articleId} />)}
        </div>
    );
}

export default Home;
