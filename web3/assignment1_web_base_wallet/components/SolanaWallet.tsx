'use client';

import { useState, useEffect } from 'react'; // Added useEffect
import { 
  createSolanaWallet, 
  createMultipleSolanaWallet_OR_ImportSeed,
  checkBalance,
  sendSol,
  checkSplBalance
} from '../lib/solanaWallet';
import { Keypair } from '@solana/web3.js';

export default function SolanaWallet() {
  const [view, setView] = useState<'welcome' | 'wallet'>('welcome');
  const [wallets, setWallets] = useState<Array<{
    publicKey: string;
    privateKey: string;
    balance: number;
    splTokens: any[];
  }>>([]);
  const [currentWalletIndex, setCurrentWalletIndex] = useState(0);
  const [mnemonics, setMnemonics] = useState('');
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [importMnemonic, setImportMnemonic] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [sendAddress, setSendAddress] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [showSend, setShowSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{msg: string, type: 'success' | 'error'} | null>(null);

  // --- Persistence Logic ---

  // 1. Load from Local Storage on Mount
  useEffect(() => {
    const savedData = localStorage.getItem('solana_kid_wallet');
    if (savedData) {
      try {
        const { savedWallets, savedMnemonics, savedIndex } = JSON.parse(savedData);
        if (savedWallets && savedWallets.length > 0) {
          setWallets(savedWallets);
          setMnemonics(savedMnemonics);
          setCurrentWalletIndex(savedIndex || 0);
          setView('wallet');
          // Optional: Refresh balance in background after loading
          // refreshBalance(savedWallets[savedIndex || 0].publicKey); 
        }
      } catch (error) {
        console.error("Failed to load wallet", error);
      }
    }
  }, []);

  // 2. Save to Local Storage whenever critical state changes
  useEffect(() => {
    if (wallets.length > 0) {
      const dataToSave = {
        savedWallets: wallets,
        savedMnemonics: mnemonics,
        savedIndex: currentWalletIndex
      };
      localStorage.setItem('solana_kid_wallet', JSON.stringify(dataToSave));
    }
  }, [wallets, mnemonics, currentWalletIndex]);

  // 3. Clear Wallet (Logout)
  const handleDeleteWallet = () => {
    const isConfirmed = window.confirm(
      "Are you sure? This will delete the wallet from this device. Make sure you have your Secret Phrase saved!"
    );
    
    if (isConfirmed) {
      localStorage.removeItem('solana_kid_wallet');
      setWallets([]);
      setMnemonics('');
      setCurrentWalletIndex(0);
      setView('welcome');
      setShowMnemonic(false);
      showNotification('Wallet deleted from device 👋', 'error');
    }
  };

  // --- End Persistence Logic ---

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ msg: message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const createNewWallet = async () => {
    setLoading(true);
    try {
      const wallet = await createSolanaWallet(128, "m/44'/501'/0'/0'");
      setMnemonics(wallet.mnemonics);
      const balance = await checkBalance(wallet.publicKey);
      const splTokens = await checkSplBalance(wallet.publicKey);
      
      setWallets([{
        publicKey: wallet.publicKey,
        privateKey: wallet.privateKey,
        balance: balance.balance,
        splTokens: splTokens
      }]);
      setView('wallet');
      showNotification('Yay! New wallet created! 🎉');
    } catch (error) {
      showNotification('Oops! Could not create wallet', 'error');
    }
    setLoading(false);
  };

  const importWallet = async () => {
    if (!importMnemonic.trim()) {
      showNotification('Please paste your secret words', 'error');
      return;
    }
    setLoading(true);
    try {
      const wallet = await createMultipleSolanaWallet_OR_ImportSeed(
        importMnemonic.trim(),
        "m/44'/501'/0'/0'"
      );
      setMnemonics(importMnemonic.trim());
      const balance = await checkBalance(wallet.publicKey);
      const splTokens = await checkSplBalance(wallet.publicKey);
      
      setWallets([{
        publicKey: wallet.publicKey,
        privateKey: wallet.privateKey,
        balance: balance.balance,
        splTokens: splTokens
      }]);
      setView('wallet');
      setIsImporting(false);
      setImportMnemonic('');
      showNotification('Welcome back! Wallet loaded 🚀');
    } catch (error) {
      showNotification('Those words don\'t look right...', 'error');
    }
    setLoading(false);
  };

  const addNewWallet = async () => {
    setLoading(true);
    try {
      const newIndex = wallets.length;
      const wallet = await createMultipleSolanaWallet_OR_ImportSeed(
        mnemonics,
        `m/44'/501'/${newIndex}'/0'`
      );
      const balance = await checkBalance(wallet.publicKey);
      const splTokens = await checkSplBalance(wallet.publicKey);
      
      setWallets([...wallets, {
        publicKey: wallet.publicKey,
        privateKey: wallet.privateKey,
        balance: balance.balance,
        splTokens: splTokens
      }]);
      setCurrentWalletIndex(newIndex);
      showNotification(`Account #${newIndex + 1} added!`);
    } catch (error) {
      showNotification('Could not add account', 'error');
    }
    setLoading(false);
  };

  const refreshBalance = async () => {
    setLoading(true);
    try {
      const wallet = wallets[currentWalletIndex];
      const balance = await checkBalance(wallet.publicKey);
      const splTokens = await checkSplBalance(wallet.publicKey);
      
      const updatedWallets = [...wallets];
      updatedWallets[currentWalletIndex] = {
        ...wallet,
        balance: balance.balance,
        splTokens: splTokens
      };
      setWallets(updatedWallets);
      showNotification('Balance updated!');
    } catch (error) {
      showNotification('Could not refresh', 'error');
    }
    setLoading(false);
  };

  const handleSendSol = async () => {
    if (!sendAddress || !sendAmount) {
      showNotification('Need an address and amount!', 'error');
      return;
    }
    setLoading(true);
    try {
      const wallet = wallets[currentWalletIndex];
      const keypair = Keypair.fromSecretKey(
        Buffer.from(wallet.privateKey, 'base64')
      );
      
      await sendSol(keypair, sendAddress, parseFloat(sendAmount));
      showNotification('Money sent successfully! 💸');
      setSendAddress('');
      setSendAmount('');
      setShowSend(false);
      await refreshBalance();
    } catch (error) {
      showNotification('Transaction failed', 'error');
    }
    setLoading(false);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showNotification(`${label} copied!`);
  };

  // --- Components ---

  const LoadingOverlay = () => (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-fade-in rounded-3xl">
      <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
      <p className="text-indigo-600 font-bold text-lg animate-pulse">Working on it...</p>
    </div>
  );

  const BackButton = ({ onClick }: { onClick: () => void }) => (
    <button 
      onClick={onClick}
      className="mb-4 text-slate-400 hover:text-indigo-600 flex items-center gap-2 font-bold transition-colors"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
      Go Back
    </button>
  );

  // --- Views ---

  if (view === 'welcome') {
    return (
      <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-4 font-sans overflow-hidden">
        <div className="max-w-md w-full relative">
          
          {/* Main Card */}
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 p-8 relative overflow-hidden">
            {loading && <LoadingOverlay />}
            
            {!isImporting ? (
              <div className="text-center animate-slide-up">
                <div className="w-20 h-20 bg-indigo-600 text-white rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-indigo-200 mb-6 rotate-3 hover:rotate-12 transition-transform duration-300">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                
                <h1 className="text-3xl font-black text-slate-800 mb-2">LEOLEOLEO Wallet</h1>
                <p className="text-slate-500 mb-10">Your personal crypto bank</p>

                <div className="space-y-4">
                  <button
                    onClick={createNewWallet}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-5 px-6 rounded-2xl shadow-lg shadow-indigo-200 transform hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    Create New Wallet
                  </button>

                  <button
                    onClick={() => setIsImporting(true)}
                    className="w-full bg-white border-2 border-indigo-100 hover:border-indigo-300 text-indigo-600 font-bold text-lg py-5 px-6 rounded-2xl transition-all flex items-center justify-center gap-3"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                    I Have A Wallet
                  </button>
                </div>
              </div>
            ) : (
              <div className="animate-slide-up">
                <BackButton onClick={() => setIsImporting(false)} />
                <h2 className="text-2xl font-black text-slate-800 mb-2">Import Wallet</h2>
                <p className="text-slate-500 mb-6">Enter your secret words below.</p>
                
                <textarea
                  value={importMnemonic}
                  onChange={(e) => setImportMnemonic(e.target.value)}
                  placeholder="apple banana chair..."
                  className="w-full h-40 bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 rounded-2xl p-4 text-slate-700 text-lg font-medium resize-none focus:outline-none transition-all mb-6"
                />
                
                <button
                  onClick={importWallet}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-indigo-200 transform hover:scale-[1.02] transition-all"
                >
                  Unlock Wallet
                </button>
              </div>
            )}
          </div>
          
          <p className="text-center text-indigo-300 mt-8 font-medium text-sm">Safe & Secure on Solana</p>
        </div>

        {notification && (
          <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full shadow-xl flex items-center gap-3 animate-bounce-in z-50 ${
            notification.type === 'error' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
          }`}>
            <span className="font-bold">{notification.msg}</span>
          </div>
        )}
      </div>
    );
  }

  const currentWallet = wallets[currentWalletIndex];

  return (
    <div className="h-screen bg-indigo-50 p-4 md:p-6 font-sans overflow-hidden flex flex-col">
      <div className="max-w-6xl w-full mx-auto flex flex-col h-full">
        
        {/* Header - Fixed Height */}
        <div className="flex-none flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800">My Wallet</h1>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wide">Online</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowMnemonic(!showMnemonic)}
              className="bg-white hover:bg-slate-50 text-slate-600 px-4 py-2 rounded-xl font-bold text-sm shadow-sm border border-slate-100 transition-all"
            >
              {showMnemonic ? 'Hide Secrets 🙈' : 'Show Secrets 🔑'}
            </button>
            <button 
              onClick={handleDeleteWallet}
              className="bg-red-50 hover:bg-red-100 text-red-500 p-2 rounded-xl transition-all"
              title="Delete Wallet"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </div>

        {/* Content Area - Flex Grow & Internal Scroll */}
        <div className="flex-1 min-h-0 flex flex-col">
          
          {showMnemonic && (
            <div className="flex-none bg-amber-100 border-2 border-amber-200 rounded-3xl p-6 mb-6 animate-slide-down">
              <h3 className="text-amber-800 font-bold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Keep this safe! It's like your house key.
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {mnemonics.split(' ').map((word, i) => (
                  <div key={i} className="bg-white px-3 py-1.5 rounded-lg text-amber-900 font-medium shadow-sm border border-amber-100">
                    <span className="text-amber-400 text-xs mr-2 select-none">{i+1}</span>
                    {word}
                  </div>
                ))}
              </div>
              <button 
                onClick={() => copyToClipboard(mnemonics, 'Secrets')}
                className="text-amber-700 text-sm font-bold hover:underline"
              >
                Copy secrets to clipboard
              </button>
            </div>
          )}

          {/* Grid Container with Full Height */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 min-h-0">
            
            {/* Left Column - Scrollable if content overflows */}
            <div className="md:col-span-7 flex flex-col gap-6 overflow-y-auto pr-2">
              
              {/* Balance Card */}
              <div className="flex-none bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:opacity-10 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium">
                      Account #{currentWalletIndex + 1}
                    </div>
                    <button onClick={refreshBalance} disabled={loading} className={`${loading ? 'animate-spin' : ''} hover:bg-white/10 p-2 rounded-full transition-colors`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    </button>
                  </div>

                  <div className="mb-8">
                    <span className="text-indigo-200 font-medium mb-1 block">Total Balance</span>
                    <div className="text-6xl font-black tracking-tight">
                      {currentWallet.balance.toFixed(2)} 
                      <span className="text-2xl font-bold opacity-60 ml-2">SOL</span>
                    </div>
                    <div className="text-lg text-indigo-200 mt-1 opacity-80">${(currentWallet.balance * 150).toFixed(2)} USD (Approx)</div>
                  </div>

                  <div className="bg-black/20 rounded-2xl p-4 flex items-center gap-3 backdrop-blur-sm cursor-pointer hover:bg-black/30 transition-colors" onClick={() => copyToClipboard(currentWallet.publicKey, 'Address')}>
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs text-indigo-200">My Address (Tap to copy)</p>
                      <p className="font-mono text-sm truncate w-full">{currentWallet.publicKey.slice(0, 8)}...{currentWallet.publicKey.slice(-8)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {!showSend ? (
                <div className="flex-none grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setShowSend(true)}
                    className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-100 hover:shadow-xl hover:scale-[1.02] transition-all group text-left border-2 border-transparent hover:border-indigo-100"
                  >
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Send</h3>
                    <p className="text-slate-400 text-sm">Transfer money</p>
                  </button>

                  <button 
                    onClick={addNewWallet}
                    className="bg-white p-6 rounded-3xl shadow-lg shadow-slate-100 hover:shadow-xl hover:scale-[1.02] transition-all group text-left border-2 border-transparent hover:border-indigo-100"
                  >
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:-rotate-12 transition-transform">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Add Account</h3>
                    <p className="text-slate-400 text-sm">Create new wallet</p>
                  </button>
                </div>
              ) : (
                <div className="flex-none bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200 animate-slide-up relative overflow-hidden">
                  {loading && <LoadingOverlay />}
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-black text-slate-800">Send Money</h3>
                    <button onClick={() => setShowSend(false)} className="bg-slate-100 hover:bg-slate-200 p-2 rounded-xl text-slate-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 mb-1 block">To Address</label>
                      <input 
                        type="text" 
                        placeholder="Paste address here..."
                        value={sendAddress}
                        onChange={(e) => setSendAddress(e.target.value)}
                        className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 rounded-2xl p-4 font-mono text-sm outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 mb-1 block">Amount (SOL)</label>
                      <input 
                        type="number" 
                        placeholder="0.00"
                        value={sendAmount}
                        onChange={(e) => setSendAmount(e.target.value)}
                        className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 rounded-2xl p-4 text-2xl font-black outline-none transition-all"
                      />
                    </div>
                    <button 
                      onClick={handleSendSol}
                      disabled={!sendAddress || !sendAmount}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-4 rounded-2xl text-lg shadow-lg shadow-emerald-200 transform active:scale-95 transition-all mt-2"
                    >
                      Confirm Send
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Fixed Height with Flex */}
            <div className="md:col-span-5 flex flex-col gap-6 h-full min-h-0">
              
              {/* Wallet Selector (Fixed Height) */}
              {wallets.length > 1 && (
                <div className="flex-none bg-white rounded-3xl p-6 shadow-lg shadow-slate-100">
                  <h3 className="font-bold text-slate-700 mb-4">My Accounts</h3>
                  <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-2">
                    {wallets.map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setCurrentWalletIndex(idx)}
                        className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all shrink-0 ${
                          currentWalletIndex === idx 
                          ? 'bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500' 
                          : 'bg-white hover:bg-slate-50 text-slate-500'
                        }`}
                      >
                        <span className="font-bold">Account #{idx + 1}</span>
                        {currentWalletIndex === idx && <div className="w-3 h-3 bg-indigo-500 rounded-full shadow"></div>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tokens/Collectibles List - Flex Grow & Scroll */}
              <div className="flex-1 bg-white rounded-[2rem] p-6 shadow-lg shadow-slate-100 flex flex-col min-h-0">
                <h3 className="flex-none text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                  <span className="text-2xl">💎</span> My Collectibles
                </h3>
                
                <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                  {currentWallet.splTokens.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                      <div className="text-4xl mb-3 opacity-50">👻</div>
                      <p className="text-slate-500 font-medium">Nothing here yet!</p>
                    </div>
                  ) : (
                    currentWallet.splTokens.map((token, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                            {token.mint.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-slate-700 text-sm">Token</p>
                            <p className="text-xs text-slate-400 font-mono">{token.mint.substring(0, 6)}...</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-800">{token.amount?.toFixed(2)}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {notification && (
          <div className={`fixed top-6 right-6 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-down z-50 ${
            notification.type === 'error' ? 'bg-red-500 text-white' : 'bg-slate-800 text-white'
          }`}>
             <div className={`p-1 rounded-full ${notification.type === 'error' ? 'bg-white/20' : 'bg-emerald-500'}`}>
                {notification.type === 'error' 
                  ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                  : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                }
             </div>
            <span className="font-bold">{notification.msg}</span>
          </div>
        )}

      </div>
      
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: translate(-50%, -20px); }
          50% { opacity: 1; transform: translate(-50%, 5px); }
          100% { transform: translate(-50%, 0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-slide-down { animation: slide-down 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-bounce-in { animation: bounce-in 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  );
}