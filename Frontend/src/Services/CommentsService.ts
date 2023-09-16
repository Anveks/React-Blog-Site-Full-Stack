import axios from "axios";
import appConfig from "../Utils/AppConfig";
import { CommentModel } from "../Models/CommentModel";
import { CommentsActionType, commentsStore } from "../Redux/CommentsState";
import { authStore } from "../Redux/AuthState";
import { getCurrentDateTime } from "./GetCurrentDate";

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

  public async addComment(comment: any): Promise<void> {
    const result = await axios.post<CommentModel>(appConfig.comments, comment);
    const newComment = result.data;    
    newComment["authorFullName"] = authStore.getState().user.firstName + " " + authStore.getState().user.lastName;
    newComment["commentDate"] = getCurrentDateTime();
    newComment["dislikeCount"] = 0;
    newComment["likeCount"] = 0;
    commentsStore.dispatch({type: CommentsActionType.AddComment, payload:newComment});
  }

  public async deleteComment(id: number): Promise<void> {
    const data = {id: id};
    await axios.delete(appConfig.deleteComment, {data: data});
  };

  public async updateComment(id: number, content: string): Promise<void> {
    const updatedComment = {id: id, content: content};
    await axios.put(appConfig.updateComment, {data: updatedComment});
  }

  public resetComments(): void {
    commentsStore.dispatch({type: CommentsActionType.ResetComments});
  };

}

const commentService = new CommentService();

export default commentService;