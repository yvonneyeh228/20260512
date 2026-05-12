/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Send, ListRestart } from 'lucide-react';
import { RefObject } from 'react';

interface GuessFormProps {
  guess: string;
  setGuess: (value: string) => void;
  handleGuess: (e: React.FormEvent) => void;
  startNewGame: () => void;
  attempts: number;
  inputRef: RefObject<HTMLInputElement | null>;
}

export const GuessForm = ({ 
  guess, 
  setGuess, 
  handleGuess, 
  startNewGame, 
  attempts, 
  inputRef 
}: GuessFormProps) => {
  return (
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
  );
};
