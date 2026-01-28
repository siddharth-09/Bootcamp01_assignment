

import bip39 from 'bip39';
import { HDKey } from "ethereum-cryptography/hdkey";
import {keccak256 } from 'ethereumjs-util';


export async function createEthWallet(){
    // const mnemonic = bip39.generateMnemonic(128);
    // const mnemonic = "lake noise inflict goddess rich steel timber swarm fabric swap dragon fossil";
    const mnemonic = "night churn panther merit lawn exist edge sleep faculty rate move upper";

    const seed = await bip39.mnemonicToSeed(mnemonic);

    const hdwallet = HDKey.fromMasterSeed(seed);

    const path = "m/44'/60'/0'/0/0"; 
    const wallet = hdwallet.derive(path);
    const privateKey = wallet.privateKey;
    const publicKey = wallet.publicKey?.slice(1);

    // ✅ convert to Buffer
    const publicKeyBuffer = Buffer.from(publicKey);

    // 6. keccak hash → address
    const address =
        "0x" +
        keccak256(publicKeyBuffer).slice(-20).toString("hex");

    console.log("Private key:", privateKey?.toString("hex"));
    console.log("Address:", address);

}