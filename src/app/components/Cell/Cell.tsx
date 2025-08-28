import React, { useState } from "react";
import styles from "./Cell.module.css";
import { Bet } from "@/app/types";


interface CellProps {
    style?: string,
    id: string;
    displayName: string
    onPlaceChip?: (id: string, amount: number) => void;
    totalBet?: number;
    winningNumber?: string;
    selectedChip?: number;
}

export const Cell: React.FC<CellProps> = ({ style, id, displayName, onPlaceChip, totalBet, winningNumber, selectedChip = 25 }) => {
    const isWinning = id === winningNumber;
    // Map total bet to chip color if matches 5,25,100; else default white
    const chipColor =
        totalBet === 5 ? "#860404ff" :
            totalBet === 25 ? "#069414" :
                totalBet === 100 ? "#d4af37" :
                    totalBet ? "#890fdbff" : "";

    // className={`${styles.cell} ${isWinning ? styles.highlight : ""}`}

    const handleClick = () => {
        if (onPlaceChip) {
            onPlaceChip(id, selectedChip);
        }
    };

    return (
        <div
            className={`${style} ${isWinning ? styles.highlight : ""}`}
            title={`${displayName}`}
            onClick={handleClick}
        >
            {/* {displayName} */}
            <span className={styles.cellSpan}>{displayName}</span>
            {totalBet && totalBet > 0 && (
                <div className={styles.cellBet}>
                    <div className={styles.chip} style={{ backgroundColor: chipColor }}>
                        {totalBet}
                    </div>
                </div>
            )}
        </div>
    );
};

export const PointCell: React.FC<CellProps> = ({
    id,
    displayName
}) => {
    return (
        <div className={styles.cell}>
            <Cell id={id} displayName={displayName} />
        </div>

    );
};

export const PointCells: React.FC<{ onPlaceChip: (id: string, amount: number) => void; getBetsForCell: (id: string) => Bet[]; selectedChip: number }> = ({
    onPlaceChip,
    getBetsForCell,
    selectedChip
}) => {

    const pointNumbers = [
        { id: '4', displayName: '4' },
        { id: '5', displayName: '5' },
        { id: '6', displayName: 'Six' },
        { id: '8', displayName: '8' },
        { id: '9', displayName: 'Nine' },
        { id: '10', displayName: '10' }
    ];
    return (
        <div className={styles.pointCells}>
            {pointNumbers.map(({ id, displayName }) => {
                const bets = getBetsForCell(id);
                const totalBet = bets.reduce((sum, bet) => sum + bet.amount, 0);

                return (
                    <Cell
                        key={id}
                        style=""
                        id={id}
                        displayName={displayName}
                        onPlaceChip={onPlaceChip}
                        totalBet={totalBet}
                        selectedChip={selectedChip}
                    />
                );
            })}
        </div>
    );
};

export const DontComeBar: React.FC<{ onPlaceChip: (id: string, amount: number) => void; getBetsForCell: (id: string) => Bet[]; selectedChip: number }> = ({
    onPlaceChip,
    getBetsForCell,
    selectedChip
}) => {

    const bets = getBetsForCell('dontComeBar');
    const totalBet = bets.reduce((sum, bet) => sum + bet.amount, 0);


    return (
        <div className={styles.dontComeBar}>
            <Cell
                id="dontComeBar"
                displayName="DON'T COME BAR"
                onPlaceChip={onPlaceChip}
                totalBet={totalBet}
                selectedChip={selectedChip}
            />
        </div>
    );
};

export const DontPassBar: React.FC<{ onPlaceChip: (id: string, amount: number) => void; getBetsForCell: (id: string) => Bet[]; selectedChip: number }> = ({
    onPlaceChip,
    getBetsForCell,
    selectedChip
}) => {
    const bets = getBetsForCell('dontPassBar');
    const totalBet = bets.reduce((sum, bet) => sum + bet.amount, 0);
    return (
        <Cell
            style={styles.dontPassBar}
            id="dontPassBar"
            displayName="DON'T PASS BAR"
            onPlaceChip={onPlaceChip}
            totalBet={totalBet}
            selectedChip={selectedChip}
        />
    );
};

export const PassLine: React.FC<{ onPlaceChip: (id: string, amount: number) => void; getBetsForCell: (id: string) => Bet[]; selectedChip: number }> = ({
    onPlaceChip,
    getBetsForCell,
    selectedChip
}) => {
    const bets = getBetsForCell('passLine');
    const totalBet = bets.reduce((sum, bet) => sum + bet.amount, 0);
    return (
        <Cell style={styles.passLine} id="passLine" displayName="PASS LINE" onPlaceChip={onPlaceChip}
            totalBet={totalBet}
            selectedChip={selectedChip} />
    );
};

export const PassLines: React.FC<{ onPlaceChip: (id: string, amount: number) => void; getBetsForCell: (id: string) => Bet[]; selectedChip: number }> = ({
    onPlaceChip,
    getBetsForCell,
    selectedChip
}) => {
    return (
        <div className={styles.outerPassLine}>
            <PassLine onPlaceChip={onPlaceChip} getBetsForCell={getBetsForCell} selectedChip={selectedChip} />
            <DontPassBar onPlaceChip={onPlaceChip} getBetsForCell={getBetsForCell} selectedChip={selectedChip} />
        </div>

    );
};

export const ComeField: React.FC<{ onPlaceChip: (id: string, amount: number) => void; getBetsForCell: (id: string) => Bet[]; selectedChip: number }> = ({
    onPlaceChip,
    getBetsForCell,
    selectedChip
}) => {
    return (
        <div className={styles.comeFieldContainer}>
            <Come onPlaceChip={onPlaceChip} getBetsForCell={getBetsForCell} selectedChip={selectedChip} />
            <Field onPlaceChip={onPlaceChip} getBetsForCell={getBetsForCell} selectedChip={selectedChip} />
        </div>
    );
};

export const Come: React.FC<{ onPlaceChip: (id: string, amount: number) => void; getBetsForCell: (id: string) => Bet[]; selectedChip: number }> = ({
    onPlaceChip,
    getBetsForCell,
    selectedChip
}) => {
    const bets = getBetsForCell('come');
    const totalBet = bets.reduce((sum, bet) => sum + bet.amount, 0);

    return (
        <Cell style={styles.comeFieldCell} id="come" displayName="COME" onPlaceChip={onPlaceChip}
            totalBet={totalBet}
            selectedChip={selectedChip} />
    );
};

export const Field: React.FC<{ onPlaceChip: (id: string, amount: number) => void; getBetsForCell: (id: string) => Bet[]; selectedChip: number }> = ({
    onPlaceChip,
    getBetsForCell,
    selectedChip
}) => {
    const bets = getBetsForCell('field');
    const totalBet = bets.reduce((sum, bet) => sum + bet.amount, 0);
    return (
        <Cell style={styles.comeFieldCell} id="field" displayName="2 3·4·9·10·11 12 FIELD" onPlaceChip={onPlaceChip}
            totalBet={totalBet}
            selectedChip={selectedChip} />
    );
};

// TODO: Middle Prop bets