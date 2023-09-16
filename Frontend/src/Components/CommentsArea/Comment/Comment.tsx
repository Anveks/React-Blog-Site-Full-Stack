import { useRef, useState } from "react";
import { CommentModel } from "../../../Models/CommentModel";
import { authStore } from "../../../Redux/AuthState";
import commentService from "../../../Services/CommentsService";
import dateFormatter from "../../../Services/DateFormatter";
import notifyService from "../../../Services/NotifyService";
import "./Comment.css";

function Comment(props: CommentModel): JSX.Element {

    const { authorFullName, content, commentDate, dislikeCount, likeCount, authorId, commentId, isEdited } = props;
    console.log(isEdited);

    const currentId = authStore.getState().user?.userId;

    const [visible, setVisible] = useState<boolean>(true);
    const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

    const [currentContent, setCurrentContent] = useState<string>(content);
    const [editable, setEditable] = useState<boolean>(false);
    const textareaRef = useRef(null);

    const deleteComment = async () => {
        try {
            await commentService.deleteComment(commentId);
            notifyService.success("Comment has been deleted.");

            setIsFadingOut(true);
            setTimeout(() => {
                setVisible(false); // After the animation, hide the comment
            }, 500);

        } catch (err: any) {
            console.log(err);
        }
    };

    const updateComment = async () => {
        if (!editable) {
            setEditable(true);
        } else {
            const updatedContent = textareaRef.current.value;
            try {
                await commentService.updateComment(commentId, updatedContent);
            } catch (err: any) {
                console.log(err);
            }
            setCurrentContent(updatedContent);
            setEditable(false);
        }
    };

    if (!visible) return null;

    return (
        <div className={`Comment ${isFadingOut ? "fade-out" : ""}`}>
            <div className="comment-image">
                <p>{authorFullName}</p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" />
            </div>

            <div className="date-content">
                <p className="date">{dateFormatter(commentDate)}</p>
                {currentId === authorId
                    ? <><button className="delete-btn" onClick={deleteComment}>Delete</button>
                        <button className="upd-button" onClick={updateComment}>{editable ? "Save" : "Update"}</button></>
                    : ""}
                {
                    editable
                        ? <textarea ref={textareaRef} placeholder={currentContent}></textarea>
                        : <p>{currentContent}</p>
                }

                <div className="likes">
                    <p>▲ {likeCount}</p>
                    <p>▼ {dislikeCount}</p>
                </div>

            </div>
        </div>
    );
}

export default Comment;
