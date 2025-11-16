import GameHeader from '../GameHeader';

export default function GameHeaderExample() {
  return (
    <div className="bg-background">
      <GameHeader
        levelNumber={3}
        levelName="Corner Push"
        totalLevels={10}
        moves={42}
      />
    </div>
  );
}
