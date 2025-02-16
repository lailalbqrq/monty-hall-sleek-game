
interface GameStatsProps {
  gamesPlayed: number;
  gamesWon: number;
}

export const GameStats = ({ gamesPlayed, gamesWon }: GameStatsProps) => {
  const winRate = gamesPlayed > 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0;

  return (
    <div className="flex items-center gap-4 text-sm text-white/90">
      <span>TRIES {gamesPlayed}</span>
      <span>WIN RATE {winRate}%</span>
    </div>
  );
};
