import { useCrapsGame } from "@/app/hooks/useCrapsGame";
import { BetType } from "@/app/types";
import { Dice } from "../Dice/Dice";
import { GameStatus } from "../GameState/GameState";
import { BetControls } from "../BetControls/BetControls";
import { Table } from "../Table/Table";

const CrapsGame: React.FC = () => {
  const game = useCrapsGame();

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0d47a1', 
      padding: '16px' 
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          color: 'white', 
          textAlign: 'center', 
          fontSize: '36px', 
          marginBottom: '24px' 
        }}>
          Craps Table
        </h1>
        
        <GameStatus game={game} />
        
        <BetControls 
          selectedChip={game.selectedChip} 
          onSelectChip={game.setSelectedChip} 
        />
        
        <Table 
          onPlaceChip={game.placeBetFromTable} 
          getBetsForCell={game.getBetsForCell} 
          selectedChip={game.selectedChip} 
        />
        
        <div style={{ textAlign: 'center', margin: '24px 0' }}>
          <button
            onClick={game.rollDice}
            disabled={game.isRolling || game.bets.length === 0}
            style={{
              padding: '16px 32px',
              fontSize: '24px',
              backgroundColor: game.bets.length === 0 ? '#666' : '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: game.bets.length === 0 ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              marginRight: '16px',
            }}
          >
            {game.isRolling ? 'Rolling...' : 'Roll Dice'}
          </button>
          
          <button
            onClick={game.clearAllBets}
            disabled={game.bets.length === 0}
            style={{
              padding: '16px 32px',
              fontSize: '18px',
              backgroundColor: game.bets.length === 0 ? '#666' : '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: game.bets.length === 0 ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              marginRight: '16px',
            }}
          >
            Clear Bets
          </button>

          <button
            onClick={game.newGame}
            style={{
              padding: '16px 32px',
              fontSize: '18px',
              backgroundColor: '#ff9800',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
            }}
          >
            New Game
          </button>
        </div>

        {game.bets.length > 0 && (
          <div style={{ 
            backgroundColor: 'rgba(0,0,0,0.7)', 
            color: 'white', 
            padding: '16px', 
            borderRadius: '8px',
            margin: '16px 0'
          }}>
            <h3>Active Bets ({game.bets.length}):</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
              {game.bets.map(bet => (
                <div key={bet.id} style={{ 
                  padding: '8px', 
                  backgroundColor: 'rgba(255,255,255,0.1)', 
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>
                    {bet.type} {bet.number && `(${bet.number})`}: ${bet.amount}
                  </span>
                  <button
                    onClick={() => game.removeBet(bet.id)}
                    style={{
                      background: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '12px', fontSize: '16px', fontWeight: 'bold' }}>
              Total Wagered: ${game.bets.reduce((sum, bet) => sum + bet.amount, 0)}
            </div>
          </div>
        )}

        {game.rollHistory.length > 0 && (
          <div style={{ 
            backgroundColor: 'rgba(0,0,0,0.5)', 
            color: 'white', 
            padding: '16px', 
            borderRadius: '8px',
            margin: '16px 0'
          }}>
            <h3>Roll History (Last 10):</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {game.rollHistory.slice(-10).map((roll, index) => (
                <div key={index} style={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)', 
                  padding: '8px 12px', 
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
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