import { useState } from "react";
import { DoorClosed, Car, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DoorProps {
  doorNumber: number;
  hasPrize: boolean;
  isSelectable: boolean;
  isRevealed: boolean;
  isSelected: boolean;
  onSelect: (doorNumber: number) => void;
}

export const Door = ({
  doorNumber,
  hasPrize,
  isSelectable,
  isRevealed,
  isSelected,
  onSelect,
  totalDoors,
}: DoorProps & { totalDoors: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate size based on total doors
  const getSize = () => {
    return "w-full p-0.5"; // change gap between doors HERE
  };

  return (
    <div
      className={cn(
        `${getSize()} aspect-[3/4] perspective cursor-pointer transition-transform duration-300`,
        isSelectable && "hover:scale-105",
        !isSelectable && "opacity-80 cursor-not-allowed"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => isSelectable && onSelect(doorNumber - 1)}
    >
      <div
        className={cn(
          "door-wrapper h-full",
          isRevealed && "animate-door-open",
          isSelected &&
            !isRevealed &&
            "ring-2 ring-primary ring-offset-2 md:ring-4 md:ring-offset-4 shadow-lg"
        )}
      >
        <div className="door-front flex flex-col items-center justify-center gap-2 md:gap-4">
          <DoorClosed
            className={cn(
              "w-8 h-8 md:w-12 md:h-12 text-gray-600 transition-transform duration-300",
              isHovered && isSelectable && "scale-110",
              isSelected && !isRevealed && "text-primary"
            )}
          />
          <span
            className={cn(
              "text-base md:text-lg font-semibold",
              isSelected && !isRevealed ? "text-primary" : "text-gray-700"
            )}
          >
            {doorNumber}
            {isSelected && !isRevealed && " (Selected)"}
          </span>
        </div>
        <div className="door-back flex items-center justify-center">
          {hasPrize ? (
            <Car className="w-8 h-8 md:w-12 md:h-12 text-primary animate-fade-in" />
          ) : (
            <X className="w-8 h-8 md:w-12 md:h-12 text-gray-400 animate-fade-in" />
          )}
        </div>
      </div>
    </div>
  );
};
