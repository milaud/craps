import styles from "./Chip.module.css";

interface ChipProps {
    amount: number,
    selected: boolean,
    onClick: () => void
}

export const Chip: React.FC<ChipProps> = ({amount, selected, onClick}) => {

    return (
    <div className={styles.chipContainer}>
            {/* <button className="chip-button" disabled={playerMoney < amount} onClick={onIncrease}>+</button> */}
            <div className={`${styles.chipCircle} ${styles[`chip${amount}`]} ${selected ? `${styles.selected}` : ''}`} onClick={onClick}>{amount}</div>
            {/* <button className="chip-button" disabled={playerMoney < amount} onClick={onDecrease}>−</button> */}
        </div>
    );
};