import axios from "axios";
import { ArticleModel } from "../Models/ArticleModel";
import appConfig from "../Utils/AppConfig";


class ArticlesService {
  
  public async getAllArticles(): Promise<ArticleModel[]>{
    const result = await axios.get<ArticleModel[]>(appConfig.articlesUrl);
    const articles = result.data;
    return articles;
  }

  public async getOneArticle(id: number):Promise<ArticleModel>{
    const result = await axios.get<ArticleModel>(appConfig.articlesUrl + id);
    const article = result.data;
    return article;
  }

}

const articleService = new ArticlesService();

export default articleService;