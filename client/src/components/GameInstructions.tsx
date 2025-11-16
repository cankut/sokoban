import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function GameInstructions() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-mono">How to Play</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div>
          <p className="text-muted-foreground mb-2">
            Push all boxes (▢) onto the goal positions (·) to complete each level.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-2">Controls:</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="font-mono">Arrow Keys</Badge>
            <Badge variant="outline" className="font-mono">WASD</Badge>
            <span className="text-muted-foreground">- Move player</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="font-mono">R</Badge>
            <span className="text-muted-foreground">- Reset level</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="font-mono">U</Badge>
            <span className="text-muted-foreground">- Undo last move</span>
          </div>
        </div>
        <div>
          <p className="text-muted-foreground">
            You can only push boxes, not pull them. Plan your moves carefully!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
