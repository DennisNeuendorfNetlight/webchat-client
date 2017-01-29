import { provideStore ,Store, ActionReducer, Action, combineReducers } from "@ngrx/store";
import { compose } from '@ngrx/core/compose';
import { chatsReducer, Chats } from "./chats-reducer";
import { contactsReducer, Contact } from "./contacts-reducer";


export const reducers = combineReducers({
	chats: chatsReducer,
	contacts: contactsReducer
});

export interface AppState{
	chats: Chats,
	contacts: Contact[]
};

const initialState: AppState = {
	chats: {},
	contacts: []
};      

export function reducer(state: AppState = initialState, action: Action) {
  return reducers(state,action);
}