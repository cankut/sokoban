import React, { useRef, useEffect } from 'react';
import GameCell from './GameCell';
import { type GameState } from '@/lib/sokoban';

interface GameBoardProps {
  gameState: GameState;
  onMove?: (dir: { dx: number; dy: number }) => void;
}

export default function GameBoard({ gameState, onMove }: GameBoardProps) {
  const maxCols = Math.max(...gameState.grid.map(row => row.length));
  const boardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!onMove) return;

    const el = boardRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    const threshold = 30; // pixels

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
        onMove({ dx: dx > 0 ? 1 : -1, dy: 0 });
      } else if (Math.abs(dy) > threshold) {
        onMove({ dx: 0, dy: dy > 0 ? 1 : -1 });
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd);

    return () => {
      el.removeEventListener('touchstart', onTouchStart as EventListener);
      el.removeEventListener('touchend', onTouchEnd as EventListener);
    };
  }, [onMove]);

  return (
    <div ref={boardRef} className="inline-block border-2 border-border rounded-sm bg-card p-2" data-testid="game-board">
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
