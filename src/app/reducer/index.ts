import { chatsReducer, Chats } from "./chats-reducer";
import { provideStore ,Store, ActionReducer, Action, combineReducers } from "@ngrx/store";
import { compose } from '@ngrx/core/compose';


export const reducers = combineReducers({
	chats: chatsReducer
});

export interface AppState{
	chats: Chats
};

const initialState: AppState = {
	chats: {}
};      

export function reducer(state: AppState = initialState, action: Action) {
  return reducers(state,action);
}