import React, { useState } from "react";
import styles from "./Table.module.css";
import { Come, DontComeBar, DontPassBar, Field, PointCells } from "../Cell/Cell";


export const Table: React.FC = () => {

    return (
        <div className={styles.table}>
            <div><DontPassBar /></div>
            <div className={styles.topRowContainer}>
                <div className={styles.topRow}>
                    <DontComeBar />
                    <PointCells />
                </div>
                <div className={styles.secondRow}>
                    <Come />
                    <Field />
                </div>
            </div>
        </div>
    );
};