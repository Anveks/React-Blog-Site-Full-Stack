import { useRef } from "react";
import "./AddComment.css";
import { authStore } from "../../../Redux/AuthState";
import { useParams } from "react-router-dom";
import commentService from "../../../Services/CommentsService";
import { getCurrentDateTime } from "../../../Services/GetCurrentDate";
import { commentsStore, CommentsActionType } from "../../../Redux/CommentsState";

function AddComment(): JSX.Element {

    const textareaRef = useRef(null);
    const params = useParams();

    const addComment = async () => {

        const comment: any = {
            "authorId": +authStore.getState().user.userId,
            "articleId": +params.id,
            "content": textareaRef.current.value,
            "parentCommentId": null
        }

        try {
            await commentService.addComment(comment);
        } catch (err: any) {
            console.log(err);
        }

        textareaRef.current.value = "";
    }

    return (
        <div className="AddComment">
            <h4>Add a comment: </h4>

            <textarea
                placeholder="Type your comment here..."
                ref={textareaRef}>
            </textarea>

            <button onClick={addComment}>Submit</button>
        </div>
    );
}

export default AddComment;
