import { ActionReducer, Action } from '@ngrx/store';
import { Message, Contact } from '../models';

export const ADD_CONTACT = 'ADD_CONTACT';

export class AddContactAction implements Action {
    type:string = ADD_CONTACT;
    constructor(public payload: Message){}
}

export const contactsReducer: ActionReducer<Contact[]> = (state=[], {type,payload}) => {
    switch (type) {
        case ADD_CONTACT:{
            if(!state.find((contact) => contact.sessionId === payload.sessionId)){  
                if(state.find((contact) => contact.username === payload.username)){
                    return state.map((contact) => contact.username === payload.username ? Object.assign({}, contact, payload) : contact);
                }
                return [...state,payload];
                //.sort((a:Contact,b:Contact) => a.username<b.username?-1:a.username>b.username?1:0);
            }
            return state;
        }
    }
    return state;
}
