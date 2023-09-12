import { EVENT_KEY, KATANA_ACCOUNT_1_ADDRESS, SetupNetworkResult } from "./setupNetwork";
import {number} from 'starknet';
import { Difficulty } from "../types";
import { Query } from "@dojoengine/core";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
    { execute, syncWorker, provider, entity }: SetupNetworkResult,
) {
    const start = async ({difficulty_level}: {difficulty_level: Difficulty}) => {
        const tx = await execute("start", [difficulty_level]);
        syncWorker.sync(tx.transaction_hash);
    }

    const add_flag = async ({x, y}: {x: number.BigNumberish, y: number.BigNumberish}) => {
        const tx = await execute("add_flag", [x, y]);
        syncWorker.sync(tx.transaction_hash);
    }

    const remove_flag = async ({x, y}: {x: number.BigNumberish, y: number.BigNumberish}) => {
        const tx = await execute("remove_flag", [x, y]);
        syncWorker.sync(tx.transaction_hash);
    }

    const reveal = async ({x, y}: {x: number.BigNumberish, y: number.BigNumberish}) => {
        const tx = await execute("reveal", [x, y]);
        syncWorker.sync(tx.transaction_hash);
    }

    const test = async ({player_id}: {player_id: bigint}) => {
        let query: Query = {
            address_domain: '0',
            partition: KATANA_ACCOUNT_1_ADDRESS,
            keys: [player_id],
        }
        const tx = await entity("Grid", query);
        console.log(tx);
    }

    return {
        start,
        add_flag,
        remove_flag,
        reveal,
        test
    };
}