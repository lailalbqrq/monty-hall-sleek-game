
interface GameStatsProps {
  gamesPlayed: number;
  gamesWon: number;
}

export const GameStats = ({ gamesPlayed, gamesWon }: GameStatsProps) => {
  const winRate = gamesPlayed > 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0;

  return (
    <div className="flex items-center justify-between text-sm text-white/90">
      <span>OF {gamesPlayed} TRIES</span>
      <span className="font-faster text-3xl text-white mx-2">{gamesWon}</span>
      <span>{winRate}% WIN RATE</span>
    </div>
  );
};
