import { useState, useRef } from "react";
import { CommentModel } from "../../../Models/CommentModel";
import { authStore } from "../../../Redux/AuthState";
import commentService from "../../../Services/CommentsService";
import notifyService from "../../../Services/NotifyService";
import "./CommentReply.css";
import dateFormatter from "../../../Services/DateFormatter";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { commentsStore } from "../../../Redux/CommentsState";
import AddReply from "../AddReply/AddReply";

function CommentReply(props: { comment: CommentModel }): JSX.Element {

    const { authorFullName, content, commentDate, dislikeCount, likeCount, authorId, commentId, isEdited, parentCommentId } = props.comment;

    const reduxComments = commentsStore.getState().comments;
    const parentComment = reduxComments.filter((c) => c.commentId === parentCommentId);

    const currentId = authStore.getState().user?.userId;

    const [visible, setVisible] = useState<boolean>(true);
    const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

    const [currentContent, setCurrentContent] = useState<string>(content);
    const [editable, setEditable] = useState<boolean>(false);
    const [edited, setEdited] = useState<number>(isEdited);
    const textareaRef = useRef(null);

    const [isAddReplyVisible, setIsAddReplyVisible] = useState(false);

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
            setEdited(1);
        }
    };

    const toggleReply = () => {
        setIsAddReplyVisible(!isAddReplyVisible);
    };

    if (!visible) return null;

    return (
        <><div className="CommentReply">
            <p> <SubdirectoryArrowRightIcon /> </p>

            <div className="comment-image">
                <p>{authorFullName}</p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" />
            </div>


            <div className="date-content">
                <div className="date">
                    <p>
                        {dateFormatter(commentDate)}
                        &nbsp;
                        {parentComment && 'Replied to ' + parentComment[0].authorFullName}
                        &nbsp;
                        {edited === 0 || edited === undefined ? "" : "edited"}
                    </p>

                    <div>
                        {currentId === authorId
                            ? <>
                                {/* EDIT BUTTON */}
                                <button
                                    className={currentContent.length > 0 ? "" : "disabled"}
                                    disabled={currentContent.length > 0 ? false : true}
                                    onClick={updateComment}>
                                    {editable
                                        ? <SaveIcon />
                                        : <EditIcon />}
                                </button>

                                {/* DELETE BUTTON */}
                                <button
                                    className={!editable ? "" : "disabled"}
                                    disabled={!editable ? false : true}
                                    onClick={deleteComment}>
                                    <ClearIcon />
                                </button>
                            </>
                            : ""}
                    </div>
                </div>

                {/* EDIT TEXTAREA */}
                {editable
                    ? <textarea
                        ref={textareaRef}
                        value={currentContent}
                        onChange={(e) => setCurrentContent(e.target.value)}>
                    </textarea>
                    : <div>
                        <p className="parent-comment">{parentComment[0].content}</p>
                        <p>{currentContent}</p>
                    </div>}

                <div className="likes">
                    <button onClick={toggleReply}>Reply</button>
                    <p>▲ {likeCount}</p>
                    <p>▼ {dislikeCount}</p>
                </div>

            </div>
        </div><>
                {isAddReplyVisible && <AddReply authorFullName={authorFullName} parentCommentId={commentId} toggleReply={toggleReply} />}
            </><>
                {commentsStore.getState().comments
                    .filter((comment) => comment.parentCommentId === commentId)
                    .map((comment) => <CommentReply comment={comment} key={comment.commentId} />)}
            </></>
    );
}

export default CommentReply;
