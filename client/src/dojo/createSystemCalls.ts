import { EVENT_KEY, SetupNetworkResult } from "./setupNetwork";
import {number} from 'starknet';
import { Difficulty } from "../types";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
    { execute, syncWorker, provider }: SetupNetworkResult,
) {
    const start = async ({difficulty_level}: {difficulty_level: Difficulty}) => {
        const tx = await execute("start", [difficulty_level]);
        syncWorker.sync(tx.transaction_hash);
    }

    const add_flag = async ({grid_id, x, y}: {grid_id: number.BigNumberish, x: number.BigNumberish, y: number.BigNumberish}) => {
        const tx = await execute("add_flag", [grid_id, x, y]);
        syncWorker.sync(tx.transaction_hash);
    }

    return {
        start,
        add_flag
    };
}