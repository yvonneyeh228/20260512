/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RefreshCw, 
  Send, 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown, 
  History, 
  Trophy, 
  Target, 
  Sparkles,
  Gamepad2,
  ListRestart
} from 'lucide-react';

export default function App() {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('準備好挑戰了嗎？請輸入 1 到 100 之間的數字！');
  const [attempts, setAttempts] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [history, setHistory] = useState<{ value: number; result: 'high' | 'low' | 'correct' }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('輸入 1 到 100 之間的數字！');
    setAttempts(0);
    setGameOver(false);
    setHistory([]);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const handleGuess = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const numGuess = parseInt(guess);
    
    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      setMessage('請輸入有效的數字（1 到 100 之間）。');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (numGuess === targetNumber) {
      setMessage(`太厲害了！正確答案就是 ${targetNumber}。`);
      setGameOver(true);
      setHistory([{ value: numGuess, result: 'correct' }, ...history]);
    } else if (numGuess < targetNumber) {
      setMessage('太低了！再猜高一點。');
      setHistory([{ value: numGuess, result: 'low' }, ...history]);
    } else {
      setMessage('太高了！再猜低一點。');
      setHistory([{ value: numGuess, result: 'high' }, ...history]);
    }

    setGuess('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="w-full max-w-md relative">
        {/* Decorative elements */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-indigo-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-60"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-indigo-100/50 overflow-hidden border border-white"
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-800 p-8 text-white">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                <Gamepad2 size={24} className="text-white" />
              </div>
              <div className="flex bg-white/10 px-3 py-1 rounded-full backdrop-blur-md items-center gap-1.5 border border-white/10">
                <Target size={14} className="text-indigo-200" />
                <span className="text-xs font-bold tracking-wider">目標：1 - 100</span>
              </div>
            </div>
            <motion.h1 
              initial={{ x: -10 }}
              animate={{ x: 0 }}
              className="font-display text-3xl font-extrabold"
            >
              終極猜數字
            </motion.h1>
            <p className="text-indigo-100/80 text-sm font-medium mt-1">猜中那個神祕號碼挑戰王位！</p>
          </div>

          {/* Game Content */}
          <div className="p-8">
            <div className="mb-10 text-center min-h-[72px] flex flex-col items-center justify-center bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={message}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center gap-2"
                >
                  {gameOver ? (
                    <Sparkles className="text-yellow-500" size={24} />
                  ) : message.includes('高') ? (
                    <TrendingDown className="text-orange-500" size={24} />
                  ) : message.includes('低') ? (
                    <TrendingUp className="text-blue-500" size={24} />
                  ) : (
                    <Target className="text-indigo-400" size={24} />
                  )}
                  <p className={`text-lg font-bold ${
                    gameOver ? 'text-green-600' : 'text-slate-700'
                  }`}>
                    {message}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {!gameOver ? (
              <form onSubmit={handleGuess} className="space-y-6">
                <div className="relative group">
                  <div className="absolute inset-x-0 -bottom-1 h-2 bg-indigo-100 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity blur-lg"></div>
                  <input
                    ref={inputRef}
                    type="number"
                    min="1"
                    max="100"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder="輸入你的直覺..."
                    className="w-full px-6 py-6 bg-slate-50 border-2 border-slate-100 rounded-2xl text-3xl font-black text-center focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 transition-all outline-none text-slate-800 placeholder:text-slate-300"
                    id="guess-input"
                  />
                  <AnimatePresence>
                    {guess && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: 20 }}
                        type="submit"
                        className="absolute right-3 top-3 bottom-3 px-4 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center"
                        id="submit-guess"
                      >
                        <Send size={24} />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-between items-center bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                      {attempts}
                    </div>
                    <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">嘗試次數</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={startNewGame}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-600 transition-colors font-bold text-xs uppercase tracking-wider group"
                  >
                    <ListRestart size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                    重新開始
                  </button>
                </div>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <div className="relative inline-block">
                  <motion.div 
                    animate={{ rotate: [0, 10, -10, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-3xl shadow-xl shadow-orange-200"
                  >
                    <Trophy size={56} />
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-yellow-500"
                  >
                    <Sparkles size={16} />
                  </motion.div>
                </div>
                
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-2">總計次數亮點</p>
                  <p className="text-6xl font-black text-slate-900 font-display tabular-nums">{attempts}</p>
                </div>

                <button
                  onClick={startNewGame}
                  className="w-full py-5 bg-gradient-to-r from-indigo-600 to-blue-700 text-white rounded-2xl font-bold text-xl shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95"
                  id="play-again"
                >
                  <RefreshCw size={24} />
                  再挑戰一次
                </button>
              </motion.div>
            )}

            {/* History Feed */}
            {history.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest leading-none">
                    <History size={14} />
                    我的猜測足跡
                  </div>
                  <div className="h-px flex-1 bg-slate-100 ml-4"></div>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {history.map((h, i) => (
                    <motion.div
                      key={`${h.value}-${i}`}
                      initial={{ opacity: 0, scale: 0.5, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className={`px-3.5 py-2 rounded-xl text-sm font-black flex items-center gap-2 border shadow-sm ${
                        h.result === 'high' ? 'bg-orange-50/50 text-orange-600 border-orange-100' :
                        h.result === 'low' ? 'bg-blue-50/50 text-blue-600 border-blue-100' :
                        'bg-green-50 text-green-700 border-green-200 ring-2 ring-green-100'
                      }`}
                    >
                      <span className="opacity-80">{h.value}</span>
                      {h.result === 'high' ? <TrendingDown size={14} /> : 
                       h.result === 'low' ? <TrendingUp size={14} /> : 
                       <CheckCircle2 size={14} />}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
        
        <p className="text-center mt-10 text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
          <Sparkles size={12} />
          找出神祕號碼即是贏家
          <Sparkles size={12} />
        </p>
      </div>
    </div>
  );
}
