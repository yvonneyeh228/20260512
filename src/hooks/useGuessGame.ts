/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { HistoryItem } from '../types/game';

export function useGuessGame() {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('準備好挑戰了嗎？請輸入 1 到 100 之間的數字！');
  const [attempts, setAttempts] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const startNewGame = useCallback(() => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('輸入 1 到 100 之間的數字！');
    setAttempts(0);
    setGameOver(false);
    setHistory([]);
  }, []);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const handleGuess = useCallback((e?: React.FormEvent) => {
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
      setHistory((prev) => [{ value: numGuess, result: 'correct' }, ...prev]);
    } else if (numGuess < targetNumber) {
      setMessage('太低了！再猜高一點。');
      setHistory((prev) => [{ value: numGuess, result: 'low' }, ...prev]);
    } else {
      setMessage('太高了！再猜低一點。');
      setHistory((prev) => [{ value: numGuess, result: 'high' }, ...prev]);
    }

    setGuess('');
  }, [guess, targetNumber, attempts]);

  return {
    guess,
    setGuess,
    message,
    attempts,
    gameOver,
    history,
    startNewGame,
    handleGuess,
    targetNumber
  };
}
