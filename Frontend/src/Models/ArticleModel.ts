
export class ArticleModel {
  public articleId: number;
  public authorId: number;
  public categoryId: number;
  public title: string;
  public content: string;
  public tags: string;
  public previewText: string;
  public previewImageUrl: string;
  public headImageUrl: string;
  public previewImage: File;
  public headImage: File;
  public views: number;
  public publicationDate: string;
  public authorFullName: string;
  public commentsNumber: number;
}