/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Trophy, Sparkles, RefreshCw } from 'lucide-react';

interface GameOverProps {
  attempts: number;
  startNewGame: () => void;
}

export const GameOver = ({ attempts, startNewGame }: GameOverProps) => {
  return (
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
  );
};
