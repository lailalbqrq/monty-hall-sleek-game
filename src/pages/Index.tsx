
import { useState, useCallback, useEffect } from "react";
import { Door } from "@/components/Door";
import { GameStats } from "@/components/GameStats";
import { GameInstructions } from "@/components/GameInstructions";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";

const Index = () => {
  const [gameState, setGameState] = useState<"selecting" | "revealed" | "finished">("selecting");
  const [numDoors, setNumDoors] = useState<number>(3);
  const [doors, setDoors] = useState(() => {
    const prizeLocation = Math.floor(Math.random() * numDoors);
    return Array(numDoors).fill(null).map((_, i) => ({
      hasPrize: i === prizeLocation,
      isRevealed: false,
      isSelected: false,
    }));
  });

  const handleNumDoorsChange = (value: number[]) => {
    setNumDoors(value[0]);
  }

  const [stats, setStats] = useState({ gamesPlayed: 0, gamesWon: 0 });
  const resetGame = useCallback(() => {
    const prizeLocation = Math.floor(Math.random() * numDoors);
    setDoors(Array(numDoors).fill(null).map((_, i) => ({
      hasPrize: i === prizeLocation,
      isRevealed: false,
      isSelected: false,
    })));
    setGameState("selecting");
    toast("Pick a door to play!", {
      position: "bottom-center",
    });
  }, [numDoors]);

  useEffect(() => {
    resetGame();
  }, [numDoors, resetGame]
  ) 

  const handleDoorSelect = useCallback((doorIndex: number) => {
    if (gameState === "selecting") {
      const newDoors = [...doors];
      newDoors[doorIndex].isSelected = true;

      // Reveal one empty door that wasn't selected
      const availableDoorsToReveal = doors
        .map((door, i) => ({ door, index: i }))
        .filter(({ door, index }) => index !== doorIndex && !door.hasPrize);

      const doorToReveal = availableDoorsToReveal[Math.floor(Math.random() * availableDoorsToReveal.length)];
      newDoors[doorToReveal.index].isRevealed = true;

      setDoors(newDoors);
      setGameState("revealed");
      toast("Would you like to stay or switch?", {
        position: "bottom-center",
      });
    } else if (gameState === "revealed") {
      const newDoors = doors.map((door, i) => ({
        ...door,
        isRevealed: true,
        isSelected: i === doorIndex,
      }));

      setDoors(newDoors);
      setGameState("finished");

      const won = newDoors[doorIndex].hasPrize;
      setStats(prev => ({
        gamesPlayed: prev.gamesPlayed + 1,
        gamesWon: prev.gamesWon + (won ? 1 : 0),
      }));

      toast(won ? "Congratulations! You won! 🎉" : "Sorry, you lost! Try again!", {
        position: "bottom-center",
      });

      setTimeout(resetGame, 800);
    }
  }, [doors, gameState, resetGame]);

  const getGridCols = (numDoors: number) => {
    if (numDoors <= 3) return 'grid-cols-3';
    if (numDoors <= 4) return 'grid-cols-2 md:grid-cols-4';
    if (numDoors <= 6) return 'grid-cols-2 md:grid-cols-3';
    return 'grid-cols-2 md:grid-cols-4';
  };

  return (
    <div className="min-h-screen bg-slate-200 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-4xl font-semibold text-gray-900">Monty Hall Game</h1>
          <p className="text-gray-600">Put your intuition to the test!</p>
        </div>

        <GameStats gamesPlayed={stats.gamesPlayed} gamesWon={stats.gamesWon} />

        <div className="w-full max-w-xs mx-auto px-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Number of Doors: {numDoors}</span>
          </div>
          <Slider 
            defaultValue={[3]} 
            max={8} 
            min={3} 
            step={1} 
            onValueChange={handleNumDoorsChange}
          />
        </div>

        <div className={`grid ${getGridCols(numDoors)} gap-4 py-8`}>
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

        <GameInstructions />
      </div>
    </div>
  );
};

export default Index;
