
import { useState, useCallback } from "react";
import { Door } from "@/components/Door";
import { GameStats } from "@/components/GameStats";
import { GameInstructions } from "@/components/GameInstructions";
import { toast } from "sonner";

const Index = () => {
  const [gameState, setGameState] = useState<"selecting" | "revealed" | "finished">("selecting");
  const [doors, setDoors] = useState(() => {
    const prizeLocation = Math.floor(Math.random() * 3);
    return Array(3).fill(null).map((_, i) => ({
      hasPrize: i === prizeLocation,
      isRevealed: false,
      isSelected: false,
    }));
  });
  const [stats, setStats] = useState({ gamesPlayed: 0, gamesWon: 0 });
  const resetGame = useCallback(() => {
    const prizeLocation = Math.floor(Math.random() * 3);
    setGameState("selecting");
    toast("Pick a door to play!");
    setDoors(Array(3).fill(null).map((_, i) => ({
      hasPrize: i === prizeLocation,
      isRevealed: false,
      isSelected: false,
    })));
  }, []);
  const handleDoorSelect = useCallback((doorIndex: number) => {
    if (gameState === "selecting") {
      // First selection
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
      toast("Would you like to stay or switch?");
    } else if (gameState === "revealed") {
      // Final selection
      const newDoors = doors.map((door, i) => ({
        ...door,
        isRevealed: true,
        // Only update the selected state for the final choice
        isSelected: i === doorIndex,
      }));
      
      setDoors(newDoors);
      setGameState("finished");
      
      // Check if the final door choice has the prize
      const won = newDoors[doorIndex].hasPrize;
      setStats(prev => ({
        gamesPlayed: prev.gamesPlayed + 1,
        gamesWon: prev.gamesWon + (won ? 1 : 0),
      }));
      
      toast(won ? "Congratulations! You won! 🎉" : "Sorry, you lost! Try again!");
      
      // Reset the game after a delay
      setTimeout(resetGame, 3000);
    }
  }, [doors, gameState, resetGame]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-4xl font-semibold text-gray-900">Monty Hall Game</h1>
          <p className="text-gray-600">Put your intuition to the test!</p>
        </div>

        <GameStats gamesPlayed={stats.gamesPlayed} gamesWon={stats.gamesWon} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
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
