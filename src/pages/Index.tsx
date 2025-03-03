import { useState, useCallback, useEffect } from "react";
import { Door } from "@/components/Door";
import { GameStats } from "@/components/GameStats";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const Index = () => {
  const [gameState, setGameState] = useState<
    "selecting" | "revealed" | "finished"
  >("selecting");
  const [numDoors, setNumDoors] = useState<number>(3);
  const [gameResult, setGameResult] = useState<"won" | "lost" | null>(null);
  const [doors, setDoors] = useState(() => {
    const prizeLocation = Math.floor(Math.random() * numDoors);
    return Array(numDoors)
      .fill(null)
      .map((_, i) => ({
        hasPrize: i === prizeLocation,
        isRevealed: false,
        isSelected: false,
      }));
  });

  const handleNumDoorsChange = (value: number[]) => {
    setNumDoors(value[0]);
  };

  const [stats, setStats] = useState({ gamesPlayed: 0, gamesWon: 0 });
  
  const resetGame = useCallback(() => {
    const prizeLocation = Math.floor(Math.random() * numDoors);
    setDoors(
      Array(numDoors)
        .fill(null)
        .map((_, i) => ({
          hasPrize: i === prizeLocation,
          isRevealed: false,
          isSelected: false,
        }))
    );
    setGameState("selecting");
    setGameResult(null);
  }, [numDoors]);

  useEffect(() => {
    resetGame();
  }, [numDoors, resetGame]);

  const getStatusMessage = () => {
    switch (gameState) {
      case "selecting":
        return "PICK A DOOR TO PLAY";
      case "revealed":
        return "WOULD YOU LIKE TO STAY OR SWITCH?";
      case "finished":
        return gameResult === "won" ? "CONGRATS! YOU WON" : "YOU LOST! TRY AGAIN";
      default:
        return "TEST YOUR FATE";
    }
  };

  const handleDoorSelect = useCallback(
    (doorIndex: number) => {
      if (gameState === "selecting") {
        const newDoors = [...doors];
        newDoors[doorIndex].isSelected = true;

        const availableDoorsToReveal = doors
          .map((door, i) => ({ door, index: i }))
          .filter(({ door, index }) => index !== doorIndex && !door.hasPrize);

        const doorToReveal =
          availableDoorsToReveal[
            Math.floor(Math.random() * availableDoorsToReveal.length)
          ];
        newDoors[doorToReveal.index].isRevealed = true;

        setDoors(newDoors);
        setGameState("revealed");
      } else if (gameState === "revealed") {
        const newDoors = doors.map((door, i) => ({
          ...door,
          isRevealed: true,
          isSelected: i === doorIndex,
        }));

        setDoors(newDoors);
        setGameState("finished");

        const won = newDoors[doorIndex].hasPrize;
        setGameResult(won ? "won" : "lost");
        setStats((prev) => ({
          gamesPlayed: prev.gamesPlayed + 1,
          gamesWon: prev.gamesWon + (won ? 1 : 0),
        }));

        setTimeout(resetGame, 800);
      }
    },
    [doors, gameState, resetGame]
  );

  const getGridCols = (num: number) => {
    if (num <= 3) {
      return "grid-cols-3";
    } else if (num === 4) {
      return "grid-cols-4";
    } else {
      return "grid-cols-4 md:grid-cols-5";
    }
  };

  return (
    <div className="h-screen bg-teal-900 py-2 px-2 md:py-4 md:px-4 flex flex-col justify-between">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto space-y-2 p-4 bg-teal-900 relative h-[calc(100vh-6rem)] flex flex-col">
          <div className="grid grid-cols-3 text-white/90 text-sm mb-4">
            <div className="text-center">REVEAL CAR TO WIN</div>
            <div className="text-center">TEST YOUR FATE</div>
            <div className="text-right hidden md:block">PRESS CTR + R TO REFRESH</div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-6xl font-faster text-white tracking-wider w-full">MONTE Casino</h1>
          </div>

          <div className={`grid ${getGridCols(numDoors)} gap-2 py-2 md:py-4 flex-1 min-h-0`}>
            {doors.map((door, index) => (
              <Door
                key={index}
                doorNumber={index + 1}
                hasPrize={door.hasPrize}
                isSelectable={
                  gameState === "selecting" ||
                  (gameState === "revealed" && !door.isRevealed)
                }
                isRevealed={door.isRevealed}
                isSelected={door.isSelected}
                onSelect={handleDoorSelect}
              />
            ))}
          </div>

          <div className="mt-4">
            <div className="border border-white/10 rounded-none">
              <div className="text-center text-lg text-white font-medium border-b border-white/10 py-2">
                {getStatusMessage()}
              </div>
              
              <div className="grid grid-cols-2 divide-x divide-white/10">
                <div className="p-3">
                  <Slider 
                    className="mb-2"
                    defaultValue={[3]} 
                    max={8} 
                    min={3} 
                    step={1} 
                    onValueChange={handleNumDoorsChange}
                  />
                  <div className="text-white/90 text-sm">
                    <span>DIFFICULTY {numDoors}</span>
                  </div>
                </div>
                <div className="p-3">
                  <GameStats gamesPlayed={stats.gamesPlayed} gamesWon={stats.gamesWon} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="text-center text-white/60 text-sm py-2">
        Game designed and developed by laquery.com © 2025 laquery
      </footer>
    </div>
  );
};

export default Index;
