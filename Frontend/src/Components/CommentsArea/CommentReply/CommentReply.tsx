import { CommentModel } from "../../../Models/CommentModel";
import "./CommentReply.css";

function CommentReply(props: { comment: CommentModel }): JSX.Element {
    return (
        <div className="CommentReply">
            im a comment reply
        </div>
    );
}

export default CommentReply;
