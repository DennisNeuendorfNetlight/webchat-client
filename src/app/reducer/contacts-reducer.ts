import { ActionReducer, Action } from '@ngrx/store';
import { Contact } from '../models';

export const ADD_CONTACTS = 'ADD_CONTACTS';

export class AddContactsAction implements Action {
    type:string = ADD_CONTACTS;
    constructor(public payload: Contact[]){}
}

export const contactsReducer: ActionReducer<Contact[]> = (state=[], {type,payload}) => {
    switch (type) {
        case ADD_CONTACTS:{
            const findContact = (contact) => contact.sessionId === payload.sessionId;
            return payload.map(newcontact => state.find(findContact)||newcontact);
            /*
            if(!state.find(){  
                if(state.find((contact) => contact.username === payload.username)){
                    return state.map((contact) => contact.username === payload.username ? Object.assign({}, contact, payload) : contact);
                }
                return [...state,payload];
                //.sort((a:Contact,b:Contact) => a.username<b.username?-1:a.username>b.username?1:0);
            }
            return state;*/
        }
    }
    return state;
}
