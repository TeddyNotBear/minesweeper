import { useDojo } from "../DojoContext";
import useBlockchainStore from "../hooks/store/useBlockchainStore";
import { Difficulty, Grid, Square } from "../types";

type GridComponentProps = {
    difficulty_level: Difficulty
    //onStart: () => void;
}

function GridComponent({ difficulty_level, ...props }: GridComponentProps) {
    const {
        components: { Grid },
        systemCalls: { start }
    } = useDojo();

    const { nextBlockTimestamp } = useBlockchainStore();

    const level = difficulty_level == Difficulty.Beginner ? 'Beginner' : difficulty_level == Difficulty.Intermediate ? 'Intermediate' : 'Expert';

    return (
        <div>
            <button className="bg-[#e31919] w-72 font-bold h-16 text-white"
                onClick={() => { start({ difficulty_level: difficulty_level }) }}>
                {level}
            </button>
        </div>
    );
}

export default GridComponent;

