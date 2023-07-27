export interface Grid {
	grid_id: number,
	width: number,
	height: number,
	start_time: number,
};

export type Neighbors = {
	count: number
};

export type Square = {
	x: number,
	y: number,
	hidden: boolean,
	mine: boolean,
	flag: boolean,
};

export type SquareWithNeighbors = Square & Neighbors;

export enum Difficulty {
	Beginner,
	Intermediate,
	Expert,
}

export interface QueryResult<T> {
    data: T | undefined;
    loading: boolean;
    error: any;
}