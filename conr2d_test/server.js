import express from "express";
import bodyParser from "body-parser";
import key from "./key.js";
import ecdsa from "./ecdsa.js";
import Mnemonic from "bitcore-mnemonic/lib/mnemonic";

const port = 3000;
const host = "127.0.0.1";

const app = express();

app.use(bodyParser.json());

app.post("/",function(req, res){
    res.send("success");
});
let privateKey;

app.post("/create_key",function(req, res){
    const mnemonic = key.createprivateKey();
    privateKey = key.MnemonicToPrivateKey(mnemonic);
    const publicKey = key.createPublicKey(privateKey);
    const address = key.createAddress(publicKey);
    const checksomAddress = key.toChecksumAddress(address);
    res.json({
        mnemonic: mnemonic.toString(),
        privateKey: privateKey.toString(),
        address:checksomAddress,
    });
    
    
});

app.post("/current_address", function(req, res){
    res.json({
        address: key.privateKeyToAddress(privateKey),
    });
});

app.post("/import_key",function(req, res){ 
    if(req.body.hasOwnProperty("property")){
        privateKey = Buffer.from(req.body.privateKey,"hex");
    }else if(req.body.hasOwnProperty("mnemonic")){
        const mnemonic = new Mnemonic(req.body.mnemonic);
        privateKey = MnemonicToPrivateKey(mnemonic);
    }else{
        res.status(500).json({
            error:"privateKey or mnemonic is necessary"
        });
    }
    res.json({
        address: key.privateKeyToAddress(privateKey),
    });
});

// app.post("/sign", function(req, res){
//     const message = ecdsa.sign(message);
//     const signature = ecdsa.signature;
//     res.json({
//         message: message.toString(),
//         signature: signature.toString()
//     });
// });

// app.post("/recover", function(req, res){
//     const recoverKey = ecdsa.recover(signature);
//     res.json({
        
//     });
// });

app.listen(port,host, function(){
    console.log("가즈아",port);
});