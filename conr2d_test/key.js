import crypto from "crypto";
import secp256k1 from "secp256k1";
import createKeccakHash from "keccak"
import Mnemonic from "bitcore-mnemonic";
let to = (s) => s.toString("hex");

function createPrivateKey(){
    let privateKey;
    do{
        privateKey = crypto.randomBytes(32);
    }while(secp256k1.privateKeyVerify(privateKey) === false);
    return privateKey;
}

function createPublicKey(privateKey, compressed = false){
    return Buffer.from(secp256k1.publicKeyCreate(privateKey));
}

function createAddress(publicKey) {
    const hash = createKeccakHash("keccak256").update(publicKey.slice(1)).digest("hex");
    return "0x" + hash.slice(24)
}

const privateKey = createPrivateKey();
console.log("Private key:"+ to(privateKey));
const publicKey = createPrivateKey(privateKey);
console.log("Public key:"+ to(publicKey));

const address = createAddress(publicKey);
console.log(`Address: + ${address}`);

function toChecksumAddress (address) {
  address = address.toLowerCase().replace('0x', '')
  var hash = createKeccakHash('keccak256').update(address).digest('hex')
  var ret = '0x'

  for (var i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      ret += address[i].toUpperCase()
    } else {
      ret += address[i]
    }
  }

  return ret
}

function createMnemonic(numWords = 12){
    if (numWords < 12 || numWords >24 || numWords % 3 !== 0){
        throw new Error("invalid number of words");
    }
    const entropy = (16 + (numWords - 12) / 3 * 4) * 8;
    return new Mnemonic(entropy);
}
function MnemonicToPrivateKey(mnemonic){
    const privateKey = mnemonic.toHDPrivateKey().derive("m/44'/60'0/'/0/0").privateKey;
    return Buffer.from(privateKey.toString(),"hex");
}

function privateKeyToAddress(privateKey){
  const publicKey = createPublicKey(privatekey);
  const address = createAddress(publicKey);
  return toChecksumAddress;
}

export default{
    createAddress,
    createPrivateKey,
    createPublicKey,
    createMnemonic,
    MnemonicToPrivateKey,

}
