import { OkPacket } from "mysql";
import { ArticleModel } from "../2-models/articles-model";
import dal from "../4-utils/dal";

// get all vacations:
async function getAllArticles(): Promise<ArticleModel[]>{
  const sql = "SELECT * FROM articles";
  const articles = dal.execute(sql);
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
    article.publicationDate
  ])

  return article;
}

async function deleteArticle(id: number): Promise<void> {
  const sql = "DELETE FROM articles WHERE articleId = ?";
  await dal.execute(sql, [id]);
}

export default {
  getAllArticles,
  addArticle,
  updateArticle,
  deleteArticle
};
