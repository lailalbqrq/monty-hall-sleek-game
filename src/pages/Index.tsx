
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
    if (numDoors <= 6) return 'grid-cols-3 md:grid-cols-3';
    if (numDoors <= 8) return 'grid-cols-4 md:grid-cols-4';
    return 'grid-cols-4 md:grid-cols-4';
  };

  return (
    <div className="min-h-screen bg-teal-800 py-8 px-2 md:py-12 md:px-4">
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 p-6 bg-teal-800 relative overflow-hidden">
        <div className="trapezium-corner trapezium-top-left" />
        <div className="trapezium-corner trapezium-top-right" />
        <div className="trapezium-corner trapezium-bottom-left" />
        <div className="trapezium-corner trapezium-bottom-right" />
        
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-semibold text-white italic tracking-wider">MONTE Casino</h1>
        </div>

        <div className="bg-teal-700/30 border border-teal-600/30 rounded-lg p-4 space-y-4">
          <div className="text-center text-xl text-white font-medium">
            {gameState === "revealed" ? "WOULD YOU LIKE TO STAY OR SWITCH?" : "TEST YOUR FATE"}
          </div>
          
          <div className="w-full max-w-xs mx-auto">
            <Slider className="mb-4"
              defaultValue={[3]} 
              max={8} 
              min={3} 
              step={1} 
              onValueChange={handleNumDoorsChange}
            />
            <div className="flex items-center justify-between text-white/90 text-sm">
              <span>DIFFICULTY {numDoors}</span>
              <GameStats gamesPlayed={stats.gamesPlayed} gamesWon={stats.gamesWon} />
            </div>
          </div>
        </div>

        <div className={`grid ${getGridCols(numDoors)} gap-2 md:gap-4 py-4 md:py-8`}>
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
