
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
      onClick={() => isSelectable && onSelect(doorNumber)}
    >
      <div
        className={cn(
          "door-wrapper",
          isRevealed && "animate-door-open",
          isSelected && !isRevealed && "ring-2 ring-primary ring-offset-2"
        )}
      >
        <div className="door-front flex flex-col items-center justify-center gap-4">
          <DoorClosed
            className={cn(
              "w-16 h-16 text-gray-600 transition-transform duration-300",
              isHovered && isSelectable && "scale-110"
            )}
          />
          <span className="text-2xl font-semibold text-gray-700">Door {doorNumber}</span>
        </div>
        <div className="door-back flex items-center justify-center">
          {hasPrize ? (
            <Car className="w-16 h-16 text-primary animate-fade-in" />
          ) : (
            <X className="w-16 h-16 text-gray-400 animate-fade-in" />
          )}
        </div>
      </div>
    </div>
  );
};
