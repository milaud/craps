"use client";

import React, { useState } from "react";
import styles from "./Table.module.css";
import { Come, DontComeBar, DontPassBar, Field, PassLine, PointCells } from "../Cell/Cell";


export const Table: React.FC = () => {

    return (
        <div className={styles.table}>
            <PassLine />
            <div className={styles.innerContainer}>
                <DontPassBar />
                <div className={styles.topRowContainer}>
                    <div className={styles.topRow}>
                        <DontComeBar />
                        <PointCells />
                    </div>
                    <Come />
                    <Field />
                </div>
            </div>
        </div>
    );
};