import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';

interface LevelCompleteDialogProps {
  open: boolean;
  levelNumber: number;
  levelName: string;
  moves: number;
  onNextLevel: () => void;
  onRestart: () => void;
  hasNextLevel: boolean;
}

export default function LevelCompleteDialog({
  open,
  levelNumber,
  levelName,
  moves,
  onNextLevel,
  onRestart,
  hasNextLevel,
}: LevelCompleteDialogProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-level-complete">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            Level Complete!
          </DialogTitle>
          <DialogDescription className="text-center space-y-2">
            <p className="text-lg font-semibold text-foreground">
              {levelName}
            </p>
            <p className="text-muted-foreground">
              Completed in <span className="font-bold text-foreground">{moves}</span> moves
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col sm:flex-col gap-2">
          {hasNextLevel && (
            <Button
              onClick={onNextLevel}
              variant="default"
              className="w-full"
              data-testid="button-next-level-dialog"
            >
              Next Level
            </Button>
          )}
          <Button
            onClick={onRestart}
            variant="outline"
            className="w-full"
            data-testid="button-restart-dialog"
          >
            Restart Level
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
