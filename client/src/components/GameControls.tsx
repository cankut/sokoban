import { Button } from '@/components/ui/button';
import { RotateCcw, Undo, ChevronLeft, ChevronRight } from 'lucide-react';

interface GameControlsProps {
  onReset: () => void;
  onUndo: () => void;
  onPreviousLevel: () => void;
  onNextLevel: () => void;
  canUndo: boolean;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export default function GameControls({
  onReset,
  onUndo,
  onPreviousLevel,
  onNextLevel,
  canUndo,
  canGoPrevious,
  canGoNext,
}: GameControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
      <div className="flex gap-2">
        <Button
          onClick={onReset}
          variant="secondary"
          size="default"
          data-testid="button-reset"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        <Button
          onClick={onUndo}
          variant="secondary"
          size="default"
          disabled={!canUndo}
          data-testid="button-undo"
        >
          <Undo className="w-4 h-4 mr-2" />
          Undo
        </Button>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={onPreviousLevel}
          variant="outline"
          size="default"
          disabled={!canGoPrevious}
          data-testid="button-previous-level"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button
          onClick={onNextLevel}
          variant="outline"
          size="default"
          disabled={!canGoNext}
          data-testid="button-next-level"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
