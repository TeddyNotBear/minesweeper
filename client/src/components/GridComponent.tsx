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

	return (
        <div>
            <button onClick={() => { start({ difficulty_level: difficulty_level }) }}>Start</button>
        </div>
	);
}

export default GridComponent;

