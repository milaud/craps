import React, { useState } from "react";
import styles from "./Table.module.css";
import { DontComeBar, PassLines, PointCells, ComeField } from "../Cell/Cell";
import { Bet } from "@/app/types";


export const Table: React.FC<{ onPlaceChip: (id: string, amount: number) => void; getBetsForCell: (id: string) => Bet[]; selectedChip: number }> = ({ 
  onPlaceChip, 
  getBetsForCell, 
  selectedChip 
}) => {

    return (
        <div className={styles.container}>
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                    <DontComeBar onPlaceChip={onPlaceChip} getBetsForCell={getBetsForCell} selectedChip={selectedChip} />
          <PointCells onPlaceChip={onPlaceChip} getBetsForCell={getBetsForCell} selectedChip={selectedChip} />
          <ComeField onPlaceChip={onPlaceChip} getBetsForCell={getBetsForCell} selectedChip={selectedChip} />
                </div>
                <PassLines onPlaceChip={onPlaceChip} getBetsForCell={getBetsForCell} selectedChip={selectedChip} />
            </div>
        </div>
    );
};