import { useNavigate } from "react-router-dom";
import { ArticleModel } from "../../../Models/ArticleModel";
import dateFormatter from "../../../Services/DateFormatter";
import "./ArticleCard.css";
import articleService from "../../../Services/ArticlesService";
import commentService from "../../../Services/CommentsService";

function ArticleCard(article: ArticleModel): JSX.Element {

    console.log(article);

    const { articleId, title, authorFullName, previewImageUrl, previewText, publicationDate, tags, views, commentsNumber } = article;

    const navigate = useNavigate();

    const openDetails = () => {
        navigate(`/article/${articleId}`);
    }

    const updateViews = async () => {
        try {
            await articleService.updateViews(+articleId);
        } catch (err: any) {
            console.log(err);
        }
    }

    const resetComments = () => {
        commentService.resetComments();
    };

    return (
        <div className="ArticleCard" onClick={() => { openDetails(); updateViews(); resetComments() }}>

            <div className="container-top">
                <div className="author-date">
                    <p>{dateFormatter(publicationDate)}</p>
                    <p>{authorFullName}</p>
                </div>

                <p className="tags">{tags}</p>
            </div>

            <div className="container-image">
                <img src={previewImageUrl} />
            </div>

            <div className="container-right">
                <p className="title">{title}</p>
                <p className="preview-text">{previewText}</p>

                <div className="details">
                    <p className="views">Views: {views}</p>
                    <p className="comments-number">Comments: {commentsNumber}</p>
                </div>
            </div>

            <hr />

        </div>
    );
}

export default ArticleCard;
