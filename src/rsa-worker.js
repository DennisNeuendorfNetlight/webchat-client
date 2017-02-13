importScripts('cryptico.min.js');

self.generateRSAKey = (payload) => {
    const time = new Date();
    self.privateKey = cryptico.generateRSAKey(payload, 1024);
    result = {
        publicKey: cryptico.publicKeyString(privateKey)
    }; 
    const aftertime = new Date();
    console.log('duration generateKeys:', aftertime-time);
    return result;
}

self.encrypt = (payload) => {
    const time = new Date();
    let encresult = cryptico.encrypt(payload.message.message, payload.publicKey);
    result = Object.assign({}, payload.message, { message: encresult.cipher});
    const aftertime = new Date();
    console.log('duration encrypt:', aftertime-time);
    return result;
}

self.decrypt = (payload) => {
    const time = new Date();
    let decresult = cryptico.decrypt(payload.message.message, self.privateKey);
    result = Object.assign({}, payload.message, { message: decresult.plaintext});
    const aftertime = new Date();
    console.log('duration decrypt:', aftertime-time);
    return result;
}


self.onmessage = (e) => {
    let type = e.data.type;
    let payload = e.data.payload;
    switch(type){
        case 'generateKeys':  
            return self.postMessage(self.generateRSAKey(payload));
        case 'encrypt':  
            return self.postMessage(self.encrypt(payload));
        case 'decrypt':  
            return self.postMessage(self.decrypt(payload));
    }
};