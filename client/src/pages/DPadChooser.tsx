import React from 'react';
import { Button } from '@/components/ui/button';

type Variant = 'compact' | 'big-cross' | 'circular';

function Preview({ variant }: { variant: Variant }) {
  if (variant === 'compact') {
    return (
      <div className="inline-grid grid-cols-3 gap-2 items-center justify-center p-4">
        <div />
        <div className="w-12 h-12 bg-surface flex items-center justify-center rounded">▲</div>
        <div />
        <div className="w-12 h-12 bg-surface flex items-center justify-center rounded">◀</div>
        <div className="w-12 h-12 bg-muted flex items-center justify-center rounded">•</div>
        <div className="w-12 h-12 bg-surface flex items-center justify-center rounded">▶</div>
        <div />
        <div className="w-12 h-12 bg-surface flex items-center justify-center rounded">▼</div>
        <div />
      </div>
    );
  }

  if (variant === 'big-cross') {
    return (
      <div className="flex flex-col items-center gap-2 p-4">
        <div className="w-20 h-10 bg-surface flex items-center justify-center rounded">Up</div>
        <div className="flex gap-2">
          <div className="w-20 h-10 bg-surface flex items-center justify-center rounded">Left</div>
          <div className="w-20 h-10 bg-muted flex items-center justify-center rounded"> </div>
          <div className="w-20 h-10 bg-surface flex items-center justify-center rounded">Right</div>
        </div>
        <div className="w-20 h-10 bg-surface flex items-center justify-center rounded">Down</div>
      </div>
    );
  }

  return (
    <div className="relative w-36 h-36 p-4">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-12 h-12 bg-surface flex items-center justify-center rounded">▲</div>
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-12 h-12 bg-surface flex items-center justify-center rounded">◀</div>
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-12 h-12 bg-surface flex items-center justify-center rounded">▶</div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-12 h-12 bg-surface flex items-center justify-center rounded">▼</div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-muted flex items-center justify-center">OK</div>
    </div>
  );
}

export default function DPadChooser() {
  const [variant, setVariant] = React.useState<Variant>('compact');

  const choose = (v: Variant) => {
    localStorage.setItem('dpad-variant', v);
    alert(`Saved variant: ${v}. Navigate back to the game page to see it applied.`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start p-6 gap-6">
      <h1 className="text-2xl font-semibold">D‑Pad Variant Chooser (experiment)</h1>

      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col items-center gap-2 p-4 border rounded">
          <h2 className="font-medium">Compact</h2>
          <Preview variant="compact" />
          <Button onClick={() => choose('compact')}>Select Compact</Button>
        </div>

        <div className="flex flex-col items-center gap-2 p-4 border rounded">
          <h2 className="font-medium">Big Cross</h2>
          <Preview variant="big-cross" />
          <Button onClick={() => choose('big-cross')}>Select Big Cross</Button>
        </div>

        <div className="flex flex-col items-center gap-2 p-4 border rounded">
          <h2 className="font-medium">Circular</h2>
          <Preview variant="circular" />
          <Button onClick={() => choose('circular')}>Select Circular</Button>
        </div>
      </div>

      <div className="text-sm text-muted-foreground max-w-xl text-center">
        <p>After selecting a variant the choice is saved to localStorage under <code>dpad-variant</code>. When you confirm, I will update the project to use the chosen variant and remove this page.</p>
      </div>
    </div>
  );
}
