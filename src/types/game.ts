/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type GuessResult = 'high' | 'low' | 'correct';

export interface HistoryItem {
  value: number;
  result: GuessResult;
}

export interface GameState {
  targetNumber: number;
  guess: string;
  message: string;
  attempts: number;
  gameOver: boolean;
  history: HistoryItem[];
}
