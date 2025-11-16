import { type CellType } from '@/lib/sokoban';
import crateImage from '@assets/generated_images/Wooden_crate_game_sprite_260368cd.png';
import wallImage from '@assets/generated_images/Red_brick_wall_texture_914de9ae.png';
import playerImage from '@assets/generated_images/Large_worker_character_sprite_3ba4e720.png';

interface GameCellProps {
  type: CellType;
}

const GoalMarker = () => (
  <div className="relative w-3 h-3 sm:w-4 sm:h-4">
    <div className="absolute inset-0 rounded-full bg-green-500"></div>
    <div className="absolute top-0 right-0 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-300"></div>
  </div>
);

export default function GameCell({ type }: GameCellProps) {
  const getCellContent = () => {
    switch (type) {
      case 'wall':
        return <img src={wallImage} alt="Wall" className="w-full h-full object-cover" />;
      case 'floor':
        return null;
      case 'goal':
        return <GoalMarker />;
      case 'box':
        return <img src={crateImage} alt="Box" className="w-3/4 h-3/4 object-contain" />;
      case 'player':
        return <img src={playerImage} alt="Player" className="w-full h-full object-contain" />;
      case 'box-on-goal':
        return (
          <>
            <div className="absolute">
              <GoalMarker />
            </div>
            <img src={crateImage} alt="Box" className="w-3/4 h-3/4 object-contain" />
          </>
        );
      case 'player-on-goal':
        return (
          <>
            <div className="absolute">
              <GoalMarker />
            </div>
            <img src={playerImage} alt="Player" className="w-full h-full object-contain" />
          </>
        );
      default:
        return null;
    }
  };

  const getCellClasses = () => {
    const base = 'w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border transition-colors relative';
    
    switch (type) {
      case 'wall':
        return `${base} bg-muted border-border overflow-hidden`;
      case 'goal':
        return `${base} bg-accent/20 border-accent-border`;
      case 'box':
        return `${base} bg-background border-border`;
      case 'player':
        return `${base} bg-background border-border`;
      case 'box-on-goal':
        return `${base} bg-accent/20 border-accent-border`;
      case 'player-on-goal':
        return `${base} bg-accent/20 border-accent-border`;
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
