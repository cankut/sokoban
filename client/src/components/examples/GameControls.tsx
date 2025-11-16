import GameControls from '../GameControls';

export default function GameControlsExample() {
  const handleAction = (action: string) => {
    console.log(`${action} triggered`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-8">
      <div className="space-y-8">
        <div>
          <p className="text-sm text-muted-foreground mb-4">All buttons enabled</p>
          <GameControls
            onReset={() => handleAction('Reset')}
            onUndo={() => handleAction('Undo')}
            onPreviousLevel={() => handleAction('Previous Level')}
            onNextLevel={() => handleAction('Next Level')}
            canUndo={true}
            canGoPrevious={true}
            canGoNext={true}
          />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-4">Some disabled</p>
          <GameControls
            onReset={() => handleAction('Reset')}
            onUndo={() => handleAction('Undo')}
            onPreviousLevel={() => handleAction('Previous Level')}
            onNextLevel={() => handleAction('Next Level')}
            canUndo={false}
            canGoPrevious={false}
            canGoNext={true}
          />
        </div>
      </div>
    </div>
  );
}
