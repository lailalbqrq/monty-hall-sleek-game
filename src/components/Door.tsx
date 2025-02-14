
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
}: DoorProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "w-full aspect-[2/3] perspective cursor-pointer transition-transform duration-300",
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
            "ring-4 ring-primary ring-offset-4 shadow-lg"
        )}
      >
        <div className="door-front flex flex-col items-center justify-center gap-4">
          <DoorClosed
            className={cn(
              "w-12 h-12 md:w-16 md:h-16 text-gray-600 transition-transform duration-300",
              isHovered && isSelectable && "scale-110",
              isSelected && !isRevealed && "text-primary"
            )}
          />
          <span
            className={cn(
              "text-lg md:text-xl font-semibold",
              isSelected && !isRevealed ? "text-primary" : "text-gray-700"
            )}
          >
            {doorNumber}
            {isSelected && !isRevealed && " (Selected)"}
          </span>
        </div>
        <div className="door-back flex items-center justify-center">
          {hasPrize ? (
            <Car className="w-12 h-12 md:w-16 md:h-16 text-primary animate-fade-in" />
          ) : (
            <X className="w-12 h-12 md:w-16 md:h-16 text-gray-400 animate-fade-in" />
          )}
        </div>
      </div>
    </div>
  );
};
