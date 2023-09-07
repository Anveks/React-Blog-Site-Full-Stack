
export class ArticleModel {
  public articleId: number;
  public authorId: number;
  public categoryId: number;
  public title: string;
  public content: string;
  public tags: string;
  public previewText: string;
  public previewImage: string;
  public headImage: string;
  public views: number;
  public publicationDate: string;
  public authorFullName: string;
  public commentsNumber: number;

  public constructor(article: ArticleModel){
    this.articleId = article.articleId;
    this.authorId = article.authorId;
    this.categoryId = article.categoryId;
    this.title = article.title;
    this.content = article.content;
    this.tags = article.tags;
    this.previewText = article.previewText;
    this.previewImage = article.previewImage;
    this.headImage = article.headImage;
    this.views = article.views;
    this.publicationDate = article.publicationDate;
  }
}