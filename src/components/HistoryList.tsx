/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { History, TrendingUp, TrendingDown, CheckCircle2 } from 'lucide-react';
import { HistoryItem } from '../types/game';

interface HistoryListProps {
  history: HistoryItem[];
}

export const HistoryList = ({ history }: HistoryListProps) => {
  if (history.length === 0) return null;

  return (
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
  );
};
