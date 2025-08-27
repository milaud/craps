// types.ts
export interface Dice {
    die1: number;
    die2: number;
    total: number;
}

export type GamePhase = 'comeOut' | 'point';

export type BetType =
    | 'pass'
    | 'dontPass'
    | 'come'
    | 'dontCome'
    | 'field'
    | 'any7'
    | 'hardways'
    | 'place';

export interface Bet {
    id: string;
    type: BetType;
    amount: number;
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
