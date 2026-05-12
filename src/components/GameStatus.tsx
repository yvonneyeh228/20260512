/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, TrendingDown, Target, Sparkles } from 'lucide-react';

interface GameStatusProps {
  message: string;
  gameOver: boolean;
}

export const GameStatus = ({ message, gameOver }: GameStatusProps) => {
  return (
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
  );
};
