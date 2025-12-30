import { useCrapsGame } from "@/app/hooks/useCrapsGame";
import { GamePhase } from "@/app/types";
import styles from './GameState.module.css'

export const GameStatus: React.FC<{ game: ReturnType<typeof useCrapsGame> }> = ({ game }) => {
  return (
    <div className={styles.gameStatus}>
      <div>
        <h3>Bankroll</h3>
        <p className={styles.bankroll}>${game.bankroll}</p>
      </div>
      <div>
        <h3>Phase</h3>
        <p className={styles.phaseText}>
          {game.phase === GamePhase.ComeOutRoll ? 'Come Out' : 'Point'} Roll
        </p>
        {game.point && <p>Point: <strong>{game.point}</strong></p>}
      </div>
      <div>
        <h3>Last Roll</h3>
        <p className={styles.lastRollText}>
          {game.lastRoll ? `${game.lastRoll.die1} + ${game.lastRoll.die2} = ${game.lastRoll.total}` : 'None'}
        </p>
      </div>
    </div>
  );
};