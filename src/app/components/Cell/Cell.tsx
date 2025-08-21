import React, { useState } from "react";
import styles from "./Cell.module.css";


interface CellProps {
    style?: string,
    id: string;
    displayName: string
    onPlaceChip?: (key: string) => void;
    totalBet?: number;
    winningNumber?: string;
}

const placeChip = (id: string) => {
    console.log(id)
};

export const Cell: React.FC<CellProps> = ({ style, id, displayName, onPlaceChip, totalBet, winningNumber }) => {
    const isWinning = id === winningNumber;
    // Map total bet to chip color if matches 5,25,100; else default white
    const chipColor =
        totalBet === 5 ? "#860404ff" :
            totalBet === 25 ? "#069414" :
                totalBet === 100 ? "#d4af37" :
                    totalBet ? "#890fdbff" : "";

    // className={`${styles.cell} ${isWinning ? styles.highlight : ""}`}

    return (
        <div
            className={`${style} ${isWinning ? styles.highlight : ""}`}
            title={`${id}`}
            onClick={() => placeChip(id)}
        >
            {/* {displayName} */}
            <span className={styles.cellSpan}>{displayName}</span>
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

export const PointCells: React.FC = () => {
    return (
        <div className={styles.pointCells}>
            {/* <PointCell id="4" displayName="4" />
            <PointCell id="5" displayName="5" />
            <PointCell id="6" displayName="Six" />
            <PointCell id="8" displayName="8" />
            <PointCell id="9" displayName="Nine" />
            <PointCell id="10" displayName="10" /> */}
            <Cell style={styles.cell} id="4" displayName="4" />
            <Cell style={styles.cell}  id="5" displayName="5" />
            <Cell style={styles.cell}  id="6" displayName="Six" />
            <Cell style={styles.cell}  id="8" displayName="8" />
            <Cell style={styles.cell}  id="9" displayName="Nine" />
            <Cell style={styles.cell}  id="10" displayName="10" />
        </div>
    );
};

export const DontComeBar: React.FC = () => {
    return (
        <div className={styles.dontComeBar}>
            <Cell id="dontComeBar" displayName="DON'T COME BAR" />
        </div>
    );
};

export const DontPassBar: React.FC = () => {
    return (
        <Cell style={styles.dontPassBar} id="dontPassBar" displayName="DON'T PASS BAR" />
    );
};

export const PassLine: React.FC = () => {
    return (
        <Cell style={styles.passLine} id="passLine" displayName="PASS LINE" />
    );
};

export const PassLines: React.FC = () => {
    return (
        <div className={styles.outerPassLine}>
            <PassLine />
            <DontPassBar />
        </div>
        
    );
};

export const ComeField: React.FC = () => {
    return (
        <div className={styles.comeFieldContainer}>
            <div className={styles.comeFieldCell}>
                <Cell id="come" displayName="COME" />
            </div>
            <div className={styles.comeFieldCell}>
                <Cell id="field" displayName="2 3·4·9·10·11 12 FIELD" />
            </div>
        </div>
    );
};

export const Come: React.FC = () => {
    return (
        <Cell style={styles.comeFieldCell} id="come" displayName="COME" />
    );
};

export const Field: React.FC = () => {
    return (
        <Cell style={styles.comeFieldCell} id="field" displayName="2 3·4·9·10·11 12 FIELD" />
    );
};

// TODO: Middle Prop bets