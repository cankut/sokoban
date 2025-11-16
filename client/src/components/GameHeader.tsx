import { Badge } from '@/components/ui/badge';

interface GameHeaderProps {
  levelNumber: number;
  levelName: string;
  totalLevels: number;
  moves: number;
}

export default function GameHeader({ levelNumber, levelName, totalLevels, moves }: GameHeaderProps) {
  return (
    <div className="w-full border-b border-border bg-card">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-wider font-mono" data-testid="text-game-title">
              SOKOBAN
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Level</p>
              <Badge variant="secondary" className="text-base font-mono" data-testid="text-level-number">
                {levelNumber}/{totalLevels}
              </Badge>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Moves</p>
              <Badge variant="outline" className="text-base font-mono" data-testid="text-moves">
                {moves}
              </Badge>
            </div>
          </div>
        </div>
        <div className="mt-2 text-center sm:text-left">
          <p className="text-sm text-muted-foreground font-mono" data-testid="text-level-name">
            {levelName}
          </p>
        </div>
      </div>
    </div>
  );
}
