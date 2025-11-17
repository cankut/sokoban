import React from 'react';
import GameCell from './GameCell';
import { type GameState } from '@/lib/sokoban';

interface GameBoardProps {
  gameState: GameState;
  onMove?: (dir: { dx: number; dy: number }) => void;
}

export default function GameBoard({ gameState }: GameBoardProps) {
  const maxCols = Math.max(...gameState.grid.map(row => row.length));

  return (
    <div className="inline-block border-2 border-border rounded-sm bg-card p-2" data-testid="game-board">
      <div className="flex flex-col gap-0">
        {gameState.grid.map((row, y) => (
          <div key={y} className="flex gap-0">
            {Array.from({ length: maxCols }, (_, x) => (
              <GameCell 
                key={`${x}-${y}`} 
                type={row[x] || 'floor'} 
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
