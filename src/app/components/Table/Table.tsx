"use client";

import React, { useState } from "react";
import styles from "./Table.module.css";
import { Come, DontComeBar, DontPassBar, Field, PassLine, PassLines, PointCells, ComeField } from "../Cell/Cell";


export const Table: React.FC = () => {

    return (
        <div className={styles.container}>
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                    <DontComeBar />
                    <PointCells />
                    <div className={styles.comeFieldContainer}>
                        <Come />
                        <Field />
                    </div>
                </div>
                <PassLines />

            </div>
        </div>
    );
};