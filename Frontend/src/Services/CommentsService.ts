import axios from "axios";
import appConfig from "../Utils/AppConfig";
import { CommentModel } from "../Models/CommentModel";

class CommentService {
  public async getCommentsPerArticle(articleId: number): Promise<CommentModel[]> {
    const result = await axios.get<CommentModel[]>(appConfig.comments + articleId);
    const comments = result.data;
    return comments;
  }
}

const commentService = new CommentService();

export default commentService;