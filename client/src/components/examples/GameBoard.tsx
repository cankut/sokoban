import GameBoard from '../GameBoard';
import { parseLevel, LEVELS } from '@/lib/sokoban';

export default function GameBoardExample() {
  const gameState = parseLevel(LEVELS[0].grid);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-8">
      <GameBoard gameState={gameState} />
    </div>
  );
}
