import { useReducer, useCallback } from 'react';
import { GameState, GameActions, Bet, BetType, Dice } from '../types';
import { rollDice, resolvePassLineBets, resolveFieldBets, getWinMultiplier } from './gameLogic';

type GameAction =
    | { type: 'ROLL_DICE'; payload: Dice }
    | { type: 'SET_ROLLING'; payload: boolean }
    | { type: 'PLACE_BET'; payload: Bet }
    | { type: 'REMOVE_BET'; payload: string }
    | { type: 'CLEAR_BETS' }
    | { type: 'RESOLVE_BETS'; payload: { winnings: number; losers: string[] } }
    | { type: 'NEW_GAME' };

const initialState: GameState = {
    phase: 'comeOut',
    point: null,
    dice: { die1: 1, die2: 1, total: 2 },
    bets: [],
    bankroll: 1000,
    lastRoll: null,
    rollHistory: [],
    isRolling: false,
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case 'SET_ROLLING':
            return { ...state, isRolling: action.payload };

        case 'ROLL_DICE': {
            const dice = action.payload;
            const newHistory = [...state.rollHistory, dice];

            let newPhase = state.phase;
            let newPoint = state.point;

            if (state.phase === 'comeOut') {
                if (dice.total === 7 || dice.total === 11 || dice.total === 2 || dice.total === 3 || dice.total === 12) {
                    // Natural win/loss - stay in come out phase
                    newPhase = 'comeOut';
                    newPoint = null;
                } else {
                    // Point established
                    newPhase = 'point';
                    newPoint = dice.total;
                }
            } else if (state.phase === 'point') {
                if (dice.total === state.point || dice.total === 7) {
                    // Point made or seven out - back to come out
                    newPhase = 'comeOut';
                    newPoint = null;
                }
            }

            return {
                ...state,
                dice,
                lastRoll: dice,
                rollHistory: newHistory,
                phase: newPhase,
                point: newPoint,
                isRolling: false,
            };
        }

        case 'PLACE_BET': {
            if (state.bankroll >= action.payload.amount) {
                return {
                    ...state,
                    bets: [...state.bets, action.payload],
                    bankroll: state.bankroll - action.payload.amount,
                };
            }
            return state;
        }

        case 'REMOVE_BET': {
            const betToRemove = state.bets.find(bet => bet.id === action.payload);
            if (betToRemove) {
                return {
                    ...state,
                    bets: state.bets.filter(bet => bet.id !== action.payload),
                    bankroll: state.bankroll + betToRemove.amount,
                };
            }
            return state;
        }

        case 'CLEAR_BETS':
            const totalBetAmount = state.bets.reduce((sum, bet) => sum + bet.amount, 0);
            return {
                ...state,
                bets: [],
                bankroll: state.bankroll + totalBetAmount,
            };

        case 'RESOLVE_BETS': {
            const { winnings, losers } = action.payload;
            return {
                ...state,
                bankroll: state.bankroll + winnings,
                bets: state.bets.filter(bet => !losers.includes(bet.id)),
            };
        }

        case 'NEW_GAME':
            return { ...initialState, bankroll: 1000 };

        default:
            return state;
    }
};

export const useCrapsGame = (): GameState & GameActions => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    const handleRollDice = useCallback(() => {
        if (state.isRolling) return;

        dispatch({ type: 'SET_ROLLING', payload: true });

        // Simulate dice roll animation delay
        setTimeout(() => {
            const dice = rollDice();
            dispatch({ type: 'ROLL_DICE', payload: dice });

            // Resolve bets after roll
            setTimeout(() => {
                const { winningBets: passWinners, losingBets: passLosers } = resolvePassLineBets(
                    state.bets,
                    dice,
                    state.phase,
                    state.point
                );

                const { winningBets: fieldWinners, losingBets: fieldLosers } = resolveFieldBets(
                    state.bets,
                    dice
                );

                const allWinners = [...passWinners, ...fieldWinners];
                const allLosers = [...passLosers, ...fieldLosers];

                const totalWinnings = allWinners.reduce((sum, bet) => {
                    const multiplier = getWinMultiplier(bet, dice);
                    return sum + bet.amount + (bet.amount * multiplier);
                }, 0);

                const loserIds = allLosers.map(bet => bet.id);

                dispatch({
                    type: 'RESOLVE_BETS',
                    payload: { winnings: totalWinnings, losers: loserIds }
                });
            }, 500);
        }, 1000);
    }, [state.isRolling, state.bets, state.phase, state.point]);

    const handlePlaceBet = useCallback((type: BetType, amount: number, number?: number) => {
        const bet: Bet = {
            id: `${Date.now()}-${Math.random()}`,
            type,
            amount,
            number,
            isActive: true,
        };
        dispatch({ type: 'PLACE_BET', payload: bet });
    }, []);

    const handleRemoveBet = useCallback((betId: string) => {
        dispatch({ type: 'REMOVE_BET', payload: betId });
    }, []);

    const handleClearAllBets = useCallback(() => {
        dispatch({ type: 'CLEAR_BETS' });
    }, []);

    const handleNewGame = useCallback(() => {
        dispatch({ type: 'NEW_GAME' });
    }, []);

    return {
        ...state,
        rollDice: handleRollDice,
        placeBet: handlePlaceBet,
        removeBet: handleRemoveBet,
        clearAllBets: handleClearAllBets,
        newGame: handleNewGame,
    };
};