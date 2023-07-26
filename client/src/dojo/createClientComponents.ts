import { overridableComponent } from "@latticexyz/recs";
import { SetupNetworkResult } from "./setupNetwork";


export type ClientComponents = ReturnType<typeof createClientComponents>;

export function createClientComponents({ contractComponents }: SetupNetworkResult) {
    return {
        ...contractComponents,
        Grid: overridableComponent(contractComponents.Grid),
        Square: overridableComponent(contractComponents.Square),
        Mine: overridableComponent(contractComponents.Mine),
        Moves: overridableComponent(contractComponents.Moves),
        Level: overridableComponent(contractComponents.Level),
    };
}