
export const GameInstructions = () => {
  return (
    <div className="max-w-md mx-auto text-center space-y-2 animate-fade-in">
      <h2 className="text-lg font-semibold text-gray-900">How to Play</h2>
      <ol className="text-sm text-gray-600 space-y-1">
        <li>1. Select one of the three doors</li>
        <li>2. One empty door will be revealed</li>
        <li>3. Choose to stay or switch your selection</li>
        <li>4. Find the car to win!</li>
      </ol>
    </div>
  );
};
