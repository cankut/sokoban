import { type CellType } from '@/lib/sokoban';

interface GameCellProps {
  type: CellType;
}

export default function GameCell({ type }: GameCellProps) {
  const getCellContent = () => {
    switch (type) {
      case 'wall':
        return '▓';
      case 'floor':
        return '';
      case 'goal':
        return '·';
      case 'box':
        return '▢';
      case 'player':
        return '☺';
      case 'box-on-goal':
        return '▣';
      case 'player-on-goal':
        return '☻';
      default:
        return '';
    }
  };

  const getCellClasses = () => {
    const base = 'w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl sm:text-2xl font-mono border transition-colors';
    
    switch (type) {
      case 'wall':
        return `${base} bg-muted text-muted-foreground border-border`;
      case 'goal':
        return `${base} bg-accent/30 text-accent-foreground border-accent-border`;
      case 'box':
        return `${base} bg-secondary text-secondary-foreground border-secondary-border font-bold`;
      case 'player':
        return `${base} bg-primary/20 text-primary border-primary-border`;
      case 'box-on-goal':
        return `${base} bg-primary text-primary-foreground border-primary-border font-bold`;
      case 'player-on-goal':
        return `${base} bg-primary/40 text-primary border-primary-border`;
      default:
        return `${base} bg-background border-border`;
    }
  };

  return (
    <div className={getCellClasses()} data-testid={`cell-${type}`}>
      {getCellContent()}
    </div>
  );
}
