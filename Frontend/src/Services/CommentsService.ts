import axios from "axios";
import appConfig from "../Utils/AppConfig";
import { CommentModel } from "../Models/CommentModel";
import { CommentsActionType, commentsStore } from "../Redux/CommentsState";

class CommentService {
  public async getCommentsPerArticle(articleId: number): Promise<CommentModel[]> {
    let comments = commentsStore.getState().comments;

    if (comments.length === 0) {
      const result = await axios.get<CommentModel[]>(appConfig.comments + articleId);
      comments = result.data;
      commentsStore.dispatch({type: CommentsActionType.FetchComments, payload:comments});
    }
    
    return comments;
  }

  public async addComment(comment: Object): Promise<void> {
    const result = await axios.post<CommentModel>(appConfig.comments, comment);
    const newComment = result.data;
    commentsStore.dispatch({type: CommentsActionType.AddComment, payload:newComment});
  }

}

const commentService = new CommentService();

export default commentService;