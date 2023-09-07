import axios from "axios";
import { ArticleModel } from "../Models/ArticleModel";
import appConfig from "../Utils/AppConfig";


class ArticlesService {
  
  public async getAllArticles(): Promise<ArticleModel[]>{
    const result = await axios.get<ArticleModel[]>(appConfig.articlesUrl);
    const articles = result.data;
    return articles;
  }

}

const articleService = new ArticlesService();

export default articleService;