/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Gamepad2, Target } from 'lucide-react';

export const Header = () => {
  return (
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
  );
};
