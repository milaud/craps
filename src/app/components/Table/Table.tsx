import React, { useState } from "react";
import styles from "./Table.module.css";
import { DontComeBar, PointCells } from "../Cell/Cell";


export const Table: React.FC = () => {

    return (
        <div className={styles.table}>
            <div className={styles.topRow}>
                <DontComeBar />
                <PointCells />
            </div>
        </div>
    );
};