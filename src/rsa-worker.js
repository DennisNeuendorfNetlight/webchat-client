importScripts('cryptico.min.js');
self.addEventListener('message', function(e){
    let result;
    let type = e.data.type;
    let payload = e.data.payload;
    if(type == 'generateKeys' && payload ){
        const time = new Date();
        self.privateKey = cryptico.generateRSAKey(payload, 1024);
        result = {
            publicKey: cryptico.publicKeyString(privateKey)
        }; 
        const aftertime = new Date();
        console.log('duration generateKeys:', aftertime-time);
    }
    if(type == 'encrypt' && payload ){
        const time = new Date();
        let encresult = cryptico.encrypt(payload.message.message, payload.publicKey);
        result = Object.assign({}, payload.message, { message: encresult.cipher});
        const aftertime = new Date();
        console.log('duration encrypt:', aftertime-time);
    }
    if(type == 'decrypt' && payload ){
        const time = new Date();
        let decresult = cryptico.decrypt(payload.message.message, self.privateKey);
        result = Object.assign({}, payload.message, { message: decresult.plaintext});
        const aftertime = new Date();
        console.log('duration decrypt:', aftertime-time);
    }
    self.postMessage(result);
});