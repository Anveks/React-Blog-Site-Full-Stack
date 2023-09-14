import { CommentModel } from "../../../Models/CommentModel";
import { authStore } from "../../../Redux/AuthState";
import commentService from "../../../Services/CommentsService";
import dateFormatter from "../../../Services/DateFormatter";
import "./Comment.css";

function Comment(props: CommentModel): JSX.Element {
    const { authorFullName, content, commentDate, dislikeCount, likeCount, authorId, commentId } = props;
    const currentId = authStore.getState().user.userId;

    const deleteComment = async () => {
        try {
            await commentService.deleteComment(commentId);
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <div className="Comment">
            <div className="comment-image">
                <p>{authorFullName}</p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" />
            </div>

            <div className="date-content">
                <p className="date">{dateFormatter(commentDate)}</p>
                {currentId === authorId
                    ? <><button className="delete-btn" onClick={deleteComment}>Delete</button>
                        <button className="upd-button">Update</button></>
                    : ""}

                <p>{content}</p>

                <div className="likes">
                    <p>▲ {likeCount}</p>
                    <p>▼ {dislikeCount}</p>
                </div>

            </div>
        </div>
    );
}

export default Comment;
