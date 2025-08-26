import { Chip } from "./Chips/Chip";
import styles from "./BetControls.module.css";

const betOptions = [5, 10, 25, 50, 100, 500, 1000];

const setSelectedChip = (amount: number) => {
    console.log(amount);
}

export const BetControls: React.FC = () => {
    return (
        <div className={styles.chipsRow}>
            {betOptions.map((amount) => (
                <Chip
                    key={amount}
                    amount={amount}
                    // playerMoney={playerMoney}
                    // selected={selectedChip === amount}
                    selected={false}
                    onClick={() => setSelectedChip(amount)}
                />
            ))}
        </div>
    )
};
