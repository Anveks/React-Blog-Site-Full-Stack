import { useRef } from "react";
import "./AddReply.css";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { useParams } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import commentService from "../../../Services/CommentsService";
import notifyService from "../../../Services/NotifyService";

interface AddReplyProps {
    authorFullName: string;  // defining the expected prop and its type
    parentCommentId: number;
    toggleReply: () => void; // defining a func that does not return something meaningful
}

function AddReply(props: AddReplyProps): JSX.Element {

    const textareaRef = useRef(null);
    const params = useParams();

    const sendReply = async () => {

        const comment: any = {
            "authorId": +authStore.getState().user.userId,
            "articleId": +params.id,
            "content": textareaRef.current.value,
            "parentCommentId": props.parentCommentId
        }

        try {
            await commentService.addComment(comment);
            props.toggleReply();
            notifyService.success("Reply sent!");
        } catch (err: any) {
            console.log(err);
        }

        textareaRef.current.value = "";
    }

    return (
        <div className="AddReply">
            <p> <SubdirectoryArrowRightIcon /> Reply to: {props.authorFullName}</p>

            <div className="reply-container">
                <textarea
                    placeholder="reply..."
                    ref={textareaRef}>
                </textarea>

                <button onClick={sendReply}>Send</button>
            </div>

        </div>


    );
}

export default AddReply;
