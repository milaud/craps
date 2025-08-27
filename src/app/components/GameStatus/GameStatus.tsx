import { GamePhase, Dice } from "@/app/types";

export const GameStatus: React.FC<{ phase: GamePhase; point: number | null; lastRoll: Dice | null }> = 
  ({ phase, point, lastRoll }) => (
    <div className="bg-gray-800 text-white p-4 rounded-lg">
      <div className="text-lg font-semibold mb-2">Game Status</div>
      <div>Phase: <span className="font-bold capitalize">{phase} Roll</span></div>
      {point && <div>Point: <span className="font-bold text-yellow-400">{point}</span></div>}
      {lastRoll && (
        <div>Last Roll: <span className="font-bold">{lastRoll.total}</span></div>
      )}
    </div>
  );