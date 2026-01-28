"use client"

import SolanaWallet from "@/components/SolanaWallet";
import { createEthWallet } from "@/lib/ethWallet";
import { checkBalance, checkSplBalance, createMultipleSolanaWallet_OR_ImportSeed, createSolanaWallet } from "@/lib/solanaWallet";
import { derivePath } from "ed25519-hd-key";
import { useEffect, useState } from "react";


export default function Home() {
  return (
    <SolanaWallet/>
  );
}
