import crypto from "crypto";
import secp256k1 from "secp256k1";
import createKeccakHash from "keccak";
import key from "./key.js";

function sign(message, privatekey){
    const hash = crypto.createHash("sha256").update(message).digest();
    return secp256k1.ecdsaSign(hash, privateKey);
}

function recover(message, signature){
    const hash = crypto.createHash("sha256").update(message).digest();
    return Buffer.from(secp256k1.ecdsaRecover(signature.signature, signature.recid, hash, false));
}

const privateKey = key.createPrivateKey();
const publicKey = key.createPublicKey(privateKey);

const signature = sign("hello", privateKey);

const recoveredKey = recover("hello", signature);

console.log(publicKey.toString("hex"));
console.log(recoveredKey.toString("hex"));
