import { CommentModel } from "../../../Models/CommentModel";
import dateFormatter from "../../../Services/DateFormatter";
import "./Comment.css";

function Comment(props: CommentModel): JSX.Element {
    const { authorFullName, commentContent, commentDate, dislikeCount, likeCount } = props;

    return (
        <div className="Comment">
            <div className="comment-image">
                <p>{authorFullName}</p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" />
            </div>

            <div className="date-content">

                <p className="date">{dateFormatter(commentDate)}</p>

                <p>{commentContent}</p>

                <div className="likes">
                    <p>▲ {likeCount}</p>
                    <p>▼ {dislikeCount}</p>
                </div>

            </div>
        </div>
    );
}

export default Comment;
