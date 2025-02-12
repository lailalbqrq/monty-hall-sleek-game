
interface GameStatsProps {
  gamesPlayed: number;
  gamesWon: number;
}

export const GameStats = ({ gamesPlayed, gamesWon }: GameStatsProps) => {
  const winRate = gamesPlayed > 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0;

  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-md mx-auto animate-fade-in">
      <div className="bg-white p-4 rounded-lg shadow-sm text-center">
        <p className="text-sm text-gray-500 font-medium">Games</p>
        <p className="text-2xl font-semibold text-gray-900">{gamesPlayed}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm text-center">
        <p className="text-sm text-gray-500 font-medium">Wins</p>
        <p className="text-2xl font-semibold text-gray-900">{gamesWon}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm text-center">
        <p className="text-sm text-gray-500 font-medium">Win Rate</p>
        <p className="text-2xl font-semibold text-gray-900">{winRate}%</p>
      </div>
    </div>
  );
};
