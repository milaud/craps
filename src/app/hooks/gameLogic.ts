import { GameState, GameActions, Bet, BetType, Dice, GamePhase } from '../types';

export const rollDice = (): Dice => {
  const die1 = Math.floor(Math.random() * 6) + 1;
  const die2 = Math.floor(Math.random() * 6) + 1;
  return { die1, die2, total: die1 + die2 };
};

export const isNatural = (total: number): boolean => total === 7 || total === 11;
export const isCraps = (total: number): boolean => total === 2 || total === 3 || total === 12;
export const isPoint = (total: number): boolean => [4, 5, 6, 8, 9, 10].includes(total);

export const resolvePassLineBets = (
  bets: Bet[],
  dice: Dice,
  phase: GamePhase,
  point: number | null
): { winningBets: Bet[], losingBets: Bet[] } => {
  const winningBets: Bet[] = [];
  const losingBets: Bet[] = [];

  bets.forEach(bet => {
    if (bet.type === BetType.Pass) {
      if (phase === GamePhase.ComeOutRoll) {
        if (isNatural(dice.total)) {
          winningBets.push(bet);
        } else if (isCraps(dice.total)) {
          losingBets.push(bet);
        }
        // If point is established, bet stays active
      } else if (phase === GamePhase.Point) {
        if (dice.total === point) {
          winningBets.push(bet);
        } else if (dice.total === 7) {
          losingBets.push(bet);
        }
      }
    } else if (bet.type === BetType.DontPass) {
      if (phase === GamePhase.ComeOutRoll) {
        if (dice.total === 2 || dice.total === 3) {
          winningBets.push(bet);
        } else if (isNatural(dice.total)) {
          losingBets.push(bet);
        }
        // 12 is a push (tie)
      } else if (phase === GamePhase.Point) {
        if (dice.total === 7) {
          winningBets.push(bet);
        } else if (dice.total === point) {
          losingBets.push(bet);
        }
      }
    }
  });

  return { winningBets, losingBets };
};

export const resolveFieldBets = (bets: Bet[], dice: Dice): { winningBets: Bet[], losingBets: Bet[] } => {
  const fieldNumbers = [2, 3, 4, 9, 10, 11, 12];
  const winningBets: Bet[] = [];
  const losingBets: Bet[] = [];

  bets.forEach(bet => {
    if (bet.type === BetType.Field) {
      if (fieldNumbers.includes(dice.total)) {
        winningBets.push(bet);
      } else {
        losingBets.push(bet);
      }
    }
  });

  return { winningBets, losingBets };
};

export const resolvePlaceBets = (bets: Bet[], dice: Dice): { winningBets: Bet[], losingBets: Bet[] } => {
  const winningBets: Bet[] = [];
  const losingBets: Bet[] = [];

  bets.forEach(bet => {
    if (bet.type === BetType.Place && bet.number && bet.isOn) {
      // if (dice.total === bet.number) {
      //   winningBets.push(bet);
      // } else if (dice.total === 7) {
      //   losingBets.push(bet);
      // }
      if (dice.total === 7) {
        losingBets.push(bet);
      }
    }
  });

  return { winningBets, losingBets };
};

export const resolveComeAndDontComeBets = (bets: Bet[], dice: Dice): { winningBets: Bet[], losingBets: Bet[] } => {
  const winningBets: Bet[] = [];
  const losingBets: Bet[] = [];

  bets.forEach(bet => {
    if (bet.type === BetType.Come) {
      if (isNatural(dice.total)) {
        winningBets.push(bet);
      } else if (isCraps(dice.total)) {
        losingBets.push(bet);
      }
      // If point number rolled, bet moves to that point (simplified - we'll treat as win for now)
    } else if (bet.type === BetType.DontCome) {
      if (dice.total === 2 || dice.total === 3) {
        winningBets.push(bet);
      } else if (isNatural(dice.total)) {
        losingBets.push(bet);
      }
      // 12 is a push
    }
  });

  return { winningBets, losingBets };
};

export const getWinMultiplier = (bet: Bet, dice: Dice): number => {
  switch (bet.type) {
    case BetType.Pass:
    case BetType.DontPass:
    case BetType.Come:
    case BetType.DontCome:
      return 1; // Even money
    case BetType.Field:
      if (dice.total === 2 || dice.total === 12) return 2; // Double on 2 or 12
      return 1;
    case BetType.Place:
      // Place bet payouts
      if (bet.number === 6 || bet.number === 8) return 7 / 6; // 7:6
      if (bet.number === 5 || bet.number === 9) return 7 / 5; // 7:5
      if (bet.number === 4 || bet.number === 10) return 9 / 5; // 9:5
      return 1;
    case BetType.Hardways:
      if (bet.number === 4 || bet.number === 10) return 7; // 7:1
      if (bet.number === 6 || bet.number === 8) return 9;  // 9:1
      return 1;
    default:
      return 1;
  }
};

export const getPlaceBetWinnings = (bets: Bet[], dice: Dice): number => {
  let winnings = 0;

  bets.forEach(bet => {
    if (bet.type === BetType.Place && bet.number && dice.total === bet.number && bet.isOn) {
      const multiplier = getWinMultiplier(bet, dice);
      winnings += bet.amount * multiplier; // Just the winnings, not the original bet
    }
  });

  return winnings;
};