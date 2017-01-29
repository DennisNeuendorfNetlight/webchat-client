import { provideStore ,Store, ActionReducer, Action, combineReducers } from "@ngrx/store";
import { compose } from '@ngrx/core/compose';
import { chatsReducer } from "./chats-reducer";
import { contactsReducer } from "./contacts-reducer";
import { selectedContactReducer } from "./selected-contact-reducer";
import { Chats, Contact } from '../models';


export const reducers = combineReducers({
	chats: chatsReducer,
	contacts: contactsReducer,
	selectedContact: selectedContactReducer
});

export interface AppState{
	chats: Chats,
	contacts: Contact[]
	selectedContact: Contact
};

const initialState: AppState = {
	chats: {},
	contacts: [],
	selectedContact: null
};      

export function reducer(state: AppState = initialState, action: Action) {
  return reducers(state,action);
}