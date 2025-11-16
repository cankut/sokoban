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
    <div className="p-4">
      <svg width="144" height="144" viewBox="0 0 144 144" xmlns="http://www.w3.org/2000/svg">
        {/* big outer circle */}
        <circle cx="72" cy="72" r="64" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="2" />

        {/* quarters rotated 45deg: sectors at 45,135,225,315 */}
        {
          [45, 135, 225, 315].map((startAngle, i) => {
            const cx = 72;
            const cy = 72;
            const r = 64;
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = ((startAngle + 90) * Math.PI) / 180;
            const sx = cx + r * Math.cos(startRad);
            const sy = cy + r * Math.sin(startRad);
            const ex = cx + r * Math.cos(endRad);
            const ey = cy + r * Math.sin(endRad);
            const d = `M ${cx} ${cy} L ${sx} ${sy} A ${r} ${r} 0 0 1 ${ex} ${ey} Z`;
            const color = '#e5e7eb'; // unified light gray for all quarters
            return (
              <path
                key={i}
                d={d}
                fill={color}
                stroke="#d1d5db"
                strokeWidth={0.8}
                strokeLinejoin="round"
                opacity="1"
              />
            );
          })
        }

        {/* radial separators (center to outer radius) for sharper borders between quarters */}
        {
          [45, 135, 225, 315].map((angle, i) => {
            const cx = 72;
            const cy = 72;
            const r = 64;
            const rad = (angle * Math.PI) / 180;
            const x = cx + r * Math.cos(rad);
            const y = cy + r * Math.sin(rad);
            return (
              <line
                key={`sep-${i}`}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke="#d1d5db"
                strokeWidth={0.8}
              />
            );
          })
        }

        {/* arrows placed near mid-angle of each sector */}
        {
          [45, 135, 225, 315].map((startAngle, i) => {
            const mid = startAngle + 45;
            const midRad = (mid * Math.PI) / 180;
            const cx = 72;
            const cy = 72;
            // keep arrow size but move both tip and base outward by +10px
            const rTip = 55; // moved outward from 45 -> 55
            const rBase = 45; // moved outward from 35 -> 45
            const tipX = cx + rTip * Math.cos(midRad);
            const tipY = cy + rTip * Math.sin(midRad);
            // base left/right rotated perpendicular
            const perpRad = midRad + Math.PI / 2;
            const perpOffset = 10; // preserve triangle width
            const blX = cx + rBase * Math.cos(midRad) + perpOffset * Math.cos(perpRad);
            const blY = cy + rBase * Math.sin(midRad) + perpOffset * Math.sin(perpRad);
            const brX = cx + rBase * Math.cos(midRad) - perpOffset * Math.cos(perpRad);
            const brY = cy + rBase * Math.sin(midRad) - perpOffset * Math.sin(perpRad);
            const points = `${tipX},${tipY} ${blX},${blY} ${brX},${brY}`;
            return <polygon key={`arrow-${i}`} points={points} fill="#0f172a" opacity="0.95" />;
          })
        }

        {/* center OK circle */}
        <circle cx="72" cy="72" r="18" fill="#0f172a" />
        {/* use a translated group so text is exactly centered at the circle's origin */}
        <g transform="translate(72,72)">
          <text x="0" y="0" fontSize="11" fontFamily="Arial, sans-serif" fill="#fff" textAnchor="middle" dominantBaseline="central" alignmentBaseline="central" fontWeight="600">OK</text>
        </g>
      </svg>
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
