import { ArticleModel } from "../../../Models/ArticleModel";
import dateFormatter from "../../../Services/DateFormatter";
import "./ArticleCard.css";

function ArticleCard(article: ArticleModel): JSX.Element {

    console.log(article);
    const { title, authorFullName, previewImage, previewText, publicationDate, tags, views, commentsNumber } = article;

    return (
        <div className="ArticleCard">

            <div className="container-left">
                <div className="author-date">
                    <p>{dateFormatter(publicationDate)}</p>
                    <p>{authorFullName}</p>
                </div>

                <img src="https://img.freepik.com/free-vector/matrix-style-binary-code-digital-falling-numbers-blue-background_1017-37387.jpg?w=360" />
            </div>

            <div className="container-right">
                <p className="title">{title}</p>
                <p className="preview-text">{previewText}</p>

                <div className="details">
                    <p className="views">Views: {views}</p>
                    <p className="comments-number">Comments: {commentsNumber}</p>
                </div>
            </div>

        </div>
    );
}

export default ArticleCard;
