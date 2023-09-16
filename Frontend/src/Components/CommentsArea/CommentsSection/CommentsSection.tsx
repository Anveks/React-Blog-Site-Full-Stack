import { useEffect, useState } from "react";
import "./CommentsSection.css";
import { CommentModel } from "../../../Models/CommentModel";
import commentService from "../../../Services/CommentsService";
import Comment from "../Comment/Comment";
import { authStore } from "../../../Redux/AuthState";
import AddComment from "../AddComment/AddComment";
import { commentsStore } from "../../../Redux/CommentsState";

interface CommentsSectionProps {
    articleId: number;
}

function CommentsSection({ articleId }: CommentsSectionProps): JSX.Element {

    const [token, setToken] = useState<string>(authStore.getState().token);
    const [comments, setComments] = useState<CommentModel[]>(commentsStore.getState().comments);

    console.log(comments);


    // get all comments
    useEffect(() => {
        commentService.getCommentsPerArticle(+articleId)
            .then((data) => {
                setComments(data);
            }).catch((err) => {
                console.log(err);

            });
    }, []);

    // checking the token for the feature of adding a new comment
    useEffect(() => {
        const unsubscribe = authStore.subscribe(() => {
            setToken(authStore.getState().token);
        });

        return () => unsubscribe();
    }, []);

    // checking if there are any new comments added:
    useEffect(() => {
        const unsubscribe = commentsStore.subscribe(() => {
            setComments(commentsStore.getState().comments);
        });

        return () => unsubscribe();
    }, []);

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

            {
                token && <AddComment />
            }
        </div>
    );
}

export default CommentsSection;
