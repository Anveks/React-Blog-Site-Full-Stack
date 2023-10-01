import { createStore } from "redux";
import { ArticleModel } from "../Models/ArticleModel";

export class ArticlesState {
  public articles: ArticleModel[] = [];
}

export enum ArticlesActionType {
  FetchArticles,
  AddArticle,
  UpdateArticle
}

export interface ArticlesAction {
  type: ArticlesActionType,
  payload?: any;
}

export function articlesReducer(currentState = new ArticlesState(), action: ArticlesAction): ArticlesState {
  const newState = { ...currentState };

  switch(action.type){
    case ArticlesActionType.FetchArticles:
      newState.articles = action.payload;
      break;
    case ArticlesActionType.AddArticle:
      newState.articles.push(action.payload);
      break;
    case ArticlesActionType.UpdateArticle:
      const index = newState.articles.findIndex(a => a.articleId === action.payload.articleId);
      if (index >= 0) newState.articles[index] = action.payload;
      break;
  }

  return newState;
}

export const articlesStore = createStore(articlesReducer);
 