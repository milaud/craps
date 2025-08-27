import { Dice, Bet, GamePhase } from "../types";

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
        if (bet.type === 'pass') {
            if (phase === 'comeOut') {
                if (isNatural(dice.total)) {
                    winningBets.push(bet);
                } else if (isCraps(dice.total)) {
                    losingBets.push(bet);
                }
                // If point is established, bet stays active
            } else if (phase === 'point') {
                if (dice.total === point) {
                    winningBets.push(bet);
                } else if (dice.total === 7) {
                    losingBets.push(bet);
                }
            }
        } else if (bet.type === 'dontPass') {
            if (phase === 'comeOut') {
                if (dice.total === 2 || dice.total === 3) {
                    winningBets.push(bet);
                } else if (isNatural(dice.total)) {
                    losingBets.push(bet);
                }
                // 12 is a push (tie)
            } else if (phase === 'point') {
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
        if (bet.type === 'field') {
            if (fieldNumbers.includes(dice.total)) {
                winningBets.push(bet);
            } else {
                losingBets.push(bet);
            }
        }
    });

    return { winningBets, losingBets };
};

export const getWinMultiplier = (bet: Bet, dice: Dice): number => {
    switch (bet.type) {
        case 'pass':
        case 'dontPass':
        case 'come':
        case 'dontCome':
            return 1; // Even money
        case 'field':
            if (dice.total === 2 || dice.total === 12) return 2; // Double on 2 or 12
            return 1;
        case 'any7':
            return 4; // 4:1 payout
        case 'hardways':
            // Hardways have different payouts based on the number
            if (bet.number === 4 || bet.number === 10) return 7; // 7:1
            if (bet.number === 6 || bet.number === 8) return 9;  // 9:1
            return 1;
        default:
            return 1;
    }
};