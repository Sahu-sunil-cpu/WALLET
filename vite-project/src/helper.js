
import { mnemonicToSeedSync, mnemonicToSeed, generateMnemonic } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair,
   Connection, 
   LAMPORTS_PER_SOL,
    PublicKey ,
    SystemProgram,
   sendAndConfirmTransaction,
   Transaction
     } from "@solana/web3.js"
import nacl from "tweetnacl"
import { Wallet, HDNodeWallet } from "ethers";
import bs58 from 'bs58'
//import { Transaction } from "./Transaction";



export async function mnemonicGenerator() {
  const mn = await generateMnemonic();
  console.log(mn)

  return mn;

}


export async function SolanaWallet(mnemonic, count) {
  console.log(mnemonic)
  const seed = await mnemonicToSeed(mnemonic);

  const path = `m/44'/501'/${count}'/0'`;
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  const keypair = Keypair.fromSecretKey(secret).publicKey
  // console.log(secret)
  // console.log(keypair);
  return { solpubKey: keypair, solpriKey: bs58.encode(secret), count: count };
}

export async function EtheriumWallet(mnemonic, count) {
  const seed = await mnemonicToSeed(mnemonic);
  const derivationPath = `m/44'/60'/${count}'/0'`;
  const hdNode = HDNodeWallet.fromSeed(seed);
  const child = hdNode.derivePath(derivationPath);
  const privateKey = child.privateKey;
  const wallet = new Wallet(privateKey);

  console.log(privateKey)
  return { ethpubKey: wallet.address, ethpriKey: privateKey, count: count };
}


export async function BalanceInSolana(pKey){
  const publicKey = new PublicKey(pKey);
  //console.log(publicKey)
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");
  const Balance = await connection.getBalance(publicKey);
  const balanceInSol = Balance/ LAMPORTS_PER_SOL;
  return balanceInSol
}


export async function SolanaTxn(secret, senderPubKey, ReceiverPubKey, Amount ){
  console.log("secret    " + secret )
  //console.log("Amount   " + Amount + "Recei    " + ReceiverPubKey)
  const keypair = Keypair.fromSecretKey(
    bs58.decode(
     secret,
    ),
  );

  console.log(keypair)
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");
  const transaction = new Transaction();
 // console.log(transaction)
  const LAMPORTS_TO_SEND = Amount * LAMPORTS_PER_SOL;
  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey : senderPubKey,
    toPubkey : ReceiverPubKey,
    lamports : LAMPORTS_TO_SEND,
  })
//console.log("teyghbn")
  transaction.add(sendSolInstruction);

  const signature = await sendAndConfirmTransaction(connection, transaction, [keypair])
  
  // console.log(
  //   `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${senderPubKey}. `,
  // );
  // console.log(`Transaction signature is ${signature}!`);

  return signature;
}

