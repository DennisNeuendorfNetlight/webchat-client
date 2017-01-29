importScripts('cryptico.min.js');
self.addEventListener('message', function(e){
    let result;
    let type = e.data.type;
    let payload = e.data.payload;
    if(type = 'generateKeys' && payload ){
        const time = new Date();
        let privateKey = cryptico.generateRSAKey(payload, 1024);
        result = {
            privateKey,
            publicKey: cryptico.publicKeyString(privateKey)
        }; 
        const aftertime = new Date();
        console.log('duration generateKeys:', aftertime-time);
    }
    self.postMessage(result);
});