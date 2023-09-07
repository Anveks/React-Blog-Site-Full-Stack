import { useEffect, useState } from "react";
import "./CommentsSection.css";
import { CommentModel } from "../../../Models/CommentModel";
import commentService from "../../../Services/CommentsService";
import Comment from "../Comment/Comment";

interface CommentsSectionProps {
    articleId: number;
}

function CommentsSection({ articleId }: CommentsSectionProps): JSX.Element {

    const [comments, setComments] = useState<CommentModel[]>([]);

    useEffect(() => {
        commentService.getCommentsPerArticle(+articleId)
            .then((data) => {
                setComments(data);
            }).catch((err) => {
                console.log(err);

            });
    }, []);

    console.log(comments);

    return (
        <div className="CommentsSection">
            {comments.length > 0 ? (
                <div>
                    <h3>Comments</h3>
                    {comments.map((comment) => <Comment {...comment} key={comment.commentId} />)}
                </div>
            ) : (
                <h3>No comments have been added yet.</h3>
            )}
        </div>
    );
}

export default CommentsSection;
