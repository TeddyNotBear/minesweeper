import { useDojo } from "../DojoContext";
import { KATANA_ACCOUNT_1_ADDRESS } from "../dojo/setupNetwork";
import { Difficulty } from "../types";
import { Utils } from '@dojoengine/core';
import { useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { getComponentValue } from '@latticexyz/recs';

type GridComponentProps = {
    difficulty_level: Difficulty
}

function DifficultyButtonComponent({ difficulty_level }: GridComponentProps) {
    const navigate = useNavigate();
    const {
        systemCalls: { start, test },
        components: { Grid },
    } = useDojo();

    const title = difficulty_level == Difficulty.Beginner ? 'Beginner' : difficulty_level == Difficulty.Intermediate ? 'Intermediate' : 'Expert';
    const player_id = BigInt(KATANA_ACCOUNT_1_ADDRESS);
    
    const redirectToGrid = useCallback(async () => {
        let grid = getComponentValue(Grid, Utils.getEntityIdFromKeys([player_id]));
        const res = await test({ player_id: player_id });
        console.log(res);
        //console.log(grid);
        //navigate(`/play/${grid?.grid_id}`);
    }, []);

    return (
        <div>
            <button className="bg-[#e31919] w-72 font-bold h-16 text-white"
                onClick={() => { 
                    //start({ difficulty_level: difficulty_level });
                    redirectToGrid();
                }}>
                {title}
            </button>
        </div>
    );
}

export default DifficultyButtonComponent;

