
export class CommentModel {
  public commentId: number;
  public authorId: number;
  public articleId: number;
  public content: string;
  public commentDate: string;
  public isEdited: boolean;

  public constructor(comment: CommentModel){
    this.commentId = comment.commentId;
    this.authorId = comment.authorId;
    this.articleId = comment.articleId;
    this.content = comment.content;
    this.commentDate = comment.commentDate;
    this.isEdited = comment.isEdited;
  }
}