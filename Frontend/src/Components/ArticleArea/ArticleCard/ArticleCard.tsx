import { useNavigate } from "react-router-dom";
import { ArticleModel } from "../../../Models/ArticleModel";
import dateFormatter from "../../../Services/DateFormatter";
import "./ArticleCard.css";
import articleService from "../../../Services/ArticlesService";
import commentService from "../../../Services/CommentsService";
import { authStore } from "../../../Redux/AuthState";
import EditIcon from '@mui/icons-material/Edit';

function ArticleCard(article: ArticleModel): JSX.Element {

    const editor = authStore.getState().user?.roleId === 2;

    const { articleId, title, authorFullName, previewImageUrl, previewText, publicationDate, tags, views, commentsNumber } = article;

    const navigate = useNavigate();

    const openDetails = (e: any) => {
        if (e.target.id === "edit") {
            navigate(`/edit-article/${articleId}`);
        } else {
            navigate(`/article/${articleId}`);
        }
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
        <div className="ArticleCard" onClick={(e) => { openDetails(e); updateViews(); resetComments() }}>

            <div className="container-top">
                <div className="author-date">
                    <p>{dateFormatter(publicationDate)}</p>
                    <p>{authorFullName}</p>
                </div>

                <div className="tags-edit">
                    <p className="tags">{tags}</p>
                    {editor && <button><EditIcon id="edit" /></button>}
                </div>

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
