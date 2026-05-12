/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { useGuessGame } from './hooks/useGuessGame';
import { Header } from './components/Header';
import { GameStatus } from './components/GameStatus';
import { GuessForm } from './components/GuessForm';
import { GameOver } from './components/GameOver';
import { HistoryList } from './components/HistoryList';

export default function App() {
  const {
    guess,
    setGuess,
    message,
    attempts,
    gameOver,
    history,
    startNewGame,
    handleGuess
  } = useGuessGame();

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on game start or after a guess
  useEffect(() => {
    if (!gameOver && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameOver, guess]);

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
          <Header />

          <div className="p-8">
            <GameStatus message={message} gameOver={gameOver} />

            {!gameOver ? (
              <GuessForm 
                guess={guess}
                setGuess={setGuess}
                handleGuess={handleGuess}
                startNewGame={startNewGame}
                attempts={attempts}
                inputRef={inputRef}
              />
            ) : (
              <GameOver 
                attempts={attempts} 
                startNewGame={startNewGame} 
              />
            )}

            <HistoryList history={history} />
          </div>
        </motion.div>
        
        <footer className="text-center mt-10 text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
          <Sparkles size={12} />
          找出神祕號碼即是贏家
          <Sparkles size={12} />
        </footer>
      </div>
    </div>
  );
}
