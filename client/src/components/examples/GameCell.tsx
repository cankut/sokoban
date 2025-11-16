import GameCell from '../GameCell';

export default function GameCellExample() {
  return (
    <div className="flex flex-wrap gap-4 p-8 bg-background">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Wall</span>
        <GameCell type="wall" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Floor</span>
        <GameCell type="floor" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Goal</span>
        <GameCell type="goal" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Box</span>
        <GameCell type="box" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Player</span>
        <GameCell type="player" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Box on Goal</span>
        <GameCell type="box-on-goal" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Player on Goal</span>
        <GameCell type="player-on-goal" />
      </div>
    </div>
  );
}
