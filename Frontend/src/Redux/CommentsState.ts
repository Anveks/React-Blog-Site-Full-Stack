import { createStore } from "redux";
import { CommentModel } from "../Models/CommentModel";

export class CommentsState {
  public artilces: CommentModel[] = [];
}

export enum CommentsActionType {
  //
}

export interface CommentsAction {
  type: CommentsActionType,
  payload?: any;
}

export function commentsReducer(currentState = new CommentsState(), action: CommentsAction): CommentsState {
  const newState = { ...currentState };

  switch(action.type){
    // case ArticlesActionType.FetchArticles:
    //   newState.artilces = action.payload;
    //   break;
  }

  return newState;
}

export const commentsStore = createStore(commentsReducer);