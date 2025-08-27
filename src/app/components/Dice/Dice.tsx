import { Dice } from "@/app/types";

export const DiceDisplay: React.FC<{ dice: Dice; isRolling: boolean }> = ({ dice, isRolling }) => {
    const getDotPattern = (value: number) => {
        const patterns = {
            1: [4],
            2: [0, 8],
            3: [0, 4, 8],
            4: [0, 2, 6, 8],
            5: [0, 2, 4, 6, 8],
            6: [0, 2, 3, 5, 6, 8]
        };
        return patterns[value as keyof typeof patterns] || [];
    };

    const renderDie = (value: number, index: number) => (
        <div
            key={index}
            className={`w-16 h-16 bg-white border-2 border-gray-800 rounded-lg grid grid-cols-3 gap-1 p-2 transition-transform duration-300 ${isRolling ? 'animate-bounce' : ''
                }`}
        >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(dotIndex => (
                <div
                    key={dotIndex}
                    className={`w-2 h-2 rounded-full ${getDotPattern(value).includes(dotIndex) ? 'bg-black' : 'bg-transparent'
                        }`}
                />
            ))}
        </div>
    );

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-4">
                {renderDie(dice.die1, 0)}
                {renderDie(dice.die2, 1)}
            </div>
            <div className="text-2xl font-bold text-white">
                Total: {dice.total}
            </div>
        </div>
    );
};