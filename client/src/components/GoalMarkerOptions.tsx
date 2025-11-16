export const GoalMarkerOption1 = () => (
  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500" />
);

export const GoalMarkerOption2 = () => (
  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-green-400 to-green-600" />
);

export const GoalMarkerOption3 = () => (
  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-green-500" />
);

export const GoalMarkerOption4 = () => (
  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-dashed border-green-500" />
);

export const GoalMarkerOption5 = () => (
  <div className="relative w-4 h-4 sm:w-5 sm:h-5">
    <div className="absolute inset-0 rounded-full bg-green-500/30 blur-sm" />
    <div className="absolute inset-1 rounded-full bg-green-500" />
  </div>
);

interface GoalMarkerProps {
  option?: 1 | 2 | 3 | 4 | 5;
}

export default function GoalMarker({ option = 1 }: GoalMarkerProps) {
  switch (option) {
    case 1:
      return <GoalMarkerOption1 />;
    case 2:
      return <GoalMarkerOption2 />;
    case 3:
      return <GoalMarkerOption3 />;
    case 4:
      return <GoalMarkerOption4 />;
    case 5:
      return <GoalMarkerOption5 />;
    default:
      return <GoalMarkerOption1 />;
  }
}
