

/*

Game Starts in ComeOutRoll state

User places bets
State:
    Which cells have bets placed for which amounts

Roll dice
State:
    Check result of dice roll, resolve bets
    Keep doing this until 7 (or craps or point), resolve bets

Go back to initial state

*/


// useCrapsGame.ts
import { useReducer, useCallback } from 'react';
import { GameState, GameActions, Bet, BetType, Dice, GamePhase } from '../types';
import { rollDice, resolvePassLineBets, resolveFieldBets, resolvePlaceBets, resolveComeAndDontComeBets, getWinMultiplier, getPlaceBetWinnings } from './gameLogic';

type GameAction =
    | { type: 'ROLL_DICE'; payload: Dice }
    | { type: 'SET_ROLLING'; payload: boolean }
    | { type: 'PLACE_BET'; payload: Bet }
    | { type: 'REMOVE_BET'; payload: string }
    | { type: 'TOGGLE_BET'; payload: string }
    | { type: 'CLEAR_BETS' }
    | { type: 'RESOLVE_BETS'; payload: { winnings: number; losers: string[] } }
    | { type: 'NEW_GAME' }
    | { type: 'SET_SELECTED_CHIP'; payload: number }
    | { type: 'ROLL_AND_RESOLVE'; payload: { dice: Dice; newPhase: GamePhase; newPoint: number | null } };

const initialState: GameState & { selectedChip: number } = {
    phase: GamePhase.ComeOutRoll,
    point: null,
    dice: { die1: 1, die2: 1, total: 2 },
    bets: [],
    bankroll: 1000,
    lastRoll: null,
    rollHistory: [],
    isRolling: false,
    selectedChip: 25,
};

const gameReducer = (state: GameState & { selectedChip: number }, action: GameAction): GameState & { selectedChip: number } => {
    switch (action.type) {
        case 'SET_ROLLING':
            return { ...state, isRolling: action.payload };

        case 'ROLL_AND_RESOLVE': {
            const { dice, newPhase, newPoint } = action.payload;
            const newHistory = [...state.rollHistory, dice];

            const placeBetWinnings = getPlaceBetWinnings(state.bets, dice);

            // Resolve all bet types
            const { winningBets: passWinners, losingBets: passLosers } = resolvePassLineBets(
                state.bets, dice, state.phase, state.point
            );
            const { winningBets: fieldWinners, losingBets: fieldLosers } = resolveFieldBets(state.bets, dice);
            const { winningBets: placeWinners, losingBets: placeLosers } = resolvePlaceBets(state.bets, dice);
            const { winningBets: comeWinners, losingBets: comeLosers } = resolveComeAndDontComeBets(state.bets, dice);

            // const allWinners = [...passWinners, ...fieldWinners, ...placeWinners, ...comeWinners];
            const allWinners = [...passWinners, ...fieldWinners, ...comeWinners];
            const allLosers = [...passLosers, ...fieldLosers, ...placeLosers, ...comeLosers];

            // Calculate total winnings (original bet amount + winnings)
            const totalWinnings = allWinners.reduce((sum, bet) => {
                const multiplier = getWinMultiplier(bet, dice);
                return sum + bet.amount + (bet.amount * multiplier);
            }, 0) + placeBetWinnings;

            // Get IDs of losing bets to remove
            const loserIds = allLosers.map(bet => bet.id);
            const winnerIds = allWinners.map(bet => bet.id);

            // Remove both winning and losing bets (they're resolved)
            const allResolvedIds = [...loserIds, ...winnerIds];
            const remainingBets = state.bets.filter(bet => !allResolvedIds.includes(bet.id));

            let updatedBets = remainingBets;
            if (newPhase === GamePhase.ComeOutRoll && state.phase === GamePhase.Point) {
                updatedBets = remainingBets.map(bet =>
                    bet.type === BetType.Place ? { ...bet, isOn: false } : bet
                );
            }

            return {
                ...state,
                dice,
                lastRoll: dice,
                rollHistory: newHistory,
                phase: newPhase,
                point: newPoint,
                isRolling: false,
                bankroll: state.bankroll + totalWinnings,
                bets: updatedBets,
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

        case 'TOGGLE_BET': {
            return {
                ...state,
                bets: state.bets.map(bet =>
                    bet.id === action.payload
                        ? { ...bet, isOn: !bet.isOn }
                        : bet
                )
            };
        }

        case 'CLEAR_BETS':
            const totalBetAmount = state.bets.reduce((sum, bet) => sum + bet.amount, 0);
            return {
                ...state,
                bets: [],
                bankroll: state.bankroll + totalBetAmount,
            };

        case 'SET_SELECTED_CHIP':
            return { ...state, selectedChip: action.payload };

        case 'NEW_GAME':
            return { ...initialState, bankroll: 1000, selectedChip: state.selectedChip };

        default:
            return state;
    }
};

export const useCrapsGame = (): GameState & GameActions & { selectedChip: number; setSelectedChip: (amount: number) => void; getBetsForCell: (cellId: string) => Bet[]; placeBetFromTable: (cellId: string, amount: number) => void } => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    const handleRollDice = useCallback(() => {
        if (state.isRolling) return;

        dispatch({ type: 'SET_ROLLING', payload: true });

        // Simulate dice roll animation delay
        setTimeout(() => {
            const dice = rollDice();

            // Determine new phase and point
            let newPhase = state.phase;
            let newPoint = state.point;

            if (state.phase === GamePhase.ComeOutRoll) {
                if (dice.total === 7 || dice.total === 11 || dice.total === 2 || dice.total === 3 || dice.total === 12) {
                    // Natural win/loss - stay in come out phase
                    newPhase = GamePhase.ComeOutRoll;
                    newPoint = null;
                } else {
                    // Point established
                    newPhase = GamePhase.Point;
                    newPoint = dice.total;
                }
            } else if (state.phase === GamePhase.Point) {
                if (dice.total === state.point || dice.total === 7) {
                    // Point made or seven out - back to come out
                    newPhase = GamePhase.ComeOutRoll;
                    newPoint = null;
                }
            }

            dispatch({
                type: 'ROLL_AND_RESOLVE',
                payload: { dice, newPhase, newPoint }
            });
        }, 1000);
    }, [state.isRolling, state.phase, state.point]);

    const handlePlaceBet = useCallback((type: BetType, amount: number, number?: number) => {
        const bet: Bet = {
            id: `${Date.now()}-${Math.random()}`,
            type,
            amount,
            number,
            isActive: true,
            isOn: type === BetType.Place ? true : undefined,
        };
        dispatch({ type: 'PLACE_BET', payload: bet });
    }, []);

    const handleRemoveBet = useCallback((betId: string) => {
        dispatch({ type: 'REMOVE_BET', payload: betId });
    }, []);

    const handleToggleBet = useCallback((betId: string) => {
        dispatch({ type: 'TOGGLE_BET', payload: betId });
    }, []);

    const handleClearAllBets = useCallback(() => {
        dispatch({ type: 'CLEAR_BETS' });
    }, []);

    const handleNewGame = useCallback(() => {
        dispatch({ type: 'NEW_GAME' });
    }, []);

    const setSelectedChip = useCallback((amount: number) => {
        dispatch({ type: 'SET_SELECTED_CHIP', payload: amount });
    }, []);

    // Map cell IDs to bet types for table integration
    const placeBetFromTable = useCallback((cellId: string, amount: number) => {
        if (state.bankroll < amount) {
            alert('Insufficient funds!');
            return;
        }

        // Map cell IDs to bet types
        const betTypeMap: Record<string, { type: BetType; number?: number }> = {
            'passLine': { type: BetType.Pass },
            'dontPassBar': { type: BetType.DontPass },
            'come': { type: BetType.Come },
            'dontComeBar': { type: BetType.DontCome },
            'field': { type: BetType.Field },
            '4': { type: BetType.Place, number: 4 },
            '5': { type: BetType.Place, number: 5 },
            '6': { type: BetType.Place, number: 6 },
            '8': { type: BetType.Place, number: 8 },
            '9': { type: BetType.Place, number: 9 },
            '10': { type: BetType.Place, number: 10 },
        };

        const betInfo = betTypeMap[cellId];
        if (!betInfo) {
            console.warn(`Unknown bet type for cell: ${cellId}`);
            return;
        }

        // Check if bet already exists for this type/number combination
        const existingBetIndex = state.bets.findIndex(bet =>
            bet.type === betInfo.type && bet.number === betInfo.number
        );

        if (existingBetIndex >= 0) {
            // Create a new bet that adds to existing amount
            const existingBet = state.bets[existingBetIndex];
            const updatedBet: Bet = {
                ...existingBet,
                amount: existingBet.amount + amount,
            };

            // Remove old bet and add updated one
            dispatch({ type: 'REMOVE_BET', payload: existingBet.id });
            dispatch({ type: 'PLACE_BET', payload: updatedBet });
        } else {
            // Create new bet
            handlePlaceBet(betInfo.type, amount, betInfo.number);
        }
    }, [state.bankroll, state.bets, handlePlaceBet]);

    const getBetsForCell = useCallback((cellId: string) => {
        const betTypeMap: Record<string, { type: BetType; number?: number }> = {
            'passLine': { type: BetType.Pass },
            'dontPassBar': { type: BetType.DontPass },
            'come': { type: BetType.Come },
            'dontComeBar': { type: BetType.DontCome },
            'field': { type: BetType.Field },
            '4': { type: BetType.Place, number: 4 },
            '5': { type: BetType.Place, number: 5 },
            '6': { type: BetType.Place, number: 6 },
            '8': { type: BetType.Place, number: 8 },
            '9': { type: BetType.Place, number: 9 },
            '10': { type: BetType.Place, number: 10 },
        };

        const betInfo = betTypeMap[cellId];
        if (!betInfo) return [];

        return state.bets.filter(bet =>
            bet.type === betInfo.type && bet.number === betInfo.number
        );
    }, [state.bets]);

    return {
        ...state,
        rollDice: handleRollDice,
        placeBet: handlePlaceBet,
        removeBet: handleRemoveBet,
        toggleBet: handleToggleBet,
        clearAllBets: handleClearAllBets,
        newGame: handleNewGame,
        setSelectedChip,
        getBetsForCell,
        placeBetFromTable,
    };
};