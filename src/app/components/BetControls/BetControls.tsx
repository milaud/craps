import { Chip } from "./Chips/Chip";
import styles from "./BetControls.module.css";


export const BetControls: React.FC<{ selectedChip: number; onSelectChip: (amount: number) => void }> = ({ selectedChip, onSelectChip }) => {
    const chipValues = [5, 25, 50, 100, 500];
  
    const getChipColor = (value: number) => {
        switch (value) {
        case 5: return "#860404ff";
        case 25: return "#069414";
        case 50: return "#ff6600";
        case 100: return "#d4af37";
        case 500: return "#6a0dad";
        default: return "#333";
        }
    };
    return (
        <div className={styles.chipsRow}>
            {chipValues.map((value) => (
                <Chip
                    key={value}
                    amount={value}
                    // playerMoney={playerMoney}
                    // selected={selectedChip === amount}
                    selected={selectedChip === value}
                    onClick={() => onSelectChip(value)}
                />
            ))}
        </div>
    )
};
