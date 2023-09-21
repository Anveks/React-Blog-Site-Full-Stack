import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArticleModel } from "../../../Models/ArticleModel";
import articleService from "../../../Services/ArticlesService";
import "./ArticleDetails.css";
import dateFormatter from "../../../Services/DateFormatter";
import CommentsSection from "../../CommentsArea/CommentsSection/CommentsSection";

//@ts-nocheck

function ArticleDetails(): JSX.Element {

    const params = useParams();
    const id = +params.id;
    const [article, setArticle] = useState<ArticleModel>();
    console.log(article);


    useEffect(() => {
        articleService.getOneArticle(id)
            .then((article) => {
                setArticle(article);
            }).catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="ArticleDetails">
            {article ? (
                <div>
                    <div className="details-top">
                        <h2>{article?.title}</h2>
                        <div className="author-date">
                            <p>{article?.authorFullName}</p>
                            <p>{dateFormatter(article?.publicationDate)}</p>
                        </div>
                    </div>

                    <div className="details-image">
                        <img src={article?.headImageUrl} />
                    </div>

                    <p className="preview-text"> ▷ {article?.previewText}</p>

                    <p className="main-text">{article?.content}</p>

                    <p className="tags">Tags: {article?.tags}</p>

                    <hr />

                    <CommentsSection articleId={article?.articleId} />

                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ArticleDetails;
