import { createStore } from "redux";
import { CommentModel } from "../Models/CommentModel";

export class CommentsState {
  public comments: CommentModel[] = [];
}

export enum CommentsActionType {
  FetchComments,
  AddComment
}

export interface CommentsAction {
  type: CommentsActionType,
  payload?: any;
}

export function commentsReducer(currentState = new CommentsState(), action: CommentsAction): CommentsState {
  const newState = { ...currentState };

  switch(action.type){
    case CommentsActionType.FetchComments:
      newState.comments = action.payload;
      break;
    case CommentsActionType.AddComment:
      console.log(action.payload);
      newState.comments = [...newState.comments, action.payload];
      break;
  }

  return newState;
}

export const commentsStore = createStore(commentsReducer);