import {
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
    clusterApiUrl,
    sendAndConfirmTransaction
} from '@solana/web3.js'
import bip39 from 'bip39';
import bs58 from 'bs58';
import ed25519 from 'ed25519-hd-key';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const connection = new Connection(clusterApiUrl('devnet'));


export async function createSolanaWallet(strength:number,derivation_path:string){
    //mnenmonics generate
    const mnemonics =  bip39.generateMnemonic(strength);
    //mnemonics to seed in binary 512 bytes
    const seedBinary = await bip39.mnemonicToSeed(mnemonics);
    //derivation path = "m/44'/501'/0'/0'"
    const derivation = derivation_path;
    const derivedSeed = ed25519.derivePath(derivation,seedBinary.toString('hex')).key;
    const keys = Keypair.fromSeed(derivedSeed);
    const publicKey = keys.publicKey.toBase58();
    const privateKey = bs58.encode(keys.secretKey);
    return{
        publicKey,
        privateKey,
        mnemonics
    }
}


export async function createMultipleSolanaWallet_OR_ImportSeed(mnemonics:string,derivation_path:string){
    const seedBinary = await bip39.mnemonicToSeed(mnemonics);
    // console.log(seedBinary);
    const derivation = derivation_path;
    const derivedSeed = ed25519.derivePath(derivation,seedBinary.toString('hex')).key;
    const keys = Keypair.fromSeed(derivedSeed);
    const publicKey = keys.publicKey.toBase58();
    const privateKey = bs58.encode(keys.secretKey);
    return{
        publicKey,
        privateKey,
        mnemonics
    }
}


export async function checkBalance(publicKey : string){
    const balance = await connection.getBalance(new PublicKey(publicKey)) / LAMPORTS_PER_SOL;
    console.log(balance)
    return{
        balance
    }
}


export async function sendSol(fromAddress : Keypair,toPublicKey:string,amount:number){
    const from = fromAddress;
    const toAdress = new PublicKey(toPublicKey);
    const lamports = amount * LAMPORTS_PER_SOL;
    const tx = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: toAdress,
            lamports: lamports
        })
    )
    const signature = await sendAndConfirmTransaction(
        connection,
        tx,
        [from]
    );

    console.log("Transaction Signature:", signature);

    return{
        signature
    }
}


export async function checkSplBalance(key: string) {
    const publicKey = new PublicKey(key);

    const tokenAccounts =
        await connection.getParsedTokenAccountsByOwner(
            publicKey,
            {
                programId: TOKEN_PROGRAM_ID,
            }
        );

    const balances = tokenAccounts.value.map((account) => {
        const info = account.account.data.parsed.info;

        return {
            mint: info.mint,
            amount: info.tokenAmount.uiAmount,
            decimals: info.tokenAmount.decimals,
        };
    });

    console.log(balances);

    return balances;
}

