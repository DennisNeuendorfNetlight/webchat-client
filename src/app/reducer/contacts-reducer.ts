import { ActionReducer, Action } from '@ngrx/store';
import { Message } from '../models/message';
export interface Contact{
	username: string;
	sessionId : string;
}

export const ADD_CONTACT = 'ADD_CONTACT';

export class AddContactAction implements Action {
    type:string = ADD_CONTACT;
    constructor(public payload: Message){}
}

export const contactsReducer: ActionReducer<Contact[]> = (state=[], {type,payload}) => {
    switch (type) {
        case ADD_CONTACT:{
            if(!state.find((contact) => contact.sessionId === payload.sessionId)){
                return [...state,payload];
                //.sort((a:Contact,b:Contact) => a.username<b.username?-1:a.username>b.username?1:0);
            }
            return state;
        }
    }
    return state;
}
