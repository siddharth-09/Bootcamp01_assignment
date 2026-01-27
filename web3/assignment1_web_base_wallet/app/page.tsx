"use client"

import { checkBalance, checkSplBalance, createMultipleSolanaWallet_OR_ImportSeed, createSolanaWallet } from "@/lib/solanaWallet";
import { derivePath } from "ed25519-hd-key";
import { useEffect, useState } from "react";


export default function Home() {
  const[walletCount,setWalletCount] = useState(0);
  let derivation_path = `m/44'/501'/${walletCount}'/0'`;
  const[publicKey,setPublicKey] = useState("");
  const[privateKey,setPrivateKey] = useState("");
  const[seed,setSeed] = useState("");
  const[words,setWords] = useState(128);

  const handleCreateSolanaWallet = async()=>{
    if(walletCount == 0){
      console.log(derivation_path)
      const wallet = await createSolanaWallet(words,derivation_path);
      setPublicKey(wallet.publicKey);
      setSeed(wallet.mnemonics);
      setPrivateKey(wallet.privateKey);
      setWalletCount(walletCount+1);
    }
    else{
      const wallet = await createMultipleSolanaWallet_OR_ImportSeed(seed,derivation_path);
      setPublicKey(wallet.publicKey);
      setSeed(wallet.mnemonics);
      setPrivateKey(wallet.privateKey);
      setWalletCount(walletCount+1);
    }
  }
  // useEffect(()=>{
  //   localStorage.setItem(`Public${walletCount}`,publicKey);
  // },[derivation_path,publicKey])
  return (
  <div>
    <button onClick={()=>{
      checkSplBalance("4ncsvGw6AuXFjgA328JaZHkjzNHTWLHw9yZ8A9JTqZ5n")
    }}>
      Click to test
    </button>
  </div>
  );
}
