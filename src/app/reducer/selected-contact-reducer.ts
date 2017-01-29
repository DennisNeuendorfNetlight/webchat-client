import { ActionReducer, Action } from '@ngrx/store';
import { Contact } from '../models';

export const SELECT_CONTACT = 'SELECT_CONTACT';

export class SelectContactAction implements Action {
    type:string = SELECT_CONTACT;
    constructor(public payload: Contact){}
}

export const REMOVE_SELECTED_CONTACT = 'REMOVE_SELECTED_CONTACT';

export class RemoveSelectedContactAction implements Action {
    type:string = REMOVE_SELECTED_CONTACT;
    payload = null;
}

export const selectedContactReducer: ActionReducer<Contact> = (state=null, {type,payload}) => {
    switch (type) {
        case SELECT_CONTACT:
        case REMOVE_SELECTED_CONTACT:{
            return payload;
        }    
    }
    return state;
}
