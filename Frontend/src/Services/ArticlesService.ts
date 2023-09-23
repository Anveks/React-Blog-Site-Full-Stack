import axios from "axios";
import { ArticleModel } from "../Models/ArticleModel";
import appConfig from "../Utils/AppConfig";
import { CategoryModel } from "../Models/CategoryModel";
import { ArticlesActionType, articlesStore } from "../Redux/ArticlesState";


class ArticlesService {
  
  public async getAllArticles(): Promise<ArticleModel[]>{
    const result = await axios.get<ArticleModel[]>(appConfig.articlesUrl);
    const articles = result.data;
    return articles;
  }

  public async getAllCategories(): Promise<CategoryModel[]>{
    const result = await axios.get<CategoryModel[]>(appConfig.categoriesUrl);
    const categories = result.data;
    return categories;
  }

  public async getOneArticle(id: number):Promise<ArticleModel>{
    const result = await axios.get<ArticleModel>(appConfig.articlesUrl + id);
    const article = result.data;
    return article;
  }

  public async addArticle(article: FormData): Promise<void> {
    const headers = { "Content-Type": "multipart/form-data" };
    const result = await axios.post<ArticleModel>(appConfig.articlesUrl, article, {headers});
    const newArticle = result.data;
    articlesStore.dispatch({type: ArticlesActionType.AddArticle, payload: newArticle});
  }

  public async updateViews(id: number): Promise<void> {   
    await axios.put<number>(appConfig.updateViews, {id: id});
  }

}

const articleService = new ArticlesService();

export default articleService;