import React, { useState } from "react";
import styles from "./Table.module.css";
import { DontComeBar, PassLines, PointCells, ComeField } from "../Cell/Cell";
import { Bet } from "@/app/types";


export const Table: React.FC<{ onPlaceChip: (id: string, amount: number) => void; getBetsForCell: (id: string) => Bet[]; selectedChip: number, point: number | null }> = ({
    onPlaceChip,
    getBetsForCell,
    selectedChip,
    point
}) => {

    return (
        <div className={styles.table}>
            <div className={styles.tableInner}>
                <div>
                    <DontComeBar onPlaceChip={onPlaceChip} getBetsForCell={getBetsForCell} selectedChip={selectedChip} />
                    <PointCells onPlaceChip={onPlaceChip} getBetsForCell={getBetsForCell} selectedChip={selectedChip} point={point} />
                    <ComeField onPlaceChip={onPlaceChip} getBetsForCell={getBetsForCell} selectedChip={selectedChip} />
                </div>
                <PassLines onPlaceChip={onPlaceChip} getBetsForCell={getBetsForCell} selectedChip={selectedChip} />
            </div>
        </div>
    );
};