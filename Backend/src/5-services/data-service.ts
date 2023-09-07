import { OkPacket } from "mysql";
import { ArticleModel } from "../2-models/articles-model";
import dal from "../4-utils/dal";
import { CommentModel } from "../2-models/comment-model";

// get all articles:
async function getAllArticles(): Promise<ArticleModel[]>{
  // const sql = "SELECT * FROM articles";
  const sql = `SELECT articles.*, CONCAT(users.firstName, ' ', users.lastName) AS authorFullName, COALESCE(comment_counts.commentCount, 0) AS commentsNumber
  FROM articles
  INNER JOIN users ON articles.authorId = users.userId
  LEFT JOIN (
      SELECT articleId, COUNT(*) AS commentCount
      FROM comments
      GROUP BY articleId
  ) AS comment_counts ON articles.articleId = comment_counts.articleId;`;
  const articles = await dal.execute(sql);
  return articles;
};

// post a new article:
async function addArticle(article: ArticleModel): Promise<ArticleModel> {
  const sql = 'INSERT INTO articles VALUES(DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const result: OkPacket = await dal.execute(sql, [
    article.authorId,
    article.categoryId,
    article.title,
    article.content,
    article.tags,
    article.previewText,
    article.previewImage,
    article.headImage,
    article.views,
    article.publicationDate
  ]);

  article.articleId = result.insertId;
  return article;
}

// edit an article:
async function updateArticle(article: ArticleModel): Promise<ArticleModel>{
  // TODO: validation

  const sql = `UPDATE articles SET 
  authorId = ?,
  categoryId = ?,
  title = ?,
  content = ?,
  tags = ?,
  previewText = ?,
  previewImage = ?,
  headImage = ?,
  views = ?,
  publicationDate = ?
  WHERE articleId = ?
  `;
  const result: OkPacket = await dal.execute(sql, [
    article.authorId,
    article.categoryId,
    article.title,
    article.content,
    article.tags,
    article.previewText,
    article.previewImage,
    article.headImage,
    article.views,
    article.publicationDate,
    article.articleId
  ])

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
  comments.authorId AS commentAuthorId,
  comments.articleId,
  comments.content AS commentContent,
  comments.commentDate,
  COUNT(DISTINCT CASE WHEN likes.likeType = 1 THEN likes.userId END) AS likeCount,
  COUNT(DISTINCT CASE WHEN likes.likeType = 0 THEN likes.userId END) AS dislikeCount
FROM
  comments
LEFT JOIN
  likes ON comments.commentId = likes.commentId
WHERE
  comments.articleId = ?
GROUP BY
  comments.commentId,
  comments.authorId,
  comments.articleId,
  comments.content,
  comments.commentDate;
  `;
  const comments = await dal.execute(sql, [id]);
  return comments;
}

async function addComment(comment: CommentModel): Promise<CommentModel>{
  const sql = `INSERT INTO comments VALUES (DEFAULT, ?, ?, ?, ?)`;
  const result: OkPacket = await dal.execute(sql, [comment.authorId, comment.articleId, comment.content, comment.commentDate]);
  comment.commentId = result.insertId;
  return comment;
}

async function updateComment(comment: CommentModel): Promise<CommentModel>{
  const sql = `
  UPDATE comments
  SET content = ?
  WHERE commentId = ?;
  `;
  const result: OkPacket = await dal.execute(sql, [comment.content, comment.commentId]);
  return comment;
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

export default {
  getAllArticles,
  addArticle,
  updateArticle,
  deleteArticle,
  getCommentsPerArticle,
  addComment,
  updateComment,
  deleteComment,
  addLike,
  removeLike
};
