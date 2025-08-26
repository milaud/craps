import React, { useState } from "react";
import styles from "./Table.module.css";
import { DontComeBar, PassLines, PointCells, ComeField } from "../Cell/Cell";


export const Table: React.FC = () => {

    return (
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
    );
};