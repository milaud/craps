
export interface Dice {
  die1: number;
  die2: number;
  total: number;
}

export enum GamePhase {
    ComeOutRoll,
    Point
}

export enum BetType {
    Pass,
    DontPass,
    Come,
    DontCome,
    Field,
    Number,
    Hardways,
    Place
}
//   add others here, see https://rwcatskills.com/casino/table-games/how-to-play-craps/

export interface Bet {
  id: string; // which cell the bet is on
  type: BetType;
  amount: number; // amount bet
  number?: number; // For place bets, hardways, etc.
  isActive: boolean;
}

export interface GameState {
  phase: GamePhase;
  point: number | null;
  dice: Dice;
  bets: Bet[];
  bankroll: number;
  lastRoll: Dice | null;
  rollHistory: Dice[];
  isRolling: boolean;
}

export interface GameActions {
  rollDice: () => void;
  placeBet: (type: BetType, amount: number, number?: number) => void;
  removeBet: (betId: string) => void;
  clearAllBets: () => void;
  newGame: () => void;
}