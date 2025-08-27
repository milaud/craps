import { useCrapsGame } from "@/app/hooks/crapsGame";
import { GameStatus } from "../GameStatus/GameStatus";
import { DiceDisplay } from "../Dice/Dice";
import { GameControls } from "../GameControls/GameControls";
import { Table } from "../Table/Table";

export const CrapsGame = () => {
    const game = useCrapsGame();

    return (
        <div>
            {/* 
        At top show the following for debugging:
        Game Phase (Come Out Roll, point roll)
        Current Bets

        Table
        Chips/Bet Controls
        Dice
        GameControls
        */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Game Status & Dice */}
                <div className="space-y-6">
                    <GameStatus
                        phase={game.phase}
                        point={game.point}
                        lastRoll={game.lastRoll}
                    />

                    <div className="bg-gray-800 p-6 rounded-lg flex justify-center">
                        <DiceDisplay dice={game.dice} isRolling={game.isRolling} />
                    </div>

                    <GameControls
                        onRoll={game.rollDice}
                        onNewGame={game.newGame}
                        isRolling={game.isRolling}
                        hasBets={game.bets.length > 0}
                    />
                </div>

                {/* Craps Table/Betting Area */}
                <Table
                    bets={game.bets}
                    bankroll={game.bankroll}
                    onPlaceBet={game.placeBet}
                    onRemoveBet={game.removeBet}
                    onClearBets={game.clearAllBets}
                />

            </div>



            {/* <CrapsTable game={game} />
      <Dice values={game.gameState.dice} />
      <GameControls onRoll={game.rollDice} /> */}
        </div>
    );
};