import { useCrapsGame } from "@/app/hooks/useCrapsGame";
import { GamePhase } from "@/app/types";

export const GameStatus: React.FC<{ game: ReturnType<typeof useCrapsGame> }> = ({ game }) => {
  return (
    <div style={{ 
      backgroundColor: '#333', 
      color: 'white', 
      padding: '16px', 
      borderRadius: '8px', 
      margin: '16px 0',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      textAlign: 'center'
    }}>
      <div>
        <h3>Bankroll</h3>
        <p style={{ fontSize: '24px', color: '#4caf50', fontWeight: 'bold' }}>${game.bankroll}</p>
      </div>
      <div>
        <h3>Phase</h3>
        <p style={{ fontSize: '18px', textTransform: 'capitalize' }}>
          {game.phase === GamePhase.ComeOutRoll ? 'Come Out' : 'Point'} Roll
        </p>
        {game.point && <p>Point: <strong>{game.point}</strong></p>}
      </div>
      <div>
        <h3>Last Roll</h3>
        <p style={{ fontSize: '24px' }}>
          {game.lastRoll ? `${game.lastRoll.die1} + ${game.lastRoll.die2} = ${game.lastRoll.total}` : 'None'}
        </p>
      </div>
    </div>
  );
};
