import { EVENT_KEY, SetupNetworkResult } from "./setupNetwork";
import {num} from 'starknet';
import { Difficulty } from "../types";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
    { execute, syncWorker, provider }: SetupNetworkResult,
) {
    const start = async ({difficulty_level}: {difficulty_level: Difficulty}) => {
        const tx = await execute("start", [difficulty_level]);
        syncWorker.sync(tx.transaction_hash);
    }

    const add_flag = async ({x, y}: {x: num.BigNumberish, y: num.BigNumberish}) => {
        const tx = await execute("add_flag", [x, y]);
        syncWorker.sync(tx.transaction_hash);
    }

    return {
        start,
    };
}