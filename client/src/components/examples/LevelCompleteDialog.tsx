import LevelCompleteDialog from '../LevelCompleteDialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function LevelCompleteDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-8">
      <div className="space-y-4">
        <Button onClick={() => setOpen(true)} data-testid="button-show-dialog">
          Show Completion Dialog
        </Button>
        <LevelCompleteDialog
          open={open}
          levelNumber={1}
          levelName="Getting Started"
          moves={15}
          onNextLevel={() => {
            console.log('Next level triggered');
            setOpen(false);
          }}
          onRestart={() => {
            console.log('Restart triggered');
            setOpen(false);
          }}
          hasNextLevel={true}
        />
      </div>
    </div>
  );
}
