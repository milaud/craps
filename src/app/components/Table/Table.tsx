import React, { useState } from "react";
import styles from "./Table.module.css";
import { DontComeBar, PassLines, PointCells, ComeField } from "../Cell/Cell";
import { Bet, BetType } from "@/app/types";
import { Chip } from "../BetControls/Chips/Chip";

export const Table: React.FC<{
    bets: Bet[];
    bankroll: number;
    onPlaceBet: (type: BetType, amount: number) => void;
    onRemoveBet: (betId: string) => void;
    onClearBets: () => void;
}> = ({ bets, bankroll, onPlaceBet, onRemoveBet, onClearBets }) => {

    const [selectedAmount, setSelectedAmount] = useState(25);

    const betAmounts = [5, 10, 25, 50, 100];

    return (
        <div>
            <div>
                <h2>Bets:</h2>
                {bets.map(bet => (
                    <h6>{bet.amount}, {bet.number}</h6>
                ))}
            </div>
            <div className={styles.container}>
                <div className={styles.outerContainer}>
                    <div className={styles.innerContainer}>
                        <DontComeBar />
                        <PointCells />
                        <ComeField />
                    </div>
                    <PassLines />
                </div>
            </div>

            <div>
                <div className="mb-4">
                    <div className="text-sm mb-2">Select Chip Value:</div>
                    {/* <div className="flex space-x-2"> */}
                    <div className={styles.chipsRow}>
                        {betAmounts.map(amount => (
                            <Chip
                                key={amount}
                                amount={amount}
                                selected={selectedAmount === amount}
                                onClick={() => setSelectedAmount(amount)}
                            />

                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};



// const BettingArea: React.FC<{
//     bets: Bet[];
//     bankroll: number;
//     onPlaceBet: (type: BetType, amount: number) => void;
//     onRemoveBet: (betId: string) => void;
//     onClearBets: () => void;
// }> = ({ bets, bankroll, onPlaceBet, onRemoveBet, onClearBets }) => {
//     const [selectedAmount, setSelectedAmount] = useState(25);

//     const betAmounts = [5, 10, 25, 50, 100];
//     const betTypes: { type: BetType; label: string; color: string }[] = [
//         { type: 'pass', label: 'Pass Line', color: 'bg-red-600 hover:bg-red-700' },
//         { type: 'dontPass', label: "Don't Pass", color: 'bg-blue-600 hover:bg-blue-700' },
//         { type: 'field', label: 'Field', color: 'bg-green-600 hover:bg-green-700' },
//         { type: 'any7', label: 'Any 7', color: 'bg-purple-600 hover:bg-purple-700' }
//     ];

//     return (
//         <div className="bg-gray-700 text-white p-4 rounded-lg">
//             <h3 className="text-lg font-semibold mb-4">Place Your Bets</h3>

//             {/* Chip Selection */}


//             {/* Betting Buttons */}
//             <div className="grid grid-cols-2 gap-2 mb-4">
//                 {betTypes.map(({ type, label, color }) => (
//                     <button
//                         key={type}
//                         onClick={() => onPlaceBet(type, selectedAmount)}
//                         disabled={bankroll < selectedAmount}
//                         className={`${color} disabled:bg-gray-500 disabled:cursor-not-allowed px-4 py-2 rounded font-semibold transition-colors`}
//                     >
//                         {label}
//                     </button>
//                 ))}
//             </div>

//             {/* Active Bets */}
//             {bets.length > 0 && (
//                 <div className="mb-4">
//                     <div className="text-sm mb-2">Active Bets:</div>
//                     <div className="space-y-1 max-h-32 overflow-y-auto">
//                         {bets.map(bet => (
//                             <div key={bet.id} className="flex justify-between items-center bg-gray-600 p-2 rounded text-sm">
//                                 <span>{bet.type} - ${bet.amount}</span>
//                                 <button
//                                     onClick={() => onRemoveBet(bet.id)}
//                                     className="text-red-400 hover:text-red-300"
//                                 >
//                                     Remove
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                     <button
//                         onClick={onClearBets}
//                         className="mt-2 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
//                     >
//                         Clear All Bets
//                     </button>
//                 </div>
//             )}

//             <div className="text-lg font-semibold">
//                 Bankroll: <span className="text-green-400">${bankroll}</span>
//             </div>
//         </div>
//     );
// };