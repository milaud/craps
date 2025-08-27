export const GameControls: React.FC<{
  onRoll: () => void;
  onNewGame: () => void;
  isRolling: boolean;
  hasBets: boolean;
}> = ({ onRoll, onNewGame, isRolling, hasBets }) => (
  <div className="flex space-x-4">
    <button
      onClick={onRoll}
      disabled={isRolling || !hasBets}
      className="bg-green-600 hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed px-6 py-3 text-white font-bold rounded-lg text-xl transition-colors"
    >
      {isRolling ? 'Rolling...' : 'Roll Dice'}
    </button>
    <button
      onClick={onNewGame}
      className="bg-yellow-600 hover:bg-yellow-700 px-6 py-3 text-white font-bold rounded-lg transition-colors"
    >
      New Game
    </button>
  </div>
);