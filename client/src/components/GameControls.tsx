import React from 'react';
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
  onMove?: (dir: { dx: number; dy: number }) => void;
}

export default function GameControls({
  onReset,
  onUndo,
  onPreviousLevel,
  onNextLevel,
  canUndo,
  canGoPrevious,
  canGoNext,
  onMove,
}: GameControlsProps) {
  const [activeQuarter, setActiveQuarter] = React.useState<number | null>(null);

  const handleQuarterClick = (i: number) => {
    setActiveQuarter(i);
    // brief visual effect then reset
    window.setTimeout(() => setActiveQuarter(null), 200);
  };

  // map quarters to move directions (quarters rotated at 45°, 135°, 225°, 315°)
  const directions = [
    { dx: 0, dy: 1 },  // down (45°)
    { dx: -1, dy: 0 }, // left (135°)
    { dx: 0, dy: -1 }, // up (225°)
    { dx: 1, dy: 0 },  // right (315°)
  ];

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

      {/* Mobile D-pad: circular variant, visible only on small screens */}
      {onMove && (
        <div className="sm:hidden mt-4">
          <svg width="144" height="144" viewBox="0 0 144 144" xmlns="http://www.w3.org/2000/svg">
            {/* big outer circle */}
            <circle cx="72" cy="72" r="64" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="2" />

            {/* quarters rotated 45deg: sectors at 45,135,225,315 with arrows and separators grouped for unified click handling */}
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

                // arrow calculation
                const mid = startAngle + 45;
                const midRad = (mid * Math.PI) / 180;
                const rTip = 55;
                const rBase = 45;
                const tipX = cx + rTip * Math.cos(midRad);
                const tipY = cy + rTip * Math.sin(midRad);
                const perpRad = midRad + Math.PI / 2;
                const perpOffset = 10;
                const blX = cx + rBase * Math.cos(midRad) + perpOffset * Math.cos(perpRad);
                const blY = cy + rBase * Math.sin(midRad) + perpOffset * Math.sin(perpRad);
                const brX = cx + rBase * Math.cos(midRad) - perpOffset * Math.cos(perpRad);
                const brY = cy + rBase * Math.sin(midRad) - perpOffset * Math.sin(perpRad);
                const arrowPoints = `${tipX},${tipY} ${blX},${blY} ${brX},${brY}`;

                // separator line
                const angle = startAngle;
                const rad = (angle * Math.PI) / 180;
                const sepX = cx + r * Math.cos(rad);
                const sepY = cy + r * Math.sin(rad);

                const isActive = (i === activeQuarter);
                // button-like effect: scale down when active, opacity shift
                const scale = isActive ? 0.95 : 1;

                return (
                  <g
                    key={`quarter-group-${i}`}
                    style={{
                      transformOrigin: '72px 72px',
                      transform: `scale(${scale})`,
                      transition: 'transform 100ms ease, opacity 100ms ease',
                      cursor: 'pointer',
                      opacity: isActive ? 0.8 : 1,
                    }}
                    onClick={() => {
                      handleQuarterClick(i);
                      onMove(directions[i]);
                    }}
                  >
                    <path
                      d={d}
                      fill={color}
                      stroke="#d1d5db"
                      strokeWidth={0.8}
                      strokeLinejoin="round"
                    />
                    <line
                      x1={cx}
                      y1={cy}
                      x2={sepX}
                      y2={sepY}
                      stroke="#d1d5db"
                      strokeWidth={0.8}
                      pointerEvents="none"
                    />
                    <polygon points={arrowPoints} fill="#0f172a" opacity="0.95" pointerEvents="none" />
                  </g>
                );
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
      )}
    </div>
  );
}
