import {
  GoalMarkerOption1,
  GoalMarkerOption2,
  GoalMarkerOption3,
  GoalMarkerOption4,
  GoalMarkerOption5,
} from '../GoalMarkerOptions';
import { Card } from '@/components/ui/card';

export default function GoalMarkerOptionsExample() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-8">
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-center">Choose Your Goal Marker Style</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="p-6 flex flex-col items-center gap-4">
            <div className="text-sm font-semibold text-muted-foreground">Option 1</div>
            <div className="w-24 h-24 border border-border rounded-sm flex items-center justify-center bg-accent/20">
              <GoalMarkerOption1 />
            </div>
            <div className="text-xs text-center text-muted-foreground">Solid Circle</div>
          </Card>

          <Card className="p-6 flex flex-col items-center gap-4">
            <div className="text-sm font-semibold text-muted-foreground">Option 2</div>
            <div className="w-24 h-24 border border-border rounded-sm flex items-center justify-center bg-accent/20">
              <GoalMarkerOption2 />
            </div>
            <div className="text-xs text-center text-muted-foreground">Gradient Circle</div>
          </Card>

          <Card className="p-6 flex flex-col items-center gap-4">
            <div className="text-sm font-semibold text-muted-foreground">Option 3</div>
            <div className="w-24 h-24 border border-border rounded-sm flex items-center justify-center bg-accent/20">
              <GoalMarkerOption3 />
            </div>
            <div className="text-xs text-center text-muted-foreground">Ring/Outline</div>
          </Card>

          <Card className="p-6 flex flex-col items-center gap-4">
            <div className="text-sm font-semibold text-muted-foreground">Option 4</div>
            <div className="w-24 h-24 border border-border rounded-sm flex items-center justify-center bg-accent/20">
              <GoalMarkerOption4 />
            </div>
            <div className="text-xs text-center text-muted-foreground">Dashed Ring</div>
          </Card>

          <Card className="p-6 flex flex-col items-center gap-4">
            <div className="text-sm font-semibold text-muted-foreground">Option 5</div>
            <div className="w-24 h-24 border border-border rounded-sm flex items-center justify-center bg-accent/20">
              <GoalMarkerOption5 />
            </div>
            <div className="text-xs text-center text-muted-foreground">Glowing Circle</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
