export interface Message{
	sender: string;
	recipient: string;
	message: string;
	timestamp: Date;
}

export interface Contact{
	username: string;
	sessionId: string;
	publicKey: string;
}

export interface Chats{
    [recipient: string]:Message[];
}
