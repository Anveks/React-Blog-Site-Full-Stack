import { OkPacket } from "mysql";
import { ArticleModel } from "../2-models/articles-model";
import dal from "../4-utils/dal";
import { CommentModel } from "../2-models/comment-model";
import appConfig from "../4-utils/app-config";
import CategoryModel from "../2-models/category-model";
import imageHandler from "../4-utils/image-handler";
import { ResourceNotFoundError } from "../2-models/client-errors";

// get all articles:
async function getAllArticles(): Promise<ArticleModel[]> {
  const sql = `
  SELECT
    articles.*,
    CONCAT(users.firstName, ' ', users.lastName) AS authorFullName,
    COALESCE(comment_counts.commentCount, 0) AS commentsNumber,
    CONCAT('${appConfig.imageUrl}', articles.previewImage) AS previewImageUrl
  FROM articles
  INNER JOIN users ON articles.authorId = users.userId
  LEFT JOIN (
    SELECT articleId, COUNT(*) AS commentCount
    FROM comments
    GROUP BY articleId
  ) AS comment_counts ON articles.articleId = comment_counts.articleId
`;
    
  const articles = await dal.execute(sql);
  return articles;
};

async function getAllCategories(): Promise<CategoryModel[]>{
  const sql = "SELECT * FROM categories";
  const categories = await dal.execute(sql);
  return categories;
}


// get one:
async function getOneArticle(id: number): Promise<ArticleModel> {
  const sql = `SELECT articles.*, CONCAT(users.firstName, ' ', users.lastName) AS authorFullName,
  CONCAT('${appConfig.imageUrl}', articles.headImage) AS headImageUrl,
  CONCAT('${appConfig.imageUrl}', articles.previewImage) AS previewImageUrl
  FROM articles
  INNER JOIN users ON articles.authorId = users.userId
  WHERE articles.articleId = ?`;
  const article = await dal.execute(sql, [id]);
  return article[0];
};

// post a new article:
async function addArticle(article: ArticleModel): Promise<ArticleModel> {  
  let previewImageName = null;
  let headImageName = null;

  if (article.headImage) {
    headImageName = await imageHandler.saveFile(article.headImage);
    article.headImageUrl = appConfig.imageUrl + headImageName;
    article.headImage = headImageName;
  }

  if (article.previewImage) {
    previewImageName = await imageHandler.saveFile(article.previewImage);
    article.previewImageUrl = appConfig.imageUrl + previewImageName;
    article.previewImage = previewImageName;
  }  
  
  const sql = `
  INSERT INTO articles 
  (authorId, categoryId, title, content, tags, previewText, previewImage, headImage) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

const result: OkPacket = await dal.execute(sql, [
  article.authorId,
  article.categoryId,
  article.title,
  article.content,
  article.tags,
  article.previewText,
  article.previewImage, // Add the previewImage value
  article.headImage,    // Add the headImage value
]);

article.articleId = result.insertId;
  return article;
}

async function getImageName(articleId: number, headImage?: boolean): Promise<string> {
  let sql: string;

  if (headImage === undefined) headImage = false;
  console.log(headImage);
  
  if (headImage) {
    sql = `SELECT headImage FROM articles WHERE articleId = ?`; 
  } else {
    sql = `SELECT previewImage FROM articles WHERE articleId = ?`;
  }

  console.log(sql);
  const result = await dal.execute(sql, [articleId]);

  if (headImage) {
    const imageName = result[0]?.headImage;
    return imageName;
  } else {
    const imageName = result[0]?.previewImage;
    return imageName;
  }

}

// edit an article:
async function updateArticle(article: ArticleModel): Promise<ArticleModel>{
  // TODO: validation

  let currentHeadImageName = await getImageName(+article.articleId, true);
  let currentPreviewImageName = await getImageName(+article.articleId);

  if (article.headImage) {
    console.log('Updating Head Image...');
    currentHeadImageName = await imageHandler.updateImage(article.headImage, currentHeadImageName);
  }

  if (article.previewImage) {
    console.log('Updating Preview Image...');
    currentPreviewImageName = await imageHandler.updateImage(article.previewImage, currentPreviewImageName);
  }

  console.log('Updated Head Image Name:', currentHeadImageName);
  console.log('Updated Preview Image Name:', currentPreviewImageName);

  article.headImageUrl = appConfig.imageUrl + currentHeadImageName;
  article.previewImageUrl = appConfig.imageUrl + currentPreviewImageName;

  const sql = `UPDATE articles SET 
  authorId = ?,
  categoryId = ?,
  title = ?,
  content = ?,
  tags = ?,
  previewText = ?,
  previewImage = ?,
  headImage = ?
  WHERE articleId = ?
  `;
  const result: OkPacket = await dal.execute(sql, [
    article.authorId,
    article.categoryId,
    article.title,
    article.content,
    article.tags,
    article.previewText,
    currentPreviewImageName,
    currentHeadImageName,
    article.articleId
  ])

  if (result.affectedRows === 0) throw new ResourceNotFoundError(article.articleId);

  delete article.headImage;
  delete article.previewImage;

  return article;
}

async function deleteArticle(id: number): Promise<void> {
  const sql = "DELETE FROM articles WHERE articleId = ?";
  await dal.execute(sql, [id]);
}

async function getCommentsPerArticle(id: number): Promise<CommentModel[]> {
  const sql = `
  SELECT
    comments.commentId,
    comments.authorId,
    comments.articleId,
    comments.content,
    comments.commentDate,
    comments.isEdited,
    comments.parentCommentId,
    COUNT(DISTINCT CASE WHEN likes.likeType = 1 THEN likes.userId END) AS likeCount,
    COUNT(DISTINCT CASE WHEN likes.likeType = 0 THEN likes.userId END) AS dislikeCount,
    CONCAT(users.firstName, ' ', users.lastName) AS authorFullName,
    CONCAT('${appConfig.imageUrl}', users.profilePicture ) AS commentAuthorProfilePicture
  FROM
    comments
  LEFT JOIN
    likes ON comments.commentId = likes.commentId
  LEFT JOIN
    users ON comments.authorId = users.userId
  WHERE
    comments.articleId = ?
  GROUP BY
    comments.commentId,
    comments.authorId,
    comments.articleId,
    comments.content,
    comments.commentDate,
    users.profilePicture;  -- Include the profilePicture in the GROUP BY
`;
  const comments = await dal.execute(sql, [id]);
  return comments;
}

async function addComment(comment: CommentModel): Promise<CommentModel>{
  const sql = `INSERT INTO comments VALUES (DEFAULT, ?, ?, ?, DEFAULT, 0, ?)`;
  const result: OkPacket = await dal.execute(sql, [comment.authorId, comment.articleId, comment.content, comment.parentCommentId]);
  comment.commentId = result.insertId;
  return comment;
}

async function updateComment(id: number, content: string): Promise<void>{
  const sql = `
  UPDATE comments
  SET content = ?, isEdited = 1
  WHERE commentId = ?;
  `;
  await dal.execute(sql, [content, id]);
}

async function deleteComment(id: number): Promise<void> {
  const sql = "DELETE FROM comments WHERE commentId = ?";
  await dal.execute(sql, [id]);
}

async function addLike(userId: number, commentId: number, likeType: number): Promise<void> {
  const sql = "INSERT INTO likes VALUES(?,?,?)";
  await dal.execute(sql, [likeType, userId, commentId]);
}

async function removeLike(userId: number, commentId: number): Promise<void>{
  const sql = "DELETE FROM likes WHERE userId = ? AND commentId = ?";
  await dal.execute(sql, [userId, commentId]);
}

async function updateViews(id: number): Promise<void> {
  const sql = `UPDATE articles
  SET views = views + 1
  WHERE articleId = ?;`;
  await dal.execute(sql,[id]);
}

export default {
  getAllArticles,
  getOneArticle,
  addArticle,
  updateArticle,
  deleteArticle,
  getCommentsPerArticle,
  addComment,
  updateComment,
  deleteComment,
  addLike,
  removeLike,
  updateViews,
  getAllCategories
};
