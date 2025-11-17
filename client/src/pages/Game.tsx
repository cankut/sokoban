import { useState, useEffect, useCallback } from 'react';
import GameHeader from '@/components/GameHeader';
import GameBoard from '@/components/GameBoard';
import GameControls from '@/components/GameControls';
import GameInstructions from '@/components/GameInstructions';
import LevelCompleteDialog from '@/components/LevelCompleteDialog';
import { LEVELS, parseLevel, movePlayer, type GameState } from '@/lib/sokoban';

export default function Game() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [gameState, setGameState] = useState<GameState>(() => 
    parseLevel(LEVELS[0].grid)
  );
  const [history, setHistory] = useState<GameState[]>([]);
  const [showInstructions, setShowInstructions] = useState(true);

  const currentLevel = LEVELS[currentLevelIndex];

  const resetLevel = useCallback(() => {
    const newState = parseLevel(currentLevel.grid);
    setGameState(newState);
    setHistory([]);
  }, [currentLevel]);

  const handleUndo = useCallback(() => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setGameState(previousState);
      setHistory(history.slice(0, -1));
    }
  }, [history]);

  const handleNextLevel = useCallback(() => {
    if (currentLevelIndex < LEVELS.length - 1) {
      const nextIndex = currentLevelIndex + 1;
      setCurrentLevelIndex(nextIndex);
      const newState = parseLevel(LEVELS[nextIndex].grid);
      setGameState(newState);
      setHistory([]);
    }
  }, [currentLevelIndex]);

  const handlePreviousLevel = useCallback(() => {
    if (currentLevelIndex > 0) {
      const prevIndex = currentLevelIndex - 1;
      setCurrentLevelIndex(prevIndex);
      const newState = parseLevel(LEVELS[prevIndex].grid);
      setGameState(newState);
      setHistory([]);
    }
  }, [currentLevelIndex]);

  const handleMove = useCallback((direction: { dx: number; dy: number }) => {
    if (gameState.isComplete) return;

    const newState = movePlayer(gameState, direction);
    if (newState !== gameState) {
      setHistory([...history, gameState]);
      setGameState(newState);
    }
  }, [gameState, history]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      switch (key) {
        case 'arrowup':
        case 'w':
          e.preventDefault();
          handleMove({ dx: 0, dy: -1 });
          break;
        case 'arrowdown':
        case 's':
          e.preventDefault();
          handleMove({ dx: 0, dy: 1 });
          break;
        case 'arrowleft':
        case 'a':
          e.preventDefault();
          handleMove({ dx: -1, dy: 0 });
          break;
        case 'arrowright':
        case 'd':
          e.preventDefault();
          handleMove({ dx: 1, dy: 0 });
          break;
        case 'r':
          e.preventDefault();
          resetLevel();
          break;
        case 'u':
          e.preventDefault();
          handleUndo();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove, resetLevel, handleUndo]);

  useEffect(() => {
    if (showInstructions) {
      const timer = setTimeout(() => setShowInstructions(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showInstructions]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <GameHeader
        levelNumber={currentLevel.id}
        levelName={currentLevel.name}
        totalLevels={LEVELS.length}
        moves={gameState.moves}
      />

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 gap-8">
        <GameBoard gameState={gameState} onMove={handleMove} />
        
        <GameControls
          onReset={resetLevel}
          onUndo={handleUndo}
          onPreviousLevel={handlePreviousLevel}
          onNextLevel={handleNextLevel}
          onMove={handleMove}
          canUndo={history.length > 0}
          canGoPrevious={currentLevelIndex > 0}
          canGoNext={currentLevelIndex < LEVELS.length - 1}
        />

        {showInstructions && (
          <div className="w-full max-w-2xl">
            <GameInstructions />
          </div>
        )}
      </main>

      <footer className="border-t border-border py-4">
        <p className="text-center text-xs text-muted-foreground font-mono">
          Use Arrow Keys or WASD to move • R to reset • U to undo
        </p>
      </footer>

      <LevelCompleteDialog
        open={gameState.isComplete}
        levelNumber={currentLevel.id}
        levelName={currentLevel.name}
        moves={gameState.moves}
        onNextLevel={handleNextLevel}
        onRestart={resetLevel}
        hasNextLevel={currentLevelIndex < LEVELS.length - 1}
      />
    </div>
  );
}
