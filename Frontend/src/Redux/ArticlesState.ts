import { createStore } from "redux";
import { ArticleModel } from "../Models/ArticleModel";

export class ArticlesState {
  public artilces: ArticleModel[] = [];
}

export enum ArticlesActionType {
  //
}

export interface ArticlesAction {
  type: ArticlesActionType,
  payload?: any;
}

export function articlesReducer(currentState = new ArticlesState(), action: ArticlesAction): ArticlesState {
  const newState = { ...currentState };

  switch(action.type){
    // case ArticlesActionType.FetchArticles:
    //   newState.artilces = action.payload;
    //   break;
  }

  return newState;
}

export const articlesStore = createStore(articlesReducer);
 