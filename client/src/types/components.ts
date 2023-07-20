export type Grid = {
	grid_id: number;
	width: number;
	height: number;
	start: number;
};

export type Square = {
	x: number;
	y: number;
	hidden: boolean;
	mine: boolean;
	flag: boolean;
};

export function parseRawCalldataAsGrid(calldata: string[]): Grid {
	return {
		grid_id: parseInt(calldata[0]),
		width: parseInt(calldata[1]),
		height: parseInt(calldata[2]),
		start: parseInt(calldata[3]),
	};
}

export function parseRawCalldataAsSquare(calldata: string[]): Square {
	return {
		x: parseInt(calldata[0]),
		y: parseInt(calldata[1]),
		hidden: Boolean(calldata[2]),
		mine: Boolean(calldata[3]),
		flag: Boolean(calldata[4]),
	};
}