import { ActionReducer, Action } from '@ngrx/store';
import { Message, Chats } from '../models';

export const ADD_SENT_MESSAGE = 'ADD_SENT_MESSAGE';

export class AddSentMessageAction implements Action {
    type:string = ADD_SENT_MESSAGE;
    constructor(public payload: Message){}
}

export const ADD_RECEIVED_MESSAGE = 'ADD_RECEIVED_MESSAGE';

export class AddReceivedMessageAction implements Action {
    type:string = ADD_RECEIVED_MESSAGE;
    constructor(public payload: Message){}
}

export const chatsReducer: ActionReducer<Chats> = (state={}, {type,payload}) => {
    switch (type) {
        case ADD_SENT_MESSAGE:
        case ADD_RECEIVED_MESSAGE:{
			let key = type === ADD_SENT_MESSAGE ? (<Message>payload).recipient : (<Message>payload).sender;
            return Object.assign({},state,{ [key]: [...(state[key]||[]),payload].sort((a:Message,b:Message)=>a.timestamp<b.timestamp?-1:a.timestamp>b.timestamp?1:0)});
        }
    }
    return state;
}
