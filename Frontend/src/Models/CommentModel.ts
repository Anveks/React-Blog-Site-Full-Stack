
export class CommentModel {
  public commentId?: number;
  public authorId: number;
  public authorFullName: string;
  public articleId: number;
  public content: string;
  public commentDate: string;
  public dislikeCount: number;
  public likeCount: number;
  public isEdited: number;
  public parentCommentId: number;
}