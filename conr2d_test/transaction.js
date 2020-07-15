import EthereumTx from "ethereumjs-tx";
import createKeccakHash from "keccak";
// const createKeccakHash = require("keccak");
import secp256k1 from "secp256k1"
//  const secp256k1 = require("secp256k1);


const tx = new EthereumTx.Transaction({
    nonce: "0x1",
    gasPrice:"0x2540BE400",
    gasLimit:"0xC350",
    to:"0x9e14E9e8Cb857812bC27F0adF04fB636E6440c55",
    value:"0x38D7EA4C68000",
    data:"0x" + Buffer.from("give me ether plz").toString("hex"),
},{ chain: "ropsten"});

tx.raw[6] = Buffer.from("03","hex");

const hash = createKeccakHash("keccak256").update(tx.serialize()).digest();

const privateKey = Buffer.from("c52f4f161b68b874fb168cf1cb22d4ae64142c28edd709f7c812dc3f9bd8346c","hex");
const signature = secp256k1.ecdsaSign(hash, privateKey);

tx.raw[7] = Buffer.from(signature.signature.slice(0, 32));
tx.raw[8] = Buffer.from(signature.signature.slice(32));
tx.raw[6] = Buffer.from((3 * 2 + 35 + signature.recid).toString(16),"hex");

console.log(tx.serialize().toString("hex"));
