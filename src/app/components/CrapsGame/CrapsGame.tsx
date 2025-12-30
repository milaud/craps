import { useCrapsGame } from "@/app/hooks/useCrapsGame";
import { BetType } from "@/app/types";
import { Dice } from "../Dice/Dice";
import { GameStatus } from "../GameState/GameState";
import { BetControls } from "../BetControls/BetControls";
import { Table } from "../Table/Table";
import styles from './CrapsGame.module.css';

const CrapsGame: React.FC = () => {
  const game = useCrapsGame();

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {/* <h1 className={styles.title}>
          Craps Table
        </h1> */}

        <GameStatus game={game} />

        <BetControls
          selectedChip={game.selectedChip}
          onSelectChip={game.setSelectedChip}
        />

        <Table
          onPlaceChip={game.placeBetFromTable}
          getBetsForCell={game.getBetsForCell}
          selectedChip={game.selectedChip}
          point={game.point}
        />

        <div className={styles.buttonContainer}>
          <button
            onClick={game.rollDice}
            disabled={game.isRolling || game.bets.length === 0}
            className={styles.rollBetButton}
          >
            {game.isRolling ? 'Rolling...' : 'Roll Dice'}
          </button>

          <button
            onClick={game.clearAllBets}
            disabled={game.bets.length === 0}
            className={styles.clearBetButton}
          >
            Clear Bets
          </button>

          <button
            onClick={game.newGame}
            className={styles.newGameButton}
          >
            New Game
          </button>
        </div>

        {/* {game.bets.length > 0 && (
          <div className={styles.activeBetsContainer}>
            <h3>Active Bets ({game.bets.length}):</h3>
            <div className={styles.activeBetsGrid}>
              {game.bets.map(bet => (
                <div key={bet.id} className={styles.betCard}>
                  <span>
                    {bet.type} {bet.number && `${bet.number}`}: ${bet.amount}
                  </span>
                  <button
                    onClick={() => game.removeBet(bet.id)}
                    className={styles.removeBetButton}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className={styles.totalWagered}>
              Total Wagered: ${game.bets.reduce((sum, bet) => sum + bet.amount, 0)}
            </div>
          </div>
        )} */}
        {game.bets.map(bet => (
          <div key={bet.id} className={styles.betCard}>
            <span>
              {bet.type} {bet.number && `(${bet.number})`}: ${bet.amount}
              {bet.type === BetType.Place && (
                <span style={{ marginLeft: '8px', color: bet.isOn ? '#4caf50' : '#ff9800' }}>
                  {bet.isOn ? '[ON]' : '[OFF]'}
                </span>
              )}
            </span>
            <div>
              {bet.type === BetType.Place && (
                <button
                  onClick={() => game.toggleBet(bet.id)}
                  style={{
                    background: bet.isOn ? '#ff9800' : '#4caf50',
                    marginRight: '4px'
                  }}
                >
                  {bet.isOn ? 'Turn Off' : 'Turn On'}
                </button>
              )}
              <button
                onClick={() => game.removeBet(bet.id)}
                className={styles.removeBetButton}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {game.rollHistory.length > 0 && (
          <div className={styles.rollHistoryContainer}>
            <h3>Roll History (Last 10):</h3>
            <div className={styles.rollHistoryFlex}>
              {game.rollHistory.slice(-10).map((roll, index) => (
                <div key={index} className={styles.rollHistoryItem}>
                  {roll.die1}+{roll.die2}={roll.total}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrapsGame;