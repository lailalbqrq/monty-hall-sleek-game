
import { useState } from "react";
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
        "h-full perspective cursor-pointer transition-transform duration-300",
        isSelectable && "hover:scale-105",
        !isSelectable && "opacity-80 cursor-not-allowed"
      )}
      style={{ aspectRatio: '3/4' }}
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
        {/* Card Back */}
        <div className="door-front">
          <div className="w-full h-full bg-gradient-to-br from-teal-800 to-teal-900 rounded-lg border border-white/10">
            {/* Casino Pattern */}
            <div className="w-full h-full p-4 relative">
              {/* Center Pattern */}
              <div className="absolute inset-4 border-2 border-teal-400/20 rounded-lg">
                <div className="absolute inset-2 border border-teal-400/10 rounded-lg" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-2 border-teal-400/20 rounded-full flex items-center justify-center rotate-45">
                    <div className="w-8 h-8 border border-teal-400/10 rounded-full" />
                  </div>
                </div>
                {/* Corner Patterns */}
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="absolute w-6 h-6 border border-teal-400/20"
                    style={{
                      [i < 2 ? "top" : "bottom"]: "0.5rem",
                      [i % 2 === 0 ? "left" : "right"]: "0.5rem",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card Front (Car or Joker) */}
        <div className="door-back">
          {hasPrize ? (
            // Car Card
            <div className="w-full h-full bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg border border-white/10 p-4">
              <div className="w-full h-full border-2 border-white/20 rounded-lg flex items-center justify-center">
                <div className="text-white/90 flex flex-col items-center gap-2">
                  <div className="w-16 h-16 border-2 border-white/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-10 h-10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M19 17h2v-4H19M17 17h-9v-4H17M6.75 17H5a2 2 0 0 1-2-2v-4h1.25M6.75 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m8.5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M4 13V6h16v7M4 6l3-3h9l3 3" />
                    </svg>
                  </div>
                  <span className="font-faster tracking-wider text-lg">WINNER</span>
                </div>
              </div>
            </div>
          ) : (
            // Joker Card
            <div className="w-full h-full bg-gradient-to-br from-teal-700 to-teal-800 rounded-lg border border-white/10 p-4">
              <div className="w-full h-full border-2 border-white/20 rounded-lg flex items-center justify-center">
                <div className="text-white/90 flex flex-col items-center gap-2">
                  <div className="w-16 h-16 border-2 border-white/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-10 h-10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                    </svg>
                  </div>
                  <span className="font-faster tracking-wider text-lg">JOKER</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
