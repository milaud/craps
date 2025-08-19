import React, { useState } from "react";
import styles from "./Cell.module.css";


interface CellProps {
    id: string; 
    displayName: string
    onPlaceChip?: (key: string) => void;
    totalBet?: number;
    winningNumber?: string;
}

export const Cell: React.FC<CellProps> = ({ id, displayName, onPlaceChip, totalBet, winningNumber }) => {
    const isWinning = id === winningNumber;
    // Map total bet to chip color if matches 5,25,100; else default white
    const chipColor =
        totalBet === 5 ? "#860404ff" :
            totalBet === 25 ? "#069414" :
                totalBet === 100 ? "#d4af37" :
                    totalBet ? "#890fdbff" : "";

    return (
        <div
            className={`${styles.cell} ${isWinning ? styles.highlight : ""}`}
            title={`${id}`}
            // onClick={() => onPlaceChip(id)}
        >
            <div>
                <span>{displayName}</span>
            </div>

            {/* {totalBet && totalBet > 0 && (
        <div className={styles.cellBet}>
          <div className={styles.chip} style={{ backgroundColor: chipColor }}>
            {totalBet}
          </div>
        </div>
      )} */}
        </div>
    );
};

export const DontComeBar: React.FC= () => {
    return (
        <div className={styles.dontComeBarCell}>
            <Cell id="dontComeBar" displayName="DON'T COME BAR"/>
        </div>
    );
};

export const DontPassBar: React.FC = () => {
    return (
        <div className={styles.dontPassBarCell}>
            <Cell id="dontPassBar" displayName="DON'T PASS BAR" />
        </div>
    );
};

export const PassLine: React.FC = () => {
    return (
        <div className={styles.passLineCell}>
            <Cell id="passLine" displayName="PASS LINE" />
        </div>
    );
};


export const PointCells: React.FC = () => {
    return (
        <div className={styles.pointCells}>
            <Cell id="4" displayName="4" />
            <Cell id="5" displayName="5" />
            <Cell id="6" displayName="Six" />
            <Cell id="8" displayName="8" />
            <Cell id="9" displayName="Nine" />
            <Cell id="10" displayName="10" />
        </div>
    );
};

export const Come: React.FC = () => {
    return (
        <div className={styles.comeCell}>
            <Cell id="come" displayName="COME" />
        </div>
    );
};

export const Field: React.FC = () => {
    return (
        <div className={styles.fieldCell}>
            <Cell id="field" displayName="2 3·4·9·10·11 12 FIELD" />
        </div>
    );
};

// TODO: Middle Prop bets